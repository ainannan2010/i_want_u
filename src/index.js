import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'react-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import Login from './container/login/Login';
import Register from './container/register/Register';
import AuthRoute from './component/authRoute/AuthRoute';
import Dashboard from './component/dashboard/Dashboard';
import BossInfo from './container/bossInfo/BossInfo';
import geniusInfo from './container/geniusInfo/GeniusInfo';
import * as serviceWorker from './serviceWorker';
import reducers from './redux';

const reduxDevTool = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : () => { }; // 是否存在redux；
const store = createStore(reducers, compose(applyMiddleware(thunk), reduxDevTool));
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthRoute />
      <Switch>
        <Route path='/login' component={Login} exact />
        <Route path='/register' component={Register} exact />
        <Route path='/bossinfo' component={BossInfo} exact />
        <Route path='/geniusinfo' component={geniusInfo} exact />
        <Route component={Dashboard} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

