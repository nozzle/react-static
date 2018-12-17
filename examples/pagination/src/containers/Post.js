import React from 'react'
import { RouteData, Head } from 'react-static'
import { Link } from '@reach/router'
//

export default () => (
  <RouteData>
    {({ post, user }) => (
      <div>
        <Head>
          <title>{post.title} | React Static</title>
        </Head>
        <h3>{post.title}</h3>
        <h5>
          By <Link to={`/users/${user.username}`}>{user.name}</Link>
        </h5>
        <p>{post.body}</p>
      </div>
    )}
  </RouteData>
)
