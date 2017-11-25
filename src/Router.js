import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Account from './components/Account/index'
import Engine from './components/Engine/index'
import Guard from './components/Guard/index';
import Login from './components/Login/index'
import Order from './components/Order/index'
import Register from './components/Register/index'
import Skill from './components/Skill/index'


const Router = ({props}) => (
  <Switch>
    <Route exact path='/' component={Guard}/>
    <Route path='/login' component={Login}/>
    <Route path='/register' component={Register}/>
    <Route path='/engine' component={Engine}/>
    <Route path='/account' component={Account}/>
    <Route path='/order' component={Order}/>
    <Route path='/skill' component={Skill}/>
  </Switch>
);

export default Router;
