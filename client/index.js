import React, { Component } from 'react';
import { render }           from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk        from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, Switch } from 'react-router';
import { syncHistory, routeReducer }     from 'react-router-redux';
import { createHistory } from 'history';

import reducer from './reducers';
import App     from './components/App.jsx';
import Login   from './components/Login.jsx';
import User    from './components/User.jsx';
import Songs   from './components/Songs.jsx';
import Error   from './components/Error.jsx';
import Search from './components/Search.jsx';
import Recommendations from './components/Recommendations.jsx';

// load our css. there probably is a better way to do this
// but for now this is our move
require('./style.less');

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(hashHistory)
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  reduxRouterMiddleware
)(createStore)
const store = createStoreWithMiddleware(reducer)

class Root extends Component {
  constructor(props) {
    super(props);
    
  }



  render() {
    //console.log(this.addToSeed);
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          <div className="container">
            <Route path="/" component={App}>
              <IndexRoute component={Login} />
              <Route path="/user/:accessToken/:refreshToken" component={Songs} />
              <Route path="/error/:errorMsg" component={Error} />
              <Route path="/search" component={Search}/>
              <Route path="/recommendations" component={Recommendations}/>
            </Route>
          </div>
        </Router>

      </Provider>
    );
  }
}

// render town
const rootElement = document.getElementById('root');
render(<Root />, rootElement);

/*
            <Route path="/" component={App}>
              <IndexRoute component={Login} />
              <Route path="/user/:accessToken/:refreshToken" component={Songs} />
              <Route path="/error/:errorMsg" component={Error} />
            </Route>
*/
