// *** NOTE: Do not use any ES6 features because of IE11 compatibility! ***

require('./idle-callback-polyfill')
var React = require('react')
var MDX = require('@mdx-js/react')
var { asyncContext } = require('@mwap/async')

module.exports = function hydrate(params, options) {
  var compiledSource = params.compiledSource
  var renderedOutput = params.renderedOutput
  var scope = params.scope || {}
  var chunks = params.chunks || []
  var components = (options && options.components) || {}
  var provider = options && options.provider

  var asyncCtx = React.useContext(asyncContext)
  if (asyncCtx && chunks.length > 0)
    chunks.forEach((chunk) => asyncCtx.chunks.add(chunk))

  // our default result is the server-rendered output
  // we get this in front of users as quickly as possible
  var fallback = React.createElement('div', {
    dangerouslySetInnerHTML: {
      __html: renderedOutput,
    },
  })
  var renderedOutputRef = React.useRef(renderedOutput);

  var useStateResult = React.useState(fallback)
  var result = useStateResult[0]
  var setResult = useStateResult[1]

  // if we're server-side, we can return the raw output early
  if (typeof window === 'undefined') return result

  // if we're on the client side, we hydrate the mdx content inside
  // requestIdleCallback, since we can be fairly confident that
  // markdown - embedded components are not a high priority to get
  // to interactive compared to...anything else on the page.
  //
  // once the hydration is complete, we update the state/memo value and
  // react re-renders for us
  React.useEffect(
    function () {
      var handle = window.requestIdleCallback(function () {
        // first we set up the scope which has to include the mdx custom
        // create element function as well as any components we're using
        var fullScope = Object.assign({ mdx: MDX.mdx }, components, scope)
        var keys = Object.keys(fullScope)
        var values = Object.values(fullScope)

        // now we eval the source code using a function constructor
        // in order for this to work we need to have React, the mdx createElement,
        // and all our components in scope for the function, which is the case here
        // we pass the names (via keys) in as the function's args, and execute the
        // function with the actual values.
        var hydrateFn = Reflect.construct(
          Function,
          ['React']
            .concat(keys)
            .concat(
              compiledSource + '\nreturn React.createElement(MDXContent, {});'
            )
        )

        var hydrated = hydrateFn.apply(hydrateFn, [React].concat(values))

        // wrapping the content with MDXProvider will allow us to customize the standard
        // markdown components (such as "h1" or "a") with the "components" object
        var wrappedWithMdxProvider = React.createElement(
          MDX.MDXProvider,
          { components: components },
          hydrated
        )

        var result = wrappedWithMdxProvider

        renderedOutputRef.current = renderedOutput;

        // finally, set the the output as the new result so that react will re-render for us
        // and cancel the idle callback since we don't need it anymore
        setResult(result)
        window.cancelIdleCallback(handle)
      })
    },
    [params]
  )

  let loadingNew = renderedOutput !== renderedOutputRef.current;

  if (loadingNew) {
    return null;
  }

  let component = result
  if (provider) {
    component = React.createElement(
      provider.component,
      provider.props || {},
      result
    )
  }

  component = React.createElement(
    React.Suspense,
    { fallback: fallback },
    component
  )

  return component
}
