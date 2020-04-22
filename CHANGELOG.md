# Changelog

## master

### New

- Allow dots in routes. ([#1365](https://github.com/react-static/react-static/pull/1365))
- Add `silent` option ([#1330](https://github.com/react-static/react-static/pull/1330))
- Add clickable dev-server url ([#1306](https://github.com/react-static/react-static/pull/1306))
- Add unofficial plugin `react-static-plugin-file-watch-reload` to plugins list
- Enable configuring css loader from `react-static-plugin-sass` and `react-static-plugin-less` ([#1348](https://github.com/react-static/react-static/pull/1348))
- Update `react-static-plugin-jss` for react-jss v10+. ([#1367](https://github.com/react-static/react-static/pull/1367))
- Add inline script hashes to `DocumentProps`. These hashes can be used to construct a Content Security Policy in a meta tag without `unsafe-inline` scripts. ([#1373](https://github.com/react-static/react-static/pull/1373))
- Add environments variables (`REACT_STATIC_MESSAGE_SOCKET_PORT` and `REACT_STATIC_MESSAGE_SOCKET_HOST`) to change the xhr polling(socket.io) host and port (Only DevServer)
- Update protocol shown in the "App serving at" message to display `https` when configured ([#1399](https://github.com/react-static/react-static/pull/1399))

### Improved

- Fix `basePath` edge case ([#1344](https://github.com/react-static/react-static/pull/1344))
- Fix typings `withSiteData` ([#1319](https://github.com/react-static/react-static/pull/1319))
- Fix "can not read property `catch` of `undefined`" ([#1313](https://github.com/react-static/react-static/pull/1313))
- Fix missing state.siteData in dev ([#1148](https://github.com/react-static/react-static/pull/1148))
- Fix empty or undefined error in sitemap plugin ([#1233](https://github.com/react-static/react-static/issues/1233) and [#1312](https://github.com/react-static/react-static/issues/1312))
- Fix stderr pollution by progress module ([#1356](https://github.com/react-static/react-static/pull/1356))
- Fix package.json and README for `react-static-plugin-stylus` ([#1244](https://github.com/react-static/react-static/issues/1244))
- Fix Webpack stats output in environment that don't support color ([#1370](https://github.com/react-static/react-static/pull/1370))
- Fix Webpack `externals` configuration for monorepo support ([#1383](https://github.com/react-static/react-static/pull/1383))

## 7.2.2

### Improved

- Force line endings to be LF ([`38ef613`](https://github.com/react-static/react-static/commit/38ef613c7b23e87da418eff115f8a505d274233d))
- Fix `addPrefetchExcludes` type definition ([#1300](https://github.com/react-static/react-static/pull/1300))

## 7.2.0

### New

- Add `plugins` to `plugin` hook so plugins can have plugins ([#1264](https://github.com/react-static/react-static/pull/1264))
- Add Node 12 support ([#1219](https://github.com/react-static/react-static/pull/1219))

### Improved

- Remove file inline-ing when the file is larger than an arbitrary size ([#1222](https://github.com/react-static/react-static/pull/1222))
- Fix relative paths when the should have been absolute ([#1250](https://github.com/react-static/react-static/pull/1250), [#1253](https://github.com/react-static/react-static/pull/1253), [#1254](https://github.com/react-static/react-static/pull/1254), [#1272](https://github.com/react-static/react-static/pull/1272) and [#1276](https://github.com/react-static/react-static/pull/1254))
- Fix issue with react hot loader for IE ([#1274](https://github.com/react-static/react-static/pull/1274))
- Fix TypeScript definitions ([#1181](https://github.com/react-static/react-static/pull/1181))
- Fix component passing in `renderProp` of `Routes` ([#1181](https://github.com/react-static/react-static/pull/1181))

## 7.1.0

### New

- `afterBundle` hook added
- `react-static-plugin-evergreen`: A plugin for using evergreen-ui
- `react-static-plugin-stylus` A plugin for using stylus
- Add a styled-components guide
- Add `react-static-plugin-google-tag-manager` to the list of 3rd party plugins

### Improved

- CSS HMR support is now much more reliable.
- `react-static-plugin-mdx`: Allow passing MDX options to webpack loader (e.g. `remarkPlugins` and `rehypePlugins`)
- Failed builds will finally exit with a non-zero status code!
- Update Typescript Defs
- The latest version of React Static will now be installed with new projects
- Add postcss and autoprefixer to sass plugin
- Less plugin should now build properly
- React-Helmet version was bumped to fix a few upstream issues
- Fix react/react-dom aliases to allow submodules
- Prefetch now uses a proper `data-` prefix

## 7.0.10

### Improved

- `react-static-plugin-mdx`: Bump webpack loader version to v1
- `react-static`: HMR dev server client is only required once, and HMR emitter now resolves to a single instance
- `react-static`: Hot reloading stability has been improved to better support hooks like React.useState and React.useEffect
- `react-static`: Update eslint rules and code to pass those rules.

## 7.0.9

### Improved

- `react-static`: Alternative dev server port is now accurate
- `react-static`: Dev server location is now logged in blue for more visibility

## 7.0.8

### Improved

- Fixed issues with custom config specified using `-c` or `-config` is not loaded
- `react-static-plugin-source-filesystem`: Fixed resolution on Windows
- `react-static`: Fixed building chunks on Windows
- `react-static`: Fixed production build on Windows
- `react-static-plugin-sitemap`: Removed invalid closing `</xml>` tag
- `react-static-plugin-sitemap`: Improved minification of generated sitemap XML in production

## 7.0.7

### Improved

- Fixed issues with siteData being fetched twice during dev mode
- Updated typescript template to use latest depenencies

## 7.0.6

### Improved

- Typescript template now uses JS for static.config.js. It will use typescript in the future, but for now is not fully or reliably supported.
- Config and plugin resolution is now more accurate.
- App entry resolution is now more reliable.
- config.paths are now more reliably detected and parsed
- Typscript template is now more stable

## 7.0.5

### Improved

- Fix bug where default `config.devServer` is not an object.

## 7.0.4

### Improved

- You can now override the default `host` and `port` of the webpack dev server via `config.devServer`.

## 7.0.3

### Improved

- `siteData` is now properly invalidated and refetched when `reloadClientData` is called and/or the `static.config.js` is updated.

## 7.0.2

### Improved

- `blank` template now properly imports `app.css`
- Updated pull request template to include CHANGELOG checkbox

## 7.0.1

### Improved

- Updated dependencies of templates to use 7.0.0
- Updated Readme to remove @next reference

## 7.0.0

### New

- React-Static is now powered by hooks!
- Suspense is now used internally for routes that are not loaded yet **during runtime only**. This means, you can handle the loading state at any level of your app by using React's Suspense component eg. `<React.Suspense fallback={<span>Loading...</span>}>`. **NOTE: SUSPENDING DURING SSR IS STILL NOT SUPPORTED. When `document === 'undefined', you MUST render a loading placeholder instead.**
- The `Root` component now has a browser-side plugin interface called `Root`.
- The `Routes` component now has a browser-side plugin interface.
- You can now use `useRouteData` and `useSiteData` hooks to fetch site and route data (related deprecations below)
- You can now use the `usePrefetch` hook to prefetch routes (related deprecations below)
- `useLocation`, `useBasepath` `useRoutePath` and `useStaticInfo` have been added as utility hooks for both users and plugins.
- You can now use a `--analyze` CLI options to quickly profile your production webpack bundle (related deprecations below)
- The new `react-static-plugin-sitemap` plugin allows you to build and customize a sitemap for your site from your routes.
- The new `react-static-plugin-source-filesystem` plugin allows you to recursively import and create routes from any webpack compatible files in a directory!
- New plugin APIs!
  - afterGetConfig
  - beforePrepareBrowserPlugins
  - afterPrepareBrowserPlugins
  - beforePrepareRoutes
  - getRoutes
  - normalizeRoute
  - afterPrepareRoutes
  - webpack
  - afterDevServerStart
  - beforeRenderToElement
  - beforeRenderToHtml
  - htmlProps
  - headElements
  - beforeHtmlToDocument
  - beforeDocumentToFile
  - afterExport
- Use the new `addPrefetchExcludes` method to exclude paths (like dynamic ones that would produce 404s) from every being prefetched! Yay!
- You can now customize terser options via the `config.terser` object. This object is passed directly to the Webpack Terser plugin.
- You can use the `getWebpackConfig(configPath, stage)` function from `react-static/node` to synchronously generate the webpack configuration for any static.config.js + state combination. This is especially useful for eslint plugins and other developer tools that rely on a webpack configuration during dev time.

### Improved

- Hot reloading is now MUCH more reliable
- Hot data reloading is now MUCH more reliable
- Changes to `static.config.js` during development are now more reliable
- Plugin resolution is now more reliable
- Production webpack bundles now have a default `performance.maxEntrypointSize` of `300000` bytes (300kb)
- Immutable global state is now being used internally that offers massive stability improvements. This same global state is provided and reduced through the revamped plugin API
- The plugin API has been revamped to offer more control over the state of the CLI and build processes.
- The ErrorBoundary UI is only shown in production now. During development, the standard react-hot-loader error reporter will show again.
- Source maps are no longer exported by default in production. To export them in production, turn them on via `config.productionSourceMaps: true`
- Logging is now cleaner and more succinct (removed `=>` from all log lines)

### Breaking Changes

Migration tips are listed as sub-items if applicable.

- Upgraded to React 16.8.x
  - You will need to upgrade `react` and `react-dom` to this version. You will also want to make sure all of your other react-related libraries are compatible with this upgrade.
- Route objects returned in `getRoutes` now use the property `template` instead of `component`
  - Replace all instances of `component` with `template` when defining a route both in static.config.js or plugins.
- The `Prefetch` component has been deprecated in favor of the `usePrefetch` hook.
  - You will need to refactor your usage of Prefetch to use this new hook or create your own Prefect component that utilizes the hook. Most applications don't use manual prefetching, so we don't foresee this being an big deal for most, if not all projects.
- All scroller props previously supported on the `Root` component are now deprecated. Since you can bring your own router to React Static now, there is no reliable built-in way to ship auto hash scrolling without severly bloating the core of React Static. Please use a smooth scrolling library that supports the router you choose, or better yet, we recommend going with the _mostly_ supported `html { scroll-behavior: smooth; }` css property for decent support.
  - Remove any and all props from the `Root` component that are related to scrolling.
- Plugin loading order has been changed to:
  - Absolute Require.resolve (will use package.json's `main` entry to resolve)
  - Absolute Path
  - `plugins/` relative path
  - Require.resolve (from Plugins directory)
  - CWD relative path
  - Require.resolve (from Root directory)
- `config.bundleAnalyzer` is now deprecated in favor of the `build --analyze/-a` and `export --analyze/-a` option.
- sitemap functionality has now been extracte into the `react-static-plugin-sitemap` plugin.
  - route properties like `noindex`, `lastModified`, and `priority` are now meant to be set under a `route.sitemap` object and map directly to xml attributes now. eg. `route: { sitemap: { lastmod: '10/10/2010', priority: '0.5' } }`
  - `noindex` is still an inherited attribute
- Functionality to include the `pages` directory has been moved to a plugin called `react-static-plugin-source-filesystem`. It ships by default with every template to use the `src/pages` directory within the template.
- `config.disableDuplicateRoutesWarning` has been depreacted. This is mainly because multiple hooks can now create routes for the same route and by default, they are merged together unless specified with the `replace: true` flag on the route creation.
- Internally, all state is now being tracked and stored in a single global state variable. This global state is passed around everywhere, including `getRoutes`, most plugin hooks, and just about anywhere React Static calls into your own user code.
- `options and options.dev` in several locations has been deprecated (getRoutes, getData, etc.) and has been replaced with the internal state of React Static. You can still access `options.dev` by using `state.stage === 'dev'`.
- The `getConfig` hook has been renamed to `afterGetConfig` and is now a reducer that accepts and returns the global state
- The `reloadRoutes` function exported from `react-static/node` has been renamed to `reloadClientData`
- The `Head` plugin hook in `node.api.js` has now been aptly renamed to `headElements` and is now a reducer, not a mapper.
- The entire internal state of React Static is now available via the `state` prop in the `Document` component
- The `renderMeta` prop available on the `Document` component hass been renamed to `meta` and is now only available on the `state` prop of the document component
- The environment variable `process.env.REACT_STATIC_SLAVE` has been renamed to `process.env.REACT_STATIC_THREAD`.
- Plugin methods like `webpack` must now explicityly return `undefined` if they wish to opt-out (previously you could return anything falsey)
- Source maps are no longer exported by default in production. This may break logging or reporting tools if you rely on production source maps. If you wish to still export them in production, turn them on via `config.productionSourceMaps: true`
- Though still available, the `start`, `bundle` and `export` commands are being deprecated and have been removed from the documentation.
- The child renderer and corresponding `getComponentForPath` utility previously provided via the `Routes` component has been deprecated.

## 6.3.6

### Fixes & Optimizations

- Fix prefetching issues for 404 templates and other edge cases.
- Fix registration of 404 template on client boot
- Fix remounting of Route components when no history changes have occurred
- Use outputPath when inlineCss option is used
- Move build artifacts out of the `dist` directory and into a new `artifacts` directory

## 6.3.5

### New Features

- MDX plugin
- Typscript Template
- Non-js extensions
- Use Terser instead of uglifyJS
- Fix Shared-Data loading
- Uprade to React 16.8

## 6.2.0

### New Features

- Added support for incremental builds

### Fixes & Optimizations

- Fixed a security issue where `process.env` variables could be exported and distributed by accident.
- Remove update-notifier. It was never that reliable and was presenting problems with multi-threading.

## 6.1.0

### New Features

- Official browser plugin support
- Added the `Router` browser plugin hook
- Added the `react-static-plugin-react-router` plugin and guide

### Fixes & Optimizations

- Various css-loader issues have been fixed in plugins for more stability with the latest features

## 6.0.20

### Deprecations

- Silently deprecated both `config.renderToHtml` and `config.renderToElement` in favor of using the plugin API. Hope this doesn't annoy anyone too much. Better to do it now that later!

## 6.0.10

### Fixes & Optimizations

- Reduced the size of npm installation by removing the `archives` directory from the npm tarball

## 6.0.9

### Fixes & Optimizations

- Fixed an issue where helpers were not included in external node_modules imported through babel

## 6.0.8

### Fixes & Optimizations

- Added Guides to documentation. All example except for the three main templates (located in `packages/react-static/templates` will be converted over to guides eventually.
- Examples have been deprecated and are no longer available as templates for `react-static create`. They have been moved to `archives/old-examples`.

## 6.0.7

### Fixes & Optimizations

- Fixed styled components example for V6 (#889)

## 6.0.6

### Fixes & Optimizations

- Removed old website code
- Fixed examples to import Link from external router modules

## 6.0.1

### Fixes & Optimizations

- The CLI now uses `minimist` instead of `commander`. Along with this change, there is now only a single binary for all of react-static. This should cut down on inconsistencies between `npm` and `yarn` and how they treat multi-binary projects.

## 6.0.0

### New Features

- A `pages` directory is now available. Any files in this directory will automatically become unique routes with no configuration necessary.
- `react`, `react-dom`, `react-router` and `react-hot-loader` dependencies are now optional as project dependencies and will resolve using react-static's versions if needed.
- Plugin system. Hook and the like capable of altering and adding features to a project non-invasively.
- Created `react-static-plugin-emotion`
- Created `react-static-plugin-styled-components`
- Updated eslint and prettier and configured both to run on the pre-commit git hook
- `config.maxThreads` now lets you specify how many maximum threads to use to export your html files.
- `config.disablePreload` lets you disabled automatic preloading for debugging worst case scenarios.

### Breaking Changes

- Upgraded to Webpack 4 - Make sure your webpack modifications are compliant with its new API
- The `config.webpack` option has been removed in favor of using the new plugin system. This should encourage the creation of plugins and also provide a single way of doing things with webpack.
- Upgraded to Babel 7 - Make sure your babel plugins are compliant with this version.
- `react-hot-loader`'s `hot(module)(Component)` syntax has been changed to now use the `<AppContainer>` approach. This is much easier than using the `hot(module)(Component)` in every module you create.
- Removed the `is404` property from the 404 route. To designate a 404 route, you can now place a `404.js` file in your pages directory or create a route where the `path === '404'`
- `static.config.js` will now be imported and run multiple times depending on how many threads your build environment supports. If this is a problem, you can use the `process.env.REACT_STATIC_THREAD === 'true'` condition to detect if the instance is a threaded export slave or not.
- `config.renderToHtml` has been deprecated in favor of using the `beforeRenderToElement` hook.
- `config.usePreact` is no longer an option in the `static.config.js` file. Use the `react-static-plugin-preact` plugin.
- A new loader for external JS files is now used after the normal `jsLoader` called `jsLoaderExternal`. It is responsible for handling all javascript files that are not located in your projects source.
- The Routes (and `react-static-routes`) import has been replaced by simply doing `import { Routes } from 'react-static'`. Under the hood, this uses a webpack alias to point to the generated `dist/react-static-routes.js` file, and thus won't confuse linters or IDEs like codesandbox :).
- Passing an object as the config to react-static is no longer supported. You must pass a location of the root of the project.
- All `render` and `component` props are now deprecated in favor of using `child-as-a-function` rendering. Anywhere you are using these props must be migrated to use a child as a function.
- The `Loading` component has been removed. If you wish to show loading states in your app, you can use the `Loading` props for any components that support them. This is in preparation for React...Suspense!
- React-Static no longer ships with any routing-related functionality. It functions independently of your routing paradigm. Thus, it no longer exports anything from `react-router`.
- The `PrefetchWhenSeen` component has been deprecated in favor of only using the `Prefetch` component
- The `Prefetch` component is now smart like `PrefetchWhenSeen` was.
- The client-side `Redirect` component has been deprecated. Redirects should be done in the `static.config.js`. If the user needs to do any redirects for dynamic/runtime routes, they can use their favorite router's redirect solution.
- `Router` has been deprecated and replaced by the `Root` component. The `Root` component implements the `HashScroller` component, an `ErrorBoundary` and a very simple and non-invasive route context using `@reach/router` (the recommended router). The base router is customizable or replaceable if the user wishes to use a different router.
- The `Root` component renders a `div` under the hood (from reach/router). This may affect layouts during migration.
- `config.disableRouteInfoWarning` has been depracated. Do not use `RouteInfo` on non-static pages!
- Shared route data is no longer calculated automatically for performance reasons. This was previously done on every key of every prop sent to a route, which was very expensive for little benefit.
- Shared route data is still supported via the `createSharedData` utility and the `sharedData` property on a route. See the docs for information on usage.

### Fixes & Optimizations

- React-Hot-Loader should now work out of the box for all projects. If it doesn't, please report it immediately!
- Much better performance when building routes for large sites via general performance improvements and also multi-threading HTML exporting
- Fixed an issue where XML sitemaps contained invalid characters
- Refactored many files to be more easily testable

# 5.9.7

### Fixes & Optimizations

- Removed `jsesc` until we can find a better way to handle utf-8 encoding for routeInfo
- Removed a stray console.log

## 5.9.6

### Fixes & Optimizations

- Updates examples sites & various documentation typos
- Log errors during build configuration step to aid in build debugging.
- Moved away from Slack to Spectrum for support and community.
- Fixed a regression that prevented cache busting on routeInfo.js files
- static/index.js logic is now broken up into smaller pieces.
- Added various tests for parts of static/index.js
- Upgraded snapshots for testing

## 5.9.4 - 5.9.5

### Fixes & Optimizations

- Removed deprecated react-hot-loader/patch from webpack dev entry, but kept the `react-hot-loader` entry to ensure it is required before React.
- Updated tests to work with regressions

## 5.9.3

### Fixes & Optimizations

- Add tests for building a sitemap
- Add tests for building the config
- Improved Gentics Mesh example

## 5.9.2

### Fixes & Optimizations

- Fix an issue with routeInfo not loading on 404 pages
- String comparisons are used for env variables now
- Ignore tests when created a build
- Fix examples that use the css loader to work correctly
- Don't replace hrefs if route prefixing is disabled
- New sites in the built-with list
- An automated was added to test all examples build integrity
- Upgraded some dependencies

## 5.9.1

### Fixes & Optimizations

- Fix inifinite loading issue introduced with 5.9.0

## 5.9.0

### Features

- The `<Loading>` component and the `onLoading` method now return a more detailed loading state. `0` for not loading, `1` for "soft" loading (when navigation is happening) and `2` for "hard" loading (when asynchronous assets are being requested).

## 5.8.8

### Fixes & Optimizations

- Switch from `babel-preset-latest` to `babel-preset-env`.
- Remove unnecessary `babel-preset-stage-3` since it's included already with `babel-preset-stage-0`.

## 5.8.7

### Fixes & Optimizations

- Expose the react-static babel settings as a `babel-preset.js` file for more complex babel setups. `.babelrc` uses this preset for backwards compatibility.

# 5.8.6

### Fixes & Optimizations

- Upgraded `swimmer` to hide log messages.
- Document-level rendering now uses `renderToStaticMarkup` instead of `renderToString`. This ensures there is no code comments or meta markup in the <head>

## 5.8.5

### Fixes & Optimizations

- Upgrade Documentation example and expose some undocumented utilities to the outside world.

## 5.8.4

### Fixes & Optimizations

- Remove console.log from `documentation` example

## 5.8.3

### Features

- Added a `config.disableDuplicateRoutesWarning` option.

## 5.8.1

### Fixes & Optimizations

- Improved `getPath` and `getRoutePath` methods, and added some simple tests for them.

## 5.8.0

### Features

- Added the `pagination` example.
- Added a `makePageRoutes` utility function on the `react-static/node` import to help with generating page routes from an array of items.

## 5.7.6

### Features

- Added a `config.disableRouteInfoWarning` configuration option to silence missing route information in development

### Fixes & Optimizations

- Missing routeInfo.json requests do not throw in production now.
- Fixed an error where router `path`s would not match as expected during static export. It now uses the same format (leading slash at root patsh) as react-router does by default during development.

## 5.7.5

### Fixes & Optimizations

- New Error handler component and accompanying tests. Thanks @jasonlafferty!

## 5.7.2-4

### Fixes & Optimizations

- Improved prefetch lifecycles and page responsiveness for slow networks.

## 5.7.1

### Features

- Added hidden feature to rebuild routes and routeData automatically when the config is edited during development.

## 5.7.0

### Features

- Added hidden feature to rebuild routes and routeData during development.

## 5.6.8

### Fixes & Optimizations

- Fixed yet another issue in the dev server that could result in a 404 on first load.

## 5.6.6 - 5.6.7

### Fixes & Optimizations

- Fixed gitignore files from not being generated

## 5.6.5

### Fixes & Optimizations

- Fixed an issue in the dev server that would result in a 404 on first load.
- Upgrade eslint rules to latest versions

## 5.6.4

### Fixes & Optimizations

- Fix `gitignore` issues

## 5.6.3

### Fixes & Optimizations

- `.gitignore` files can now have the `dot` prefix in examples. Automatic changes resulting in a `.npmignore` name swap are handled by `react-static create`
- `react-static build --debug` flag now uses the `development` flag so as to not hide react warnings, errors and disable react minification
- Changed default `dist` folder during development to `tmp/dev-server`
- No more losing internal state in components during hash navigation
- Dev server now serves `public` directly through webpack, allowing immediate feedback to changes in its files.

## 5.6.2

### Fixes & Optimizations

- `--config` CLI argument accepts a path again.
- Netlify CMS example now uses `npm` instead of `yarn` as the default Netlify script
- Documentation Updates
- CLI now uses `pretty-error`!
- CLI route export errors now display the route that errored.
- TypeScript example now excludes node_modules in `tsconfig.json`
- MaterialUI updated to use latest beta

## 5.6.1

### Fixes & Optimizations

- In the `typescript` example, `ts-loader` is fixed for webpack 3
- `less-antdesign` has been updated to run and work properly.

## 5.6.0

### Features

- Added `config.extractCssChunks` option. Set to `true` for automatic style-splitting and importing using `ExtractCssChunks` instead of `ExtractTextPlugin`.
- Added `config.inlineCss` option. Set to `true` to inline all styles into the resulting HTML document instead of using `link` tags.

### Fixes & Optimizations

- Server-side rendering of UTF-8 characters no longer behaves erratically.
- Resulting HTML for a route no longer includes double instances of route data.
- Auto hash scrolling is no more responsive and handles more edge cases.
- Fetching route info for non-existent routes now has better logging.
- Fixed a bug where an imported `woff2` file extension would crash babel.

## 5.5.14

### Fixes & Optimizations

- Fixed a missing export of `propsByHash`.
- Added `update-notifier` so people can keep up with all these updates!

## 5.5.13

### Fixes & Optimizations

- Moved `gitdocs` to dev dependencies
- Added `shrink-to-fit` to default `Document` meta.

## 5.5.12

### Fixes & Optimizations

- Production code-split components that error will now log the correct error to the console.
- Added `routeInfo` to the `config.Document` component.

## 5.5.11

### Fixes

- The `react-hot-loader/babel` is no longer used in production. Who's the dummy who did that?! (...me, haha)
- `compact: false` is now the default in `.babelrc`. Only a select few care about those compaction messages anyway.
- Various `__dirname` references are now fixed with the correct number of `../`'s

## 5.5.10

### Fixes

- Fixed a rare issue where hash links may not be scrolled to if navigation is fast enough (imagine that ;)
- Added a `config.paths.root` option that is also rare.

## 5.5.9

### Fixes

- Fixed a rare issue (in Gitdocs mostly) where a RouteData would not load even though routeInfo.allProps was synchronously
  accessible.

## 5.5.1-8

### Fixes

- `.com` or any other suffix is no longer clipped from `siteRoot`.
- Absolute URL rewriting now takes into account `basePath` and also `src=''` attributes
- 404 component more reliably supports `RouteData` and is generally more stable.
- An `is404` prop is now available via `RouteData/withRouteData` if and when rendered on a 404 page, **regardless if it is the /404 route itself or any other route that results in a 404.**
- Fixed some hot-reloading side effects that were introduced with the new project architecture.
- Lost some weight on the node packaging. The docs and many other large files are now excluded from distribution.
- Improved the node API support with much more stability.
- Added a `key` prop to the rendered route in `react-static-routes.js` to avoid stale or mixed state for routes that happen to share the same top-level component.
- Removed complexity from the user by making the `<Routes>` component's `getComponentForPath` render prop more robust. (Check documentation if you use custom rendering for your `react-static-routes`)

## 5.5.0

### Features

- Added a `Redirect` component and `route.redirect` option to routes.

### Fixes

- `src='/'` paths are now also rewritten with siteRoot and basePath

## 5.4.0

### Features

- Added Node API to React-Static via importing `react-static/node`
- Added the ability to use a custom `static.config.js` via the CLI
- Added `config.basePath` option for hosting and running react-static sites from a sub-route
- Added `config.stagingSiteRoot`, `config.stagingBasePath`, `config.devBasePath`. Used for overriding the above options in specific environments
- Added the ability to create projects using a local template location.

### Fixes & Optimizations

- Entire repo has been reorganized and split for easier maintenance and project grokking ability.
- Template information and route data hashes are now automatically generated and collocated in a `routeInfo.js` for each route, instead of in a single location (give them massive sites some support, baby!)
- Fixed `config.siteRoot` to be more reliable, but must no longer contain a sub route (it will be stripped)
- React Router now uses `config.basePath` for its `basename` prop
- History instances now use `config.basePath` for the `basename` option
- Moved the codegen for `react-static-routes` to its own file
- Added `maximum-scale=1` to the default document component's viewport meta
- More reliable handling of path slashes throughout the codebase
- Added react `key` props to head scripts, links and preloads

## 5.2.0

### Fixes & Optimizations

- Scrolling to a hash is now more accurate, especially if the page reflows during mid scroll.
- Added documentation website that is built with `gitdocs`. Still a few kinks to work out.
- Updated build-with site list
- All `.gitignore` files are now uniform to not include the `.` until copied during creation
- Fixed an import typo with the `sass` example
- Added a basic error logging handler for universally-code-split components
- Various upkeep items on the Netlify-CMS example
- CLI now uses `commander`
- Disabled code-splitting in dev mode. This fixes a majority of problems with react-hot-loader without requiring users to make a ton of changes to their exports.

### Features

- CLI now supports using a `.git` address to clone for the template.

## 5.1.14

### Fixes

- Fixed `component` style render props from not passing children

## 5.1.13

### Features

- `Router.scrollToHashOffset` prop allows for setting an offset for hash scrolling now :)
- Added `netlify-cms` example.

### Fixes & Optimizations

- Squashed some bugs

## 5.1.8

### Fixes & Optimizations

- Removed the various `extract-hoc` related babel plugins in favor of the new `react-hot-loader` version 4.

## 5.1.0

### Features

- Added `--staging` CLI argument to `react-static build` that does not perform build-time optimizations like siteRoot replacement on links assets, etc. If you are testing your site locally, you will likely want to use this option to allow your production site to be navigable on localhost.

## 5.0.0

### Features

- Automatic Route Splitting. From here on out as long a project is using the automatic component-based static routing, all route templates will be automatically deduped and split into separate modules. These modules are statically-rendered into every page that uses them, are preloaded asynchronously with React-Static built-in prefetching utiliies, and are also loaded on demand if needed as the client navigates through your site. Carry on!
- Automatic prefetching of templates and assets. Any eligible `Link` component to a code/data-split destination will automatically queue a prefetch for the appropriate assets.
- Render prop versions of `withRouteData` and `withSiteData` are now available as `RouteData` and `SiteData`. These support inline access to their respective props, instead of having to set up an HOC. They also support all three major render prop syntaxes, so render those props however you want!. See the README for more information.
- Added a new `Loading` render prop component and a companion `withLoading` HOC component to easily display React-Static's loading state (that probably won't happen much, but still... ;).
- Added a new `Loading`/`withLoading` render prop / HOC component pair. You can render this component to gain access to the `loading` prop, which was previously only accessible via the `Router.subscribe` callback.
- Path changes now automatically scroll to the top of the page. Duration defaults to `0`ms, but can be modifed via the `scrollToTopDuration` prop on the `Router` component.
- Hash routing changes now automatically scroll to the element (or top of the page if the hash is removed but the path stays the same). Duration defaults to `800`ms, but can be modifed via the `scrollToHashDuration` prop on the `Router` component.

### Breaking Changes

- In some previous scenarios the window's `location.search` would be taken into account when matching a path. That is now not the case. You could never previously rely on URL parameters for static paths, but now we're letting you know :)
- The `getRouteProps` and `getSiteData` HOC's have both been renamed to `withRouteData` and `withSiteData`. Using the old methods will result in a deprecation notice and a broken app. Luckily this is an easy find and replace :)
- `Router.subscribe` has been deprecated. Though, if you still need programmatic access to a loading event, you can use the new `onLoading` subscriber that functions the same way.

### How to Upgrade

- In your components:
  - Replace all instances of `getRouteProps` with `withRouteData`
  - Replace all instances of `getSiteProps` with `withSiteData`
  - Replace all instances of `Router.subscribe` with `onLoading`, and import `onLoading`.
- In your `static.config.js`:
  - Replace all instances of `getProps` with `getData`
  - Replace `getSiteProps` with `getSiteData`
  - If you are using a custom `Document` be sure to replace the `siteProps` prop with `siteData`.
- Note: To take advantage of auto-code-splitting, you cannot use custom routing for your static routes. I suggest migrating to the automatic routing strategy asap.

## 4.8.2

### Fixes & Optimizations

- `getRouteProps` was fixed to always have access to the router props, thus supporting `getRouteProps` as nested components instead of top-level page components.

## 4.8.1

### Fixes & Optimizations

- Node version was rolled back to `<=6.10.0`, to allow some existing users continued usage.

## 4.8.0

### Features

- Preact can now be used in production by setting `preact: true` in your `static.config.js`! Remember to use `ReactDOM.render` instead of `hydrate` in production too :)
- Added the `preact` example.

## 4.7.2

### Fixes & Optimizations

- `getRouteProps` now functions as it should when it's wrapped component receives new props without remounting. (Thanks [@EmilTholin](https://github/EmilTholin)!)
- Node ~~>=7.5.0~~ `<=6.10.0` is now stated as required, instead of implied.
- When building for `node` stage, the `main` is now preferred in package imports, instead of `module`
- Better module resolution locations, which allows overriding react-static module versions by installing them locally.

## 4.7.1

### Features

- Added Firebase Authentication example (Thanks [@deden](https://github/deden)!)

### Fixes & Optimizations

- Better error logging for unhandled promise rejections
- Handle Routes with spaces (Thanks [@etimberg](https://github/etimberg)!)
- Add shouldPrefetch() method to avoid setting loading state (Thanks [@chrisbrown-io](https://github/chrisbrown-io)!)
- Pass DOM props through in links (Thanks [@denis-sokolov](https://github/denis-sokolov)!)
- Pass additional CLI arguments through to getSiteData() (Thanks [@etimberg](https://github/etimberg)!)

## 4.7.0

### Features

- Common props returned by `getRouteProps` (props that `===` one another) now promoted to **shared props** and only requested once per session. Learn more in the docs: [Automatic Data and Prop Splitting](https://github.com/react-static/react-static#automatic-data-and-prop-splitting). Depending on your site, this may significantly decrease site bandwidth and increase both initial page load speed and subsequent page load performance.

## 4.6.0

### Features

- `<Routes>` now accepts a render prop for custom rendering of automatic routes.
- Added `animated-routes` example.

### Fixes & Optimizations

- `Link` and `NavLink` now properly render hash links and external links. (Thanks [@denis-sokolov](https://github/denis-sokolov)!)
- `sass` example now uses a proper webpack loader configuration for style extraction. (Thanks [@talves](https://github/talves)!)

## 4.5.1

### Fixes & Optimizations

- `Link` and `NavLink` now properly render hash links and external links. (Thanks [@denis-sokolov](https://github/denis-sokolov)!)
- `sass` example now uses a proper webpack loader configuration for style extraction. (Thanks [@talves](https://github/talves)!)

## 4.5.0

### Features

- Added `sass` example. (Thanks [@2metres](https://github/2metres)!)
- Added `glamorous-tailwind` example. (Thanks [@deden](https://github/deden)!)
- The `REACT_STATIC_ENV` environment variable is now used internally (and set deterministically via usage of the `start` and `build` commands) instead of `NODE_ENV`. This means you can finally set your own `NODE_ENV` variables and use tools like `cross-env`. Yay!

### Fixes & Optimizations

- Fixed some misleading phrasing where a route component path could be assumed to be compatible with a class, function, or react component, when in fact it is the path to that. (Thanks [@Jonarod](https://github/Jonarod)!)
- `config.path.src` is now taken into account when constructing the `config.path.entry` path. (Thanks [@crubier](https://github/crubier)!)
- Added `manta.life` to list of sites built with React Static. (Thanks [@hql287](https://github/hql287)!)
- Updated the `graphql-request` example to use `react-markdown` instead of `dangerouslySetInnterHTML`. (Thanks [@hmeissner](https://github/hmeissner)!)

## 4.4.0

### Features

- Added `graphql-request` example. (Thanks [@ChrisNLott](https://github/ChrisNLott)!)

### Fixes & Optimizations

- Use ReactDOM.render instead of ReactDOM.hydrate in dev (Thanks [@EmilTholin](https://github.com/emiltholin)!)

## 4.3.4

### Fixes & Optimizations

- Cordova example's `res` directory is no longer included in the npm distribution making releases and installations much faster.

## 4.3.3

### Fixes & Optimizations

- Fixed a bug where windows users could not serve or build a project. (Thanks [@karland](https://github/karland)!)

## 4.3.2

### Fixes & Optimizations

- Fixed a bug where some directories or files weren't being included in npm distributions

## 4.3.1

### Fixes & Optimizations

- Fixed a bug where component names with numbers would not render propertly. (Thanks [@muloka](https://github.com/muloka)!)

## 4.3.0

### Features

- `config.paths.devDist` can now be set to specify a different scratch output directory when in development mode.

### Fixes & Optimizations

- `react-static-routes` imports are now relative, thus avoiding absolute path madness... hopefully? :)

## 4.2.0

### Features

- Added Probot to the github repo! Hooray!
- Better yarn/npm colors in cli. [@cgmx](https://github.com/cgmx)
- Router now uses `componentDidCatch` to gracefully display runtime errors for you.

### Fixes & Optimizations

- `react-static-routes` now uses dynamic template imports. [@EmilTholin](https://github.com/emiltholin)
- Helmet meta tags are more reliably extracted. [@EmilTholin](https://github.com/emiltholin)
- Config server is no longer served separately, but piggybacks on webpack dev server. [@rileylnapier](https://github.com/rileylnapier)

## 4.1.0

### Features

- Added `config.paths`, which can now be used to customize `dist` folder location and other file locations used by react-static
- Added `onStart` hook. Fires after the first successful dev build when running `react-static start`
- Added `onBuild` hook. Fires after a successful production build when running `react-static build`
- Added `config.devServer`, which can be used to customize the configuration for the webpack-dev-server used in development. (Thanks [@rywils21](https://github.com/rywils21)!)
- Added TypeScript typings for React-Static core exports (Thanks [@D1no](https://github.com/D1no)!)
- Allow customization of dev server PORT and HOST via those environment variables. (Thanks [@rywils21](https://github.com/rywils21)!)
- `config.getRoutes` is no longer required and will default to exporting a single root path.
- Webpack configurations can now be exported and used externally. (Thanks [@crubier](https://github.com/crubier)!)
- `<Root>` component now supports a `type` prop that can be: `browser`, `hash`, or `memory`, which defines which type of `history` object to create and use internally. Useful for non-web environments or situations where your app will be accessed in a filesystem or nested domain as opposed to a web server.
- Added Redux example (Thanks [@crubier](https://github.com/crubier)!)
- Added Apollo GraphQL example (Thanks [@crubier](https://github.com/crubier)!)
- Added Redux + Apollo example (Thanks [@crubier](https://github.com/crubier)!)
- Added Typscript example (Thanks [@D1no](https://github.com/D1no)!)

### Fixes & Optimization

- The `Document`'s `<title>` tag can now be used as a fallback to any `<title>` tag produced via the `<Head>` component. (Thanks [@EmilTholin](https://github.com/EmilTholin)!)
- Fixed a bug where not defining a 404 component resulted in an error during production build. (Thanks [@mplis](https://github.com/mplis)!)
- Fixed a bug where the webpack dev server would rebuild the app multiple times in a row when started up for the first time. (Thanks [@cgmx](https://github.com/cgmx)!)

## 4.0.0

### Breaking Changes

- The `webpack` function in `static.config.js` has a new function signature.
  - Each function is now **not** required to return a new config object. If a falsey value is returned, the transformation will be ignored, and the next transformation will carry on as normal. Even so, avoid mutating the config object at all costs ;)
  - A new argument is now available in the `args` parameter called `defaultLoaders`:
  ```javascript
    webpack: (
      config, {
        defaultLoaders: {
          jsLoader,
          cssLoader,
          fileLoader
        }
      }
    ) => {...}
  ```
  These loaders are here for convenience. Please read the documentation for more information.

### Features

- A dynamic code-splitting example and typescript example are now available! Huzzah!

### Fixes & Optimizations

- Webpack files are now hashed for better cache invalidation. It's about time right?!

## 3.0.0

### Breaking Changes

- Your `index.js` file must now export your app in NON-JSX form, eg. `export default App`, not `<App />`. With this change, builds can be faster, leaner, and have more control over the build pipeline.
- The optional `Html` component in `static.config.js` was renamed to `Document`.
- The `preRenderMeta` and `postRenderMeta` hooks in `static.config.js` have been deprecated in favor of the new `renderToHtml` hook. This is a very important change, so please check the readme if you are using these hooks!
- The new `renderToHtml` hook now uses a **mutable** meta object. This object is passed as a prop to the base `Document` component as `renderMeta` now, instead of the previous `staticMeta`.

### Features

- New `PrefetchWhenSeen` component allows for prefetching when component becomes visible in the viewport.

### Fixes & Optimizations

- Exporting is now up to 2x faster after switching from a dual pass to a single pass render strategy.
- Fixed a very elusive and angering bug where imported node_modules were not being shared between the node context and the node webpack build of the app used for exporting.

## 2.0.0

### Breaking Changes

- The `webpack` function in `static.config.js` has a new function signature.
  - The new value can be an array of functions or a single function.
  - Each function passed will receive the previous resulting (or built-in) webpack config, and expect a modified or new config to be returned. See [Webpack Config and Plugins](#webpack-config-and-plugins)

### Features

Now that the `webpack` callback accepts an array of transformer functions, the concept of plugins has been introduced. These transformer functions are applied in order from top to bottom and have total control over the webpack config. For more information see [Webpack Config and Plugins](#webpack-config-and-plugins)

```
webpack: [
  withCssLoader,
  withFileLoader
]
```

### Fixes & Optimizations

All route exporting is now done via a node bundle that is packaged with webpack. This should dramatically increase reliability in customization and cross-platform usability.
