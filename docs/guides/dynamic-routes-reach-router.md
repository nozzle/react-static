# Dynamic Routes with Reach Router

- [Install Reach Router](https://reach.tech/router)
- Use Reach Router to handle dynamic routes, and fallback to displaying static routes

```javascript
import React from 'react'
import { Root, Routes } from 'react-static'
import { Router, Link } from '@reach/router'

const Dynamic = () => <div>This is a dynamic route!</div>

function App() {
  return (
    <Root>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/dynamic">Dynamic</Link>
      </nav>
      <div className="content">
        <React.Suspense fallback={<em>Loading...</em>}>
          <Router>
            <Dynamic path="/dynamic/*" />
            <Routes default />
          </Router>
        </React.Suspense>
      </div>
    </Root>
  )
}

export default App
```

> **NOTE:** No `html` file is exported for dynamic routes at build time, which means the server won't have a file to serve when those routes are requested as the first entry point into your site. If you have a site with a lot of dynamic data, you may not want to flash the `404.html` template on dynamic routes, or you may want to make a dynamic app shell or other server-side solution to make this smoother. One simple (but naive) way to do this is to make your 404 route only render after mount. An example of this is shown here:

```javascript
export default function NotFound() {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    setReady(true)
  }, [])

  return ready ? (
    <div>
      <h1>404 - Oh no's! We couldn't find that page :(</h1>
    </div>
  ) : null
}
```
