import webpack from 'webpack'
import path from 'path'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import TerserPlugin from 'terser-webpack-plugin'
import nodeExternals from 'webpack-node-externals'
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import resolveFrom from 'resolve-from'
//
import rules from './rules'

function common(state) {
  const { analyze, config, debug } = state
  const { ROOT, DIST, NODE_MODULES, SRC, ASSETS } = config.paths

  process.env.REACT_STATIC_ENTRY_PATH = config.entry
  process.env.REACT_STATIC_SITE_ROOT = config.siteRoot
  process.env.REACT_STATIC_BASE_PATH = config.basePath
  process.env.REACT_STATIC_PUBLIC_PATH = config.publicPath
  process.env.REACT_STATIC_ASSETS_PATH = config.assetsPath

  if (!DIST.startsWith(ROOT)) {
    // we build outside of project dir, so reset some paths
    process.env.REACT_STATIC_ASSETS_PATH = config.assetsPath.replace(DIST, '')
  }

  const splitChunks = {
    chunks: 'all',
    minSize: 10000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 5,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        chunks: 'all',
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true,
      },
    },
  }

  let extrackCSSChunks = new ExtractCssChunks({
    filename: '[name].[chunkHash:8].css',
    chunkFilename: '[id].[chunkHash:8].css',
  })

  if (!config.extractCssChunks) {
    splitChunks.cacheGroups = {
      styles: {
        name: 'styles',
        test: /\.css$/,
        chunks: 'all',
        enforce: true,
      },
    }
    extrackCSSChunks = new ExtractCssChunks({
      filename: '[name].[chunkHash:8].css',
    })
  }

  return {
    mode: 'production',
    context: path.resolve(__dirname, '../../../node_modules'),
    entry: config.disableRuntime
      ? config.entry
      : [
          require.resolve('../../bootstrapPlugins'),
          require.resolve('../../bootstrapTemplates'),
          require.resolve('../../bootstrapApp'),
        ],
    output: {
      filename: '[name].[hash:8].js', // dont use chunkhash, its not a chunk
      chunkFilename: 'templates/[name].[chunkHash:8].js',
      path: ASSETS,
      publicPath: process.env.REACT_STATIC_ASSETS_PATH || '/',
    },
    optimization: {
      sideEffects: true,
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          exclude: /\.min\.js/,
          ...config.terser,
          sourceMap:
            config.productionSourceMaps || config.terser.sourceMap || debug,
          terserOptions: {
            ie8: false,
            ...config.terser.terserOptions,
            mangle: { safari10: true, ...config.terser.terserOptions.mangle },
            parse: { ecma: 8, ...config.terser.terserOptions.parse },
            compress: { ecma: 5, ...config.terser.terserOptions.compress },
            output: { ecma: 5, ...config.terser.terserOptions.output },
          },
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
      splitChunks,
    },
    performance: {
      maxEntrypointSize: 300000,
    },
    module: {
      rules: rules({ config, stage: 'prod', isNode: false }),
      strictExportPresence: true,
    },
    resolve: {
      modules: [
        NODE_MODULES,
        SRC,
        DIST,
        ...[NODE_MODULES, SRC, DIST].map(d =>
          DIST.startsWith(ROOT) ? path.resolve(__dirname, d) : path.resolve(d)
        ),
        'node_modules',
      ],
      extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
      alias: {
        react$: resolveFrom(config.paths.NODE_MODULES, 'react'),
        'react-dom$': resolveFrom(config.paths.NODE_MODULES, 'react-dom'),
        'react-universal-component': resolveFrom(
          __dirname,
          'react-universal-component'
        ),
      },
    },
    externals: [],
    target: undefined,
    plugins: [
      new webpack.EnvironmentPlugin(process.env),
      extrackCSSChunks,
      new CaseSensitivePathsPlugin(),
      analyze && new BundleAnalyzerPlugin(),
    ].filter(d => d),
    devtool: debug || config.productionSourceMaps ? 'source-map' : false,
  }
}

export default function(state) {
  const {
    stage,
    config: { paths },
  } = state

  const result = common(state)
  if (stage !== 'node') return result

  // Node only!!!
  result.output.filename = 'static-app.js'
  result.output.path = paths.ARTIFACTS
  result.output.libraryTarget = 'umd'
  result.optimization.minimize = false
  result.optimization.minimizer = []
  result.target = 'node'
  result.devtool = false
  result.externals = [
    new RegExp(`${paths.PLUGINS}`),
    (context, request, callback) => {
      const resolved = path.resolve(context, request)
      if (
        [/react-static(\\|\/)lib(\\|\/)browser/, /webpack-flush-chunks/].some(
          d => d.test(resolved)
        )
      ) {
        return callback(null, `commonjs ${resolved}`)
      }
      callback()
    },
    nodeExternals(),
  ]
  result.module.rules = rules(state)
  result.plugins = [
    new webpack.EnvironmentPlugin(process.env),
    new CaseSensitivePathsPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ]
  return result
}
