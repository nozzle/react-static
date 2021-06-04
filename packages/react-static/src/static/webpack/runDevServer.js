/* eslint-disable import/no-dynamic-require, react/no-danger, import/no-mutable-exports */
import webpack from 'webpack'
import chalk from 'chalk'
import io from 'socket.io'
import WebpackDevServer from 'webpack-dev-server'
//
import makeWebpackConfig from './makeWebpackConfig'
import getRouteData from '../getRouteData'
import plugins from '../plugins'
import { findAvailablePort, time, timeEnd } from '../../utils'
import fetchSiteData from '../fetchSiteData'

let devServer
let latestState
let buildDevRoutes = () => {}

export const reloadClientData = () => {
  if (reloadClientData.current) {
    reloadClientData.current()
  }
}

// Starts the development server
export default async function runDevServer(state) {
  // TODO check config.devServer for changes and notify user
  // if the server needs to be restarted for changes to take
  // effect.

  // If the server is already running, trigger a refresh to the client

  if (devServer) {
    await buildDevRoutes(state)
    await reloadClientData()
  } else {
    state = await runExpressServer(state)
  }

  return state
}

async function runExpressServer(state) {
  // Default to localhost:3000, or use a custom combo if defined in static.config.js
  // or environment variables
  const intendedPort = Number(state.config.devServer.port)
  const port = await findAvailablePort(intendedPort)

  let defaultMessagePort = 4000

  if (process.env.REACT_STATIC_MESSAGE_SOCKET_PORT) {
    defaultMessagePort = process.env.REACT_STATIC_MESSAGE_SOCKET_PORT
  }
  // Find an available port for messages, as long as it's not the devServer port
  const messagePort = await findAvailablePort(defaultMessagePort, [port])

  const messageHost =
    process.env.REACT_STATIC_MESSAGE_SOCKET_HOST || 'http://localhost'

  if (intendedPort !== port) {
    console.log(
      chalk.red(
        `Warning! Port ${intendedPort} is not available. Using port ${chalk.green(
          port
        )} instead!`
      )
    )
  }

  state = {
    ...state,
    config: {
      ...state.config,
      devServer: {
        ...state.config.devServer,
        port,
      },
    },
  }

  const devConfig = makeWebpackConfig(state)
  const devCompiler = webpack(devConfig)

  const devServerConfig = {
    contentBase: [state.config.paths.PUBLIC, state.config.paths.DIST],
    publicPath: '/',
    historyApiFallback: true,
    compress: false,
    clientLogLevel: 'warning',
    overlay: true,
    stats: 'errors-only',
    noInfo: true,
    ...state.config.devServer,
    hotOnly: true,
    proxy: {
      '/socket.io': {
        target: `${messageHost}:${messagePort}`,
        ws: true,
      },
      ...(state.config.devServer ? state.config.devServer.proxy || {} : {}),
    },
    watchOptions: {
      ...(state.config.devServer
        ? state.config.devServer.watchOptions || {}
        : {}),
      ignored: [
        /node_modules/,

        ...((state.config.devServer.watchOptions || {}).ignored || []),
      ],
    },
    before: app => {
      // Since routes may change during dev, this function can rebuild all of the config
      // routes. It also references the original config when possible, to make sure it
      // uses any up to date getData callback generated from new or replacement routes.
      buildDevRoutes = async newState => {
        latestState = await fetchSiteData(newState)

        app.get('/__react-static__/siteData', async (req, res, next) => {
          try {
            res.send(latestState.siteData)
          } catch (err) {
            res.status(500)
            res.send(err)
            next(err)
          }
        })

        // Serve each routes data
        latestState.routes.forEach(({ path: routePath }) => {
          app.get(
            `/__react-static__/routeInfo/${encodeURI(
              routePath === '/' ? '' : routePath
            )}`,
            async (req, res, next) => {
              // Make sure we have the most up to date route from the config, not
              // an out of date object.
              let route = latestState.routes.find(d => d.path === routePath)
              try {
                if (!route) {
                  const err = new Error(
                    `Route could not be found for: ${routePath}

If you removed this route, disregard this error.
If this is a dynamic route, consider adding it to the prefetchExcludes list:

  addPrefetchExcludes(['${routePath}'])
`
                  )
                  delete err.stack
                  throw err
                }

                route = await getRouteData(route, latestState)
                route = await plugins.routeInfo(route, latestState)

                // Don't use any hashProp, just pass all the data in dev
                res.json(route)
              } catch (err) {
                res.status(404)
                next(err)
              }
            }
          )
        })
        return new Promise(resolve => setTimeout(resolve, 1))
      }

      buildDevRoutes(state)

      if (state.config.devServer && state.config.devServer.before) {
        state.config.devServer.before(app)
      }

      return app
    },
  }

  let first = true
  const startedAt = Date.now()
  let skipLog = false

  console.log('Bundling Application...')
  time(chalk.green('[\u2713] Application Bundled'))

  devCompiler.hooks.invalid.tap(
    {
      name: 'React-Static',
    },
    (file, changed) => {
      // If a file is changed within the first two seconds of
      // the server starting, we don't bark about it. Less
      // noise is better!
      skipLog = changed - startedAt < 2000
      if (!skipLog) {
        console.log('File changed:', file.replace(state.config.paths.ROOT, ''))
        console.log('Updating bundle...')
        time(chalk.green('[\u2713] Bundle Updated'))
      }
    }
  )

  devCompiler.hooks.done.tap(
    {
      name: 'React-Static',
    },
    stats => {
      const messages = stats.toJson({}, true)
      const isSuccessful = !messages.errors.length
      const hasWarnings = messages.warnings.length

      if (isSuccessful && !skipLog) {
        if (first) {
          // Print out any dev compiler warnings
          if (hasWarnings) {
            console.log(
              chalk.yellowBright(
                `\n[\u0021] There were ${messages.warnings.length} warnings during compilation\n`
              )
            )
            messages.warnings.forEach((message, index) => {
              console.warn(`[warning ${index}]: ${message}\n`)
            })
          }

          timeEnd(chalk.green('[\u2713] Application Bundled'))
          const protocol = state.config.devServer.https ? 'https' : 'http'
          console.log(
            `${chalk.green('[\u2713] App serving at')} ${chalk.blue(
              `${protocol}://${state.config.devServer.host}:${state.config.devServer.port}`
            )}`
          )
        } else {
          timeEnd(chalk.green('[\u2713] Bundle Updated'))
        }
      } else if (!skipLog) {
        console.log(chalk.redBright('[\u274C] Application bundling failed'))
        console.error(chalk.redBright(messages.errors.join('\n')))
        console.warn(chalk.yellowBright(messages.warnings.join('\n')))
      }

      first = false
    }
  )

  // Start the webpack dev server
  devServer = new WebpackDevServer(devCompiler, devServerConfig)

  // Start the messages socket
  const socket = io()

  reloadClientData.current = async () => {
    latestState = await fetchSiteData(latestState)
    socket.emit('message', { type: 'reloadClientData' })
  }

  await new Promise((resolve, reject) => {
    devServer.listen(port, null, err => {
      if (err) {
        console.error(`Listening on ${port} failed: ${err}`)
        return reject(err)
      }
      resolve()
    })
  })

  // Make sure we start listening on the message port after the dev server.
  // We do this mostly to appease codesandbox.io, since they autobind to the first
  // port that opens up for their preview window.
  socket.listen(messagePort)

  console.log('Running plugins...')
  state = await plugins.afterDevServerStart(state)

  return state
}
