import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

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

PrivateRoute.propTypes = {
  component : PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.authentication;
    return {
        isLoggedIn,
    };
}

const connectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);
export { connectedPrivateRoute as PrivateRoute };
