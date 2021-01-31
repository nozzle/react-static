const path = require('path')
const PrettyError = require('pretty-error')
const resolveFrom = require('resolve-from')
const Module = require('module')
//
const { escapeRegExp } = require('./')

// Allow as much stack tracing as possible
Error.stackTraceLimit = 10000

let ignorePath

const originalRequire = Module.prototype.require

// Check and see if we are running react-static from the repo
const needsWorkspaceCheck = __dirname.includes(
  '/react-static/packages/react-static/'
)

// Recursively checks a module to see if it originated from a
// react-static package in the repo
const inRepo = mod => {
  if (
    !mod.filename.includes('react-static/packages/react-static/') &&
    mod.filename.includes('react-static/packages/')
  ) {
    return true
  }
  if (mod.parent) {
    return inRepo(mod.parent)
  }
  return false
}

// The following ensures that there is always only a single (and same)
// copy of React in an app at any given moment.
// eslint-disable-next-line
Module.prototype.require = function(modulePath) {
  // If we are running in the repo, we need to make sure
  // module resolutions coming from other react-static packages
  // are first attempted from the
  const isInWorkspace = needsWorkspaceCheck && inRepo(this)

  // Only redirect resolutions to non-relative and non-absolute modules
  if (!modulePath.startsWith('.') && !modulePath.startsWith('/')) {
    if (
      // If module is in the repo try and redirect
      isInWorkspace ||
      // Always try and redirect react and react-dom resolutions
      ['react', 'react-dom'].some(d => modulePath.includes(d))
    ) {
      try {
        modulePath = resolveFrom(
          path.resolve(process.cwd(), 'node_modules'),
          modulePath
        )
      } catch (err) {
        //
      }
    }
  }
  return originalRequire.call(this, modulePath)
}

require('@babel/register')({
  babelrc: false,
  presets: [
    [
      path.resolve(__dirname, '../../babel-preset.js'),
      {
        node: true,
      },
    ],
  ],
  ignore: [
    function babelIgnore(filename) {
      // true if should ignore
      return (
        new RegExp(escapeRegExp(`${path.sep}node_modules${path.sep}`)).test(
          filename
        ) ||
        (ignorePath && ignorePath.test(filename))
      )
    },
  ],
})

// necessary at any entry point of the cli to ensure that Babel-register
// does not attempt to transform non JavaScript files.
const ignoredExtensions = [
  'css',
  'scss',
  'styl',
  'less',
  'png',
  'gif',
  'jpg',
  'jpeg',
  'svg',
  'woff',
  'woff2',
  'ttf',
  'eot',
  'otf',
  'mp4',
  'webm',
  'ogg',
  'mp3',
  'wav',
  'md',
  'yaml',
]
ignoredExtensions.forEach(ext => {
  require.extensions[`.${ext}`] = () => {}
})

const originalConsoleError = console.error
console.error = (...args) => {
  if (args.length === 0) {
    return undefined
  }
  const [err, ...rest] = args
  if (err instanceof Error) {
    console.log(new PrettyError().render(err), ...rest)
    return
  }

  return originalConsoleError(err, ...rest)
}

// Be sure to log useful information about unhandled exceptions. This should seriously
// be a default: https://github.com/nodejs/node/issues/9523#issuecomment-259303079
process.on('unhandledRejection', r => {
  console.error(r)
})

module.exports = {
  setIgnorePath(path) {
    ignorePath = path ? new RegExp(escapeRegExp(path)) : undefined
  },
}
