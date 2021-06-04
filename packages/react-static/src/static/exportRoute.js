import crypto from 'crypto'
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import Helmet from 'react-helmet'
import { ReportChunks } from 'react-universal-component'
import flushChunks from 'webpack-flush-chunks'
import nodePath from 'path'
import fs from 'fs-extra'
import jsesc from 'jsesc'

import Redirect from './components/Redirect'
import plugins from './plugins'
import { makePathAbsolute, is404Path } from '../utils'
import { absoluteToRelativeChunkName } from '../utils/chunkBuilder'

import makeHtmlWithMeta from './components/HtmlWithMeta'
import makeHeadWithMeta from './components/HeadWithMeta'
import makeBodyWithMeta from './components/BodyWithMeta'

let cachedBasePath
let cachedHrefReplace
let cachedSrcReplace

function getSHA256(str) {
  const hash = crypto.createHash('sha256')
  hash.update(str)
  return hash.digest('base64')
}

function getSubresourceHash(str) {
  const sha256 = getSHA256(str)
  return `sha256-${sha256}`
}

export function getEmbeddedRouteInfoScript(embeddedRouteInfo) {
  const routeInfoJSON = jsesc(JSON.stringify(embeddedRouteInfo), {
    isScriptContext: true,
    wrap: true,
    json: true,
  })
  const script = `window.__routeInfo = JSON.parse(${routeInfoJSON});`
  const hash = getSubresourceHash(script)

  return {
    hash,
    script,
  }
}

