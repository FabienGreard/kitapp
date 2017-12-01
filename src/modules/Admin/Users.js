import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';
import { Dialog } from '../../_components';
import { theme } from '../../_helpers';

//Material-ui import
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

//styles
const styles = context => ({
  root: {
      padding: 20,
    },
    paper: {
      padding: 16,
      textAlign: 'left',
    },
    paperContent: {
      padding: 16,
      minHeight: 200,
    },
});

class UsersAdmin extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(userActions.getAll());
  }
  render() {
    let { user, classes } = this.props;
    return (
      <div>I'm an Admin page about users.</div>
    );
  }

}

UsersAdmin.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    const { user } = typeof state.authentication.user !== 'undefined' ? state.authentication.user : { user: {} };
    return {
        user
    };
}

const connectedUsersAdmin = connect(mapStateToProps)(UsersAdmin);
const connectedUsersAdminWithStyles = withStyles(styles)(connectedUsersAdmin);
export { connectedUsersAdminWithStyles as UsersAdmin };
