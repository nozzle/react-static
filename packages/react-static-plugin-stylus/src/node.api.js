import ExtractCssChunks from 'extract-css-chunks-webpack-plugin'
import autoprefixer from 'autoprefixer'
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes'
import semver from 'semver'

export default ({ cssLoaderOptions = {}, ...rest }) => ({
  webpack: (config, { stage }) => {
    let loaders = []
    const stylusLoaderPath = require.resolve('stylus-loader')

    const stylusLoader = {
      loader: stylusLoaderPath,
      options: {
        use: [require('nib')()],
        ...rest,
      },
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
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
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
        ExtractCssChunks.loader,
        cssLoader,
        postCssLoader,
        stylusLoader,
      ]
    } else if (stage === 'node') {
      // Node
      // Don't extract css to file during node build process
      loaders = [cssLoader, postCssLoader, stylusLoader]
    } else {
      // Prod

      // for legacy css-loader version (<2.0) we need to add "minimize" to minify css code
      // for >2.0 it is handled with https://github.com/NMFR/optimize-css-assets-webpack-plugin
      const cssLoaderVersion = require('css-loader/package.json').version
      if (semver.satisfies(cssLoaderVersion, '<2') === true) {
        cssLoader.options.minimize = true
      }

      loaders = [
        ExtractCssChunks.loader,
        cssLoader,
        postCssLoader,
        stylusLoader,
      ]
    }

    config.module.rules[0].oneOf.unshift({
      test: /\.styl$/,
      use: loaders,
    })

    return config
  },
})
