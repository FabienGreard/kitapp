import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { PrivateRoute } from './';

import Account from '../modules/Account/index'
import Engine from '../modules/Engine/index'
import Guard from '../modules/Guard/index';
import { Login } from '../modules/Login';
import Order from '../modules/Order/index';
import { Register } from '../modules/Register';
import Skill from '../modules/Skill/index';
import { Error } from '../modules/Error';

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

export { Router };