import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

class Dashboard extends Component {
  render() {
    let { user, classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Dialog message={'Bienvenue ' + user.firstName + ' ' + user.lastName} type="title" style={theme.getRowStyle('darkGrey', 'none')}/>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Dialog message="Vos réservations" type="title" style={theme.getRowStyle('darkGrey', 'none')}/>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Dialog message="Votre tirelire" type="title" style={theme.getRowStyle('darkGrey', 'none')}/>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paperContent}>

            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paperContent}>

            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    const { user } = typeof state.authentication.user !== 'undefined' ? state.authentication.user : { user: {} };
    return {
        user
    };
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
const connectedDashboardWithStyles = withStyles(styles)(connectedDashboard);
export { connectedDashboardWithStyles as Dashboard };
