import { getHooks, reduceHooks } from '../utils'

const hooks = {
  afterGetConfig: state => {
    const hooks = getHooks(state.plugins, 'afterGetConfig')
    return reduceHooks(hooks, { sync: true })(state)
  },
  beforePrepareBrowserPlugins: state => {
    const hooks = getHooks(state.plugins, 'beforePrepareBrowserPlugins')
    return reduceHooks(hooks)(state)
  },
  afterPrepareBrowserPlugins: state => {
    const hooks = getHooks(state.plugins, 'afterPrepareBrowserPlugins')
    return reduceHooks(hooks)(state)
  },
  beforePrepareRoutes: state => {
    const hooks = getHooks(state.plugins, 'beforePrepareRoutes')
    return reduceHooks(hooks)(state)
  },
  getRoutes: (routes, state) => {
    const hooks = getHooks(state.plugins, 'getRoutes')
    return reduceHooks(hooks)(routes, state)
  },
  normalizeRoute: state => {
    const hooks = getHooks(state.plugins, 'normalizeRoute')
    return route => reduceHooks(hooks, { sync: true })(route, state)
  },
  afterPrepareRoutes: state => {
    const hooks = getHooks(state.plugins, 'afterPrepareRoutes')
    return reduceHooks(hooks)(state)
  },
  webpack: (config, state) => {
    const hooks = getHooks(state.plugins, 'webpack')
    return reduceHooks(hooks, { sync: true })(config, state)
  },
  afterBundle: state => {
    const hooks = getHooks(state.plugins, 'afterBundle')
    return reduceHooks(hooks)(state)
  },
  afterDevServerStart: state => {
    const hooks = getHooks(state.plugins, 'afterDevServerStart')
    return reduceHooks(hooks)(state)
  },
  routeInfo: (routeInfo, state) => {
    const hooks = getHooks(state.plugins, 'routeInfo')
    return reduceHooks(hooks)(routeInfo, state)
  },
  beforeRenderToElement: (Comp, state) => {
    const hooks = getHooks(state.plugins, 'beforeRenderToElement')
    return reduceHooks(hooks)(Comp, state)
  },
  beforeRenderToHtml: (element, state) => {
    const hooks = getHooks(state.plugins, 'beforeRenderToHtml')
    return reduceHooks(hooks)(element, state)
  },
  htmlProps: (props, state) => {
    const hooks = getHooks(state.plugins, 'htmlProps')
    return reduceHooks(hooks)(props, state)
  },
  headElements: (elements, state) => {
    const hooks = getHooks(state.plugins, 'headElements')
    return reduceHooks(hooks)(elements, state)
  },
  beforeHtmlToDocument: (html, state) => {
    const hooks = getHooks(state.plugins, 'beforeHtmlToDocument')
    return reduceHooks(hooks)(html, state)
  },
  beforeDocumentToFile: (html, state) => {
    const hooks = getHooks(state.plugins, 'beforeDocumentToFile')
    return reduceHooks(hooks)(html, state)
  },
  afterExport: state => {
    const hooks = getHooks(state.plugins, 'afterExport')
    return reduceHooks(hooks)(state)
  },
  plugins: state => {
    const hooks = getHooks(state.plugins, 'plugins')
    return reduceHooks(hooks)(state)
  },
}

export default hooks

export const validatePlugin = plugin => {
  const validHookKeys = Object.keys(hooks)
  const hookKeys = Object.keys(plugin.hooks)
  const badKeys = hookKeys.filter(key => !validHookKeys.includes(key))
  if (badKeys.length) {
    throw new Error(
      `Unknown plugin hooks: "${badKeys.join(', ')}" found in plugin: ${
        plugin.location
      }`
    )
  }
}
