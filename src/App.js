import './App.css'

import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom"

import CampaignNavigation from './components/CampaignNavigation'
import CampaignInfo from './components/CampaignInfo'
import Splash from './components/Splash'
import UserBalance from './components/UserBalance'

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <Link to="/">
            <div className="App-header-logo">
              <img alt="App Icon" src="/icons/Code.svg" width={ 48 } />
              <h1>Stack Showdown</h1>
            </div>
          </Link>
          <div style={{flex: 1}} />
          <UserBalance />
        </div>
        <Switch>
          <Route exact path="/" component={Navigation} />
          <Route path="/:id" component={Navigation} />
        </Switch>
        <Switch>
          <Route exact path="/" component={Splash} />
          <Route path="/:id" component={Page} />
        </Switch>
      </div>
    </Router>
  )
}

const Navigation = () => {
  return <CampaignNavigation {...useParams()} />
}

const Page = () => {
  return <CampaignInfo {...useParams()} />
}

export default App
