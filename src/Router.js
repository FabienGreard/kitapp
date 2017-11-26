import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import Account from './components/Account/index'
import Engine from './components/Engine/index'
import Guard from './components/Guard/index';
import Login from './components/Login/index'
import Order from './components/Order/index'
import Register from './components/Register/index'
import Skill from './components/Skill/index'

const Router = ({isLoggedIn}) => (
  <Switch>
    <PrivateRoute isLoggedIn={isLoggedIn} exact path='/' component={Guard}/>
    <Route exact path='/login' component={Login}/>
    <Route exact path='/register' component={Register}/>
    <PrivateRoute isLoggedIn={isLoggedIn} path='/engine' component={Engine}/>
    <PrivateRoute isLoggedIn={isLoggedIn} path='/account' component={Account}/>
    <PrivateRoute isLoggedIn={isLoggedIn} path='/order' component={Order}/>
    <PrivateRoute isLoggedIn={isLoggedIn} path='/skill' component={Skill}/>
    <Route component={NoMatch}/>
  </Switch>
);

const PrivateRoute = ({ component: Component, ...rest, isLoggedIn }) => (
  <Route {...rest} render={props  => (
    isLoggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

Router.propTypes = {
  isLoggedIn : PropTypes.bool.isRequired,
}

PrivateRoute.propTypes = {
  isLoggedIn : PropTypes.bool.isRequired,
}

NoMatch.propTypes = {
  location : PropTypes.object.isRequired,
}

export default Router;
