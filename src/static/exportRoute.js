/* eslint-disable import/first, import/no-dynamic-require */

require('babel-register')
require('../utils/binHelper')

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import Helmet from 'react-helmet'
import { ReportChunks } from 'react-universal-component'
import flushChunks from 'webpack-flush-chunks'
import glob from 'glob'
import nodePath from 'path'
import fs from 'fs-extra'

import getConfig from './getConfig'
import { DefaultDocument } from './RootComponents'
import { poolAll } from '../utils/shared'
import { makeHtmlWithMeta } from './components/HtmlWithMeta'
import { makeHeadWithMeta } from './components/HeadWithMeta'
import { makeBodyWithMeta } from './components/BodyWithMeta'
import Redirect from '../client/components/Redirect'

//

process.on('message', async payload => {
  try {
    const { config: oldConfig, routes, defaultOutputFileRate } = payload
    // Get config again
    const config = await getConfig(oldConfig.originalConfig)

    // Use the node version of the app created with webpack
    const Comp = require(glob.sync(nodePath.resolve(config.paths.ASSETS, 'static.*.js'))[0]).default

    // Retrieve the document template
    const DocumentTemplate = config.Document || DefaultDocument

    await poolAll(
      routes.map(route => async () => {
        try {
          await exportRoute({
            ...payload,
            config,
            route,
            Comp,
            DocumentTemplate,
          })
          process.send({ type: 'tick' })
        } catch (err) {
          process.send({ type: 'error', err })
          process.exit(1)
        }
      }),
      Number(config.outputFileRate) || defaultOutputFileRate
    )
  } catch (err) {
    process.send({ type: 'error', err })
  }
  process.send({ type: 'done' })
})

async function exportRoute ({
  config, Comp, DocumentTemplate, route, siteData, clientStats,
}) {
  const {
    sharedPropsHashes, templateID, localProps, allProps, path: routePath,
  } = route

  // This routeInfo will be saved to disk. It should only include the
  // localProps and hashes to construct all of the props later.
  const routeInfo = {
    path: routePath,
    templateID,
    sharedPropsHashes,
    localProps,
  }

  // This embeddedRouteInfo will be inlined into the HTML for this route.
  // It should only include the full props, not the partials.
  const embeddedRouteInfo = {
    ...routeInfo,
    localProps: null,
    allProps,
    siteData,
  }

  // Inject allProps into static build
  class InitialPropsContext extends Component {
    static childContextTypes = {
      routeInfo: PropTypes.object,
      staticURL: PropTypes.string,
    }
    getChildContext () {
      return {
        routeInfo: embeddedRouteInfo,
        staticURL: route.path === '/' ? route.path : `/${route.path}`,
      }
    }
    render () {
      return this.props.children
    }
  }

  // Make a place to collect chunks, meta info and head tags
  const renderMeta = {}
  const chunkNames = []
  let head = {}
  let clientScripts = []
  let clientStyleSheets = []
  let clientCss = {}

  let FinalComp

  if (route.redirect) {
    FinalComp = () => <Redirect fromPath={route.path} to={route.redirect} />
  } else {
    FinalComp = props => (
      <ReportChunks report={chunkName => chunkNames.push(chunkName)}>
        <InitialPropsContext>
          <Comp {...props} />
        </InitialPropsContext>
      </ReportChunks>
    )
  }

  const renderToStringAndExtract = comp => {
    // Rend the app to string!
    const appHtml = renderToString(comp)
    const { scripts, stylesheets, css } = flushChunks(clientStats, {
      chunkNames,
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

  try {
    // Allow extractions of meta via config.renderToString
    appHtml = await config.renderToHtml(
      renderToStringAndExtract,
      FinalComp,
      renderMeta,
      clientStats
    )
  } catch (error) {
    error.message = `Failed exporting HTML for URL ${route.path} (${route.component}): ${
      error.message
    }`
    throw error
  }

  const DocumentHtml = renderToStaticMarkup(
    <DocumentTemplate
      Html={makeHtmlWithMeta({ head })}
      Head={makeHeadWithMeta({
        head,
        route,
        clientScripts,
        config,
        clientStyleSheets,
        clientCss,
      })}
      Body={makeBodyWithMeta({
        head,
        route,
        embeddedRouteInfo,
        clientScripts,
        config,
      })}
      siteData={siteData}
      routeInfo={embeddedRouteInfo}
      renderMeta={renderMeta}
    >
      <div id="root" dangerouslySetInnerHTML={{ __html: appHtml }} />
    </DocumentTemplate>
  )

  // Render the html for the page inside of the base document.
  let html = `<!DOCTYPE html>${DocumentHtml}`

  // If the siteRoot is set and we're not in staging, prefix all absolute URL's
  // with the siteRoot
  if (process.env.REACT_STATIC_DISABLE_ROUTE_PREFIXING !== 'true') {
    const hrefReplace = new RegExp(
      `(href=["'])\\/(${config.basePath ? `${config.basePath}\\/` : ''})?([^\\/])`,
      'gm'
    )

    html = html.replace(hrefReplace, `$1${process.env.REACT_STATIC_PUBLIC_PATH}$3`)
  }

  const srcReplace = new RegExp(`(src=["'])\\/(${config.basePath ? `${config.basePath}\\/` : ''})?([^\\/])`, 'gm')
  html = html.replace(srcReplace, `$1${process.env.REACT_STATIC_PUBLIC_PATH}$3`)

  // If the route is a 404 page, write it directly to 404.html, instead of
  // inside a directory.
  const htmlFilename =
    route.path === '404'
      ? nodePath.join(config.paths.DIST, '404.html')
      : nodePath.join(config.paths.DIST, route.path, 'index.html')

  // Make the routeInfo sit right next to its companion html file
  const routeInfoFilename = nodePath.join(config.paths.DIST, route.path, 'routeInfo.json')

  const res = await Promise.all([
    fs.outputFile(htmlFilename, html),
    !route.redirect ? fs.outputJson(routeInfoFilename, routeInfo) : Promise.resolve(),
  ])
  return res
}