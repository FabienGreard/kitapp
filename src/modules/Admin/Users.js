import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';
import { Loading, AppTable } from '../../_components';
import { setUserInfo } from '../../_helpers';

//Material-ui import
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

//styles
const styles = context => ({
  root: {
      padding: 20,
      marginTop: context.spacing.unit * 3,
    },
});

const getUserInfo = (users) => {
  let usersInfo = [];
  users.map((user) => {
    return usersInfo.push(setUserInfo(user));
  });
  return usersInfo.sort((a, b) => ( a.email < b.email ? -1 : 1));
};

class UsersAdmin extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(userActions.getAll());

    this.state = {
      data: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.items !== this.props.items && typeof nextProps.items !== 'undefined'){
      this.setState({
        data: getUserInfo(nextProps.items)
      });
    }
  }

  updateUser = (e, user) => {
    this.props.dispatch(userActions.update(user));
  }

  deleteUser = (e, id) => {
    this.props.dispatch(userActions.delete(id));
  }

  render() {
    let { classes, loading } = this.props;
    let { data } = this.state;

    const columnData = [
      { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
      { id: 'firstName', numeric: false, disablePadding: true, label: 'Prénom' },
      { id: 'lastName', numeric: false, disablePadding: true, label: 'Nom' },
      { id: 'phone', numeric: false, disablePadding: true, label: 'Téléphone' },
      { id: 'gender', numeric: false, disablePadding: true, label: 'Sexe' },
      { id: 'role', numeric: false, disablePadding: true, label: 'Rôle' },
    ];

    const deleteUser = this.deleteUser;
    const updateUser = this.updateUser;
    return (
      <div>
        { loading &&
          <Loading mode="query"/>
        }
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs>
              <Paper>
                <AppTable tableName="Utilisateurs" columnData={columnData} data={data} update={updateUser} delete={deleteUser}/>
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
  loading: PropTypes.bool,
  classes: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  const { loading } = state.users
    const { items } = typeof state.users !== 'undefined' ? state.users : { items: [] };
    return {
        items,
        loading
    };
}

const connectedUsersAdmin = connect(mapStateToProps)(UsersAdmin);
const connectedUsersAdminWithStyles = withStyles(styles)(connectedUsersAdmin);
export { connectedUsersAdminWithStyles as UsersAdmin };
