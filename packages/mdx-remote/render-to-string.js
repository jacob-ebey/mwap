const mdx = require('@mdx-js/mdx')
const { MDXProvider, mdx: mdxReact } = require('@mdx-js/react')
const { transformAsync } = require('@babel/core')
const presetEnv = require('@babel/preset-env')
const presetReact = require('@babel/preset-react')
const pluginBrowser = require('./babel-plugin-mdx-browser')
const { renderToStringAsync } = require('react-async-ssr')
const React = require('react')
const { AsyncProvider } = require('@mwap/async')
const { StaticRouter } = require('@mwap/router')

module.exports = async function renderToString(
  source,
  {
    components = {},
    mdxOptions = {},
    scope = {},
    provider,
    location = '/',
  } = {}
) {
  let jsSource
  // transform it into react
  return mdx(source, { ...mdxOptions, skipExport: true })
    .then((code) => {
      // mdx gives us back es6 code, we then need to transform into two formats:
      // - first a version we can render to string right now as a "serialized" result
      // - next a version that is fully browser-compatible that we can eval to rehydrate
      return Promise.all([
        // this one is for immediate evaluation so we can renderToString below
        transformAsync(code, {
          presets: [presetReact, presetEnv],
          configFile: false,
        }),
        // this one is for the browser to eval and rehydrate, later
        transformAsync(code, {
          presets: [presetReact, presetEnv],
          plugins: [pluginBrowser],
          configFile: false,
        }),
      ])
    })
    .then(([now, later]) => {
      // evaluate the code
      // NOTES:
      // - relative imports can't be expected to work with remote files, we'd need
      //   an extra babel transform to be able to import specific file paths
      jsSource = later.code
      return new Function(
        'React',
        'MDXProvider',
        'mdx',
        'components',
        ...Object.keys(scope),
        `${now.code}
    return React.createElement(MDXProvider, { components },
      React.createElement(MDXContent, {})
    );`
      )(React, MDXProvider, mdxReact, components, ...Object.values(scope))
    })
    .then(async (component) => {
      const chunks = new Set()

      // if a custom provider was given, wrap it around the source
      if (provider)
        component = React.createElement(
          provider.component,
          provider.props || {},
          component,
          chunks
        )

      component = React.createElement(
        AsyncProvider,
        {
          chunks,
        },
        React.createElement(
          StaticRouter,
          { location },
          React.createElement(React.Suspense, { fallback: '' }, component)
        )
      )

      return {
        compiledSource: jsSource,
        // react: render to string
        renderedOutput: await renderToStringAsync(component),
        scope,
        chunks: Array.from(chunks),
      }
    })
}
