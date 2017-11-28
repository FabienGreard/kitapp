import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { loadState } from '../_helpers';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props  => (
    loadState() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

PrivateRoute.propTypes = {
  component : PropTypes.func.isRequired,
}

export { PrivateRoute };
