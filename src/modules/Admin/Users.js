import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';
import { Loading, Dialog } from '../../_components';
import { theme } from '../../_helpers';

//Material-ui import
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

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
      overflow: 'auto',
    },
    table: {
      minWidth: 700,
    },
});


  const getUserInfo = (user) => {
    return {
      id: user._id,
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      email: user.email,
      role: user.role
    }
  };

class UsersAdmin extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(userActions.getAll());
  }

  render() {
    let { users, classes, loading } = this.props;

    return (
      <div>
        { loading &&
          <Loading mode="query"/>
        }
        <div className={classes.root}>
          <Grid container spacing={24} className={classes.container}>
            <Grid item xs={12} className={classes.item}>
              <Paper className={classes.paper}>
                <Dialog className={classes.title} message="Utilisateurs" style={theme.getRowStyle('darkGrey', 'none')} type="title"/>
              </Paper>
            </Grid>
            <Grid item xs className={classes.item}>
              <Paper className={classes.paperContent}>
                <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell >Prénom</TableCell>
                    <TableCell >Nom</TableCell>
                    <TableCell >Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(users).length !== 0 &&
                    users.map(
                      (user) => (
                        <TableRow key={getUserInfo(user).id}>
                          <TableCell>{getUserInfo(user).email}</TableCell>
                          <TableCell>{getUserInfo(user).firstName}</TableCell>
                          <TableCell>{getUserInfo(user).lastName}</TableCell>
                          <TableCell>{getUserInfo(user).role}</TableCell>
                        </TableRow>
                      )
                    )
                  }
                </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

}

UsersAdmin.propTypes = {
  users: PropTypes.array,
  classes: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  const { loading } = state.users
    const { users } = typeof state.users.items !== 'undefined' ? state.users.items : { users: [] };
    return {
        users,
        loading
    };
}

const connectedUsersAdmin = connect(mapStateToProps)(UsersAdmin);
const connectedUsersAdminWithStyles = withStyles(styles)(connectedUsersAdmin);
export { connectedUsersAdminWithStyles as UsersAdmin };
