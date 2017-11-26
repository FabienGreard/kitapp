import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import Account from './components/Account/index'
import Engine from './components/Engine/index'
import Guard from './components/Guard/index';
import Login from './components/Login/index';
import Order from './components/Order/index';
import Register from './components/Register/index';
import Skill from './components/Skill/index';
import { Error } from './components/Error/index';

const Router = ({isLoggedIn, theme}) => (
  <Switch >
    <PrivateRoute isLoggedIn={isLoggedIn} exact path='/' component={Guard}/>
    <Route exact path='/login' component={Login}/>
    <Route exact path='/register' component={Register}/>
    <PrivateRoute isLoggedIn={isLoggedIn} path='/engine' component={Engine}/>
    <PrivateRoute isLoggedIn={isLoggedIn} path='/account' component={Account}/>
    <PrivateRoute isLoggedIn={isLoggedIn} path='/order' component={Order}/>
    <PrivateRoute isLoggedIn={isLoggedIn} path='/skill' component={Skill}/>
    <Route render={(props)=><Error {...props}/>}/>
  </Switch>
);

const PrivateRoute = ({ isLoggedIn, component: Component, ...rest }) => (
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

Router.propTypes = {
  isLoggedIn : PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
}

PrivateRoute.propTypes = {
  isLoggedIn : PropTypes.bool.isRequired,
  component : PropTypes.func.isRequired,
}

export default Router;
