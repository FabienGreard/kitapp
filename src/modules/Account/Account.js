import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { TabsAccount, Informations, Skills, Wallet } from './';
import { Loading } from '../../_components';
import { userActions } from '../../_actions';

//Material-ui import
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

//styles
const styles = context => ({
  root: {
    padding: 20,
    marginTop: context.spacing.unit * 3,
    display: 'flex',
    justifyContent: 'center',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    oveflow: 'auto'
  }
});


class Account extends Component {
  constructor(props) {
    super(props);
    this.state = { tab: 0, user: { email: "", phone: "", firstName: "", lastName: "", sex: "", password: "" } } ;

    this.props.dispatch(userActions.getById(props._id));
  }

  componentWillReceiveProps(nextProps) {
    if(typeof nextProps.user !== 'undefined'){
      this.setState({
        user: nextProps.user
      });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      user: {[name]: value}
    });
  }

  tabChange = (event, tab) => {
    this.setState({ tab });
  };

  render() {
    let { tab, user } = this.state;
    let { loading, classes } = this.props;

    const tabChange = this.tabChange;
    const handleChange = this.handleChange;
    return (
      <div>
        { loading &&
          <Loading mode="query"/>
        }
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Paper>
                <TabsAccount tab={tab} tabChange={tabChange}/>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.center}>
                { tab === 0 && <Informations user={user} handleChange={handleChange}/> }
                { tab === 1 && <Skills/> }
                { tab === 2 && <Wallet/> }
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

}

Account.propTypes = {
  users: PropTypes.array,
  loading: PropTypes.bool,
  classes: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  const { _id } = typeof state.authentication.user.user !== 'undefined' ? state.authentication.user.user : "";
  const { loading } = state.users;
  const { user } = typeof state.users.user !== 'undefined' ? state.users.user : {};
    return {
        _id,
        loading,
        user
    };
}

const connectedAccount = connect(mapStateToProps)(Account);
const connectedAccountWithStyles = withStyles(styles)(connectedAccount);
export { connectedAccountWithStyles as Account };