export default (async function exportRoute(state) {
  const {
    config,
    DocumentTemplate,
    route,
    siteData,
    clientStats,
    incremental,
  } = state

  let { Comp } = state

  const {
    sharedHashesByProp,
    template,
    data,
    sharedData,
    path: routePath,
    remove,
  } = route

  if (incremental && remove) {
    if (is404Path(route.path) || route.path === '/') {
      throw new Error(
        `You are attempting to incrementally remove the ${
          is404Path(route.path) ? '404' : 'index'
        } route from your export. This is currently not supported (or recommended) by React Static.`
      )
    }
    const removeLocation = nodePath.join(config.paths.DIST, route.path)
    return fs.remove(removeLocation)
  }

  const basePath = cachedBasePath || (cachedBasePath = config.basePath)

  const hrefReplace =
    cachedHrefReplace ||
    (cachedHrefReplace = new RegExp(
      `(href=["'])\\/(${basePath ? `${basePath}\\/` : ''})?([^\\/])`,
      'gm'
    ))

  const srcReplace =
    cachedSrcReplace ||
    (cachedSrcReplace = new RegExp(
      `(src=["'])\\/(${basePath ? `${basePath}\\/` : ''})?([^\\/])`,
      'gm'
    ))

  // This routeInfo will be saved to disk. It should only include the
  // data and hashes to construct all of the props later.
  const routeInfo = await plugins.routeInfo(
    route,
    state
  )

  // This embeddedRouteInfo will be inlined into the HTML for this route.
  // It should include all of the data, including shared data
  const embeddedRouteInfo = {
    ...routeInfo,
    sharedData,
    siteData,
  }

  const inlineScripts = {
    routeInfo: getEmbeddedRouteInfoScript(embeddedRouteInfo),
  }

  state = {
    ...state,
    routeInfo,
    embeddedRouteInfo,
    inlineScripts,
  }

  // Make a place to collect chunks, meta info and head tags
  const meta = {}
  const chunkNames = []
  let head = {}
  let clientScripts = []
  let clientStyleSheets = []
  let clientCss = {}

  let FinalComp

  // Get the react component from the Comp and pass it the export context. This
  // uses reactContext under the hood to pass down the exportContext, since
  // react's new context api doesn't survive across bundling.
  Comp = config.disableRuntime ? Comp : Comp(embeddedRouteInfo)

  if (route.redirect) {
    FinalComp = () => <Redirect fromPath={route.path} to={route.redirect} />
  } else {
    FinalComp = props => (
      <ReportChunks
        report={chunkName => {
          // if we are building to a absolute path we must make the detected
          // chunkName relative and matching to the one we set in
          // generateTemplates
          if (!config.paths.DIST.startsWith(config.paths.ROOT)) {
            chunkName = absoluteToRelativeChunkName(
              config.paths.ROOT,
              chunkName
            )
          }

          chunkNames.push(chunkName)
        }}
      >
        <Comp {...props} />
      </ReportChunks>
    )
  }

  const renderToStringAndExtract = comp => {
    // Rend the app to string!
    const appHtml = renderToString(comp)
    const { scripts, stylesheets, css } = flushChunks(clientStats, {
      chunkNames,
      outputPath: config.paths.DIST,
    })

    clientScripts = scripts
    clientStyleSheets = stylesheets
    clientCss = css
    // Extract head calls using Helmet synchronously right after renderToString
    // to not introduce any race conditions in the meta data rendering
    const helmet = Helmet.renderStatic()
    head = {
      htmlProps: helmet.htmlAttributes.toComponent(),
      bodyProps: helmet.bodyAttributes.toComponent(),
      base: helmet.base.toComponent(),
      link: helmet.link.toComponent(),
      meta: helmet.meta.toComponent(),
      noscript: helmet.noscript.toComponent(),
      script: helmet.script.toComponent(),
      style: helmet.style.toComponent(),
      title: helmet.title.toComponent(),
    }

    return appHtml
  }

  let appHtml

  state = {
    ...state,
    meta,
  }

  try {
    FinalComp = await plugins.beforeRenderToElement(FinalComp, state)

    if (config.renderToElement) {
      throw new Error(
        `config.renderToElement has been deprecated in favor of the ` +
          `'beforeRenderToElement' or 'beforeRenderToHtml' hooks instead.`
      )
    }

    let RenderedComp = <FinalComp />

    // Run the beforeRenderToHtml hook
    // Rum the Html hook
    RenderedComp = await plugins.beforeRenderToHtml(RenderedComp, state)

    if (config.renderToHtml) {
      throw new Error(
        `config.renderToHtml has been deprecated in favor of the ` +
          `'beforeRenderToHtml' or 'beforeHtmlToDocument' hooks instead.`
      )
    }

    appHtml = renderToStringAndExtract(RenderedComp)

    appHtml = await plugins.beforeHtmlToDocument(appHtml, state)
  } catch (error) {
    if (error.then) {
      error.message =
        'Components are not allowed to suspend during static export. Please ' +
        'make its data available synchronously and try again!'
    }
    error.message = `Failed exporting HTML for URL ${route.path} (${route.template}): ${error.message}`
    throw error
  }

  state = {
    ...state,
    head,
    clientScripts,
    clientStyleSheets,
    clientCss,
  }

  const DocumentHtml = renderToStaticMarkup(
    <DocumentTemplate
      Html={await makeHtmlWithMeta(state)}
      Head={await makeHeadWithMeta(state)}
      Body={await makeBodyWithMeta(state)}
      state={state}
    >
      <div id="root" dangerouslySetInnerHTML={{ __html: appHtml }} />
    </DocumentTemplate>
  )

  // Render the html for the page inside of the base document.
  let html = `<!DOCTYPE html>${DocumentHtml}`

  html = await plugins.beforeDocumentToFile(html, state)

  // If the siteRoot is set and we're not in staging, prefix all absolute URLs
  // with the siteRoot
  const publicPath = makePathAbsolute(process.env.REACT_STATIC_PUBLIC_PATH)
  if (process.env.REACT_STATIC_DISABLE_ROUTE_PREFIXING !== 'true') {
    html = html.replace(hrefReplace, `$1${publicPath}$3`)
  }

  html = html.replace(srcReplace, `$1${publicPath}$3`)

  // If the route is a 404 page, write it directly to 404.html, instead of
  // inside a directory.
  const htmlFilename = is404Path(route.path)
    ? nodePath.join(config.paths.DIST, '404.html')
    : nodePath.join(config.paths.DIST, route.path, 'index.html')

  // Make the routeInfo sit right next to its companion html file
  const routeInfoFilename = nodePath.join(
    config.paths.DIST,
    route.path,
    'routeInfo.json'
  )

  const res = await Promise.all([
    fs.outputFile(htmlFilename, html),
    !route.redirect
      ? fs.outputJson(routeInfoFilename, routeInfo)
      : Promise.resolve(),
  ])
  return res
})
