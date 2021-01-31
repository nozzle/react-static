import ExtractCssChunks from 'extract-css-chunks-webpack-plugin'
import autoprefixer from 'autoprefixer'
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes'
import semver from 'semver'

export default ({ includePaths = [], cssLoaderOptions = {}, ...rest }) => ({
  webpack: (config, { stage }) => {
    let loaders = []

    const sassLoaderPath = require.resolve('sass-loader')

    const sassLoader = {
      loader: sassLoaderPath,
      options: { includePaths: ['src/', ...includePaths], ...rest },
    }
    const cssLoader = {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        sourceMap: false,
        ...cssLoaderOptions,
      },
    }
    const postCssLoader = {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        postcssOptions: {
          plugins: [
            postcssFlexbugsFixes,
            autoprefixer({
              flexbox: 'no-2009',
            }),
          ],
        },
      },
    }

    if (stage === 'dev') {
      // Dev
      loaders = [
        {
          loader: ExtractCssChunks.loader,
          options: {
            hmr: true,
          },
        },
        cssLoader,
        postCssLoader,
        sassLoader,
      ]
    } else if (stage === 'node') {
      // Node
      // Don't extract css to file during node build process
      loaders = [cssLoader, postCssLoader, sassLoader]
    } else {
      // Prod

      // for legacy css-loader version (<2.0) we need to add "minimize" to minify css code
      // for >2.0 it is handled with https://github.com/NMFR/optimize-css-assets-webpack-plugin
      const cssLoaderVersion = require('css-loader/package.json').version
      if (semver.satisfies(cssLoaderVersion, '<2') === true) {
        cssLoader.options.minimize = true
      }

      loaders = [ExtractCssChunks.loader, cssLoader, postCssLoader, sassLoader]
    }

    config.module.rules[0].oneOf.unshift({
      test: /\.s(a|c)ss$/,
      use: loaders,
    })

    if (
      config.optimization.splitChunks &&
      config.optimization.splitChunks &&
      config.optimization.splitChunks.cacheGroups.styles
    ) {
      config.optimization.splitChunks.cacheGroups.styles.test = /\.(c|sc|sa)ss$/
    }

    return config
  },
})
