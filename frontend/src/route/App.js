// External files import
import React, { Component } from 'react'
import { createBrowserHistory } from 'history'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Internal files import
import CreateDeployment from '../components/module/deployment/CreateDeployment'
import DeploymentList from '../components/module/deployment/DeploymentList'

import Root from '../route/Root'

class App extends Component {

  render() {
    return (
      <Router history={createBrowserHistory}>
        <div>
          <Root>
            <Route exact path={'/'} component={CreateDeployment} />
            <Route path={'/createdeployment'} component={CreateDeployment} />
            <Route path={'/deploymentlist'} component={DeploymentList} />
          </Root>
        </div>
      </Router>
    )
  }
}

export default App