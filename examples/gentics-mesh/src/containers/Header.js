import React from 'react'
import { Link, RouteData, Head } from 'react-static'
import Navigation from '../components/Navigation'

const Header = () => (
  <RouteData render={({ title, navigation, node }) => (
    <div>
      <Head>
        <title>
          {`${title ? `${title} | Gentics Mesh` : 'Gentics Mesh | React Static Sample'}`}
        </title>
        <meta name="mesh-node-id" content={node.uuid} />
      </Head>
      <div className="container">
        <Navigation navigation={navigation} />
      </div>
    </div>)
  } />
)
export default Header
