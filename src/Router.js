import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Account from './Account/index'
import Engine from './Engine/index'
import Guard from './Guard/index';
import Login from './Login/index';
import Order from './Order/index';
import Register from './Register/index';
import Skill from './Skill/index';
import { Error } from './Error/index';
import { PrivateRoute } from './_components/index';

const Router = () => (
  <Switch >
    <PrivateRoute exact path='/' component={Guard}/>
    <Route exact path='/login' component={Login}/>
    <Route exact path='/register' component={Register}/>
    <PrivateRoute path='/engine' component={Engine}/>
    <PrivateRoute path='/account' component={Account}/>
    <PrivateRoute path='/order' component={Order}/>
    <PrivateRoute path='/skill' component={Skill}/>
    <Route render={(props)=><Error {...props}/>}/>
  </Switch>
);

export default Router;
