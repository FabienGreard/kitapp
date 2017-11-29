import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';
import { Loading, Dialog } from '../../_components';
import { theme } from '../../_helpers';

//material-ui import
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

//material-ui-icon import
import Send from 'material-ui-icons/Send';

//material-ui-form import
import { FormControl, FormGroup } from 'material-ui/Form';

const styles = context => ({
  root: {
    zIndex: -1,
    padding: 20,
    position: 'absolute',
    top: '64px',
    bottom: 0,
    left: 0,
    right: 0,
  },
  paper: {
    padding: 16,
    display: 'flex',
    flexWrap: 'wrap',
    margin: 'auto',
    maxWidth: '350px',
  },
  container: {
    height: '100%',
  },
  item: {
    margin: 'auto',
  },
  formControl: {
    margin: context.spacing.unit,
  },
  formGroup: {
    margin: context.spacing.unit,
    width: '100%',
  },
  withoutLabel: {
    marginTop: context.spacing.unit * 3,
  },
  button: {
    margin: context.spacing.unit,
  },
  textLink: {
    margin: 'auto',
    marginTop: 0,
    marginBottom: 0,
    textDecoration: 'none',
    color: '#757575',
    '&:hover': {
       color: '#E91E63',
       textDecoration: 'underline',
    }
  },
  title: {
    margin: 'auto',
    marginTop: 0,
    marginBottom: 0,
  },
  rightIcon: {
    marginLeft: context.spacing.unit,
  },
});

class Login extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            email: '',
            password: '',
            showPassword : false,
            submitted: false
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        const { dispatch } = this.props;
        if (email && password) {
            dispatch(userActions.login(email, password));
        }
    }

    handleClickShowPasssword = (e) => {
      this.setState({ showPassword: !this.state.showPassword });
    }

    handleMouseDownPassword = (e) => {
      e.preventDefault();
    }

    render() {
        let { isLoggedIn, classes } = this.props;
        let { email, password, submitted, showPassword } = this.state;

        let handleMouseDownPassword = this.handleMouseDownPassword;
        let handleClickShowPasssword = this.handleClickShowPasssword;
        let handleChange = this.handleChange;
        return (
          <div>
            { isLoggedIn && <Loading className={classes.formControl} mode="query"/>}
            <div className={classes.root}>
              <Grid container spacing={40} className={classes.container}>
                <Grid item xs className={classes.item}>
                  <Paper className={classes.paper}>
                    <FormGroup className={classes.formGroup}>
                      <Dialog className={classes.title} message="Se connecter !" style={theme.getRowStyle('darkGrey', '')} type="headline"/>
                    </FormGroup>
                    <FormControl fullWidth className={classes.formControl}>
                      <InputLabel htmlFor="email">Email</InputLabel>
                      <Input name="email" type="email" value={email} onChange={handleChange} />
                      {submitted && !email &&
                        <Dialog message="Email is required" style={theme.getRowStyle('primaryColor', '')} type="caption"/>
                      }
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <Input name="password" type={showPassword ? 'text' : 'password'} value={password} onChange={handleChange} endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPasssword} onMouseDown={handleMouseDownPassword}>
                          {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>}/>
                      {submitted && !password &&
                        <Dialog message="Password is required" style={theme.getRowStyle('primaryColor', '')} type="caption"/>
                      }
                    </FormControl>
                    <FormGroup className={classes.formGroup}>
                      <Button className={classes.button} raised color="primary" onClick={this.handleSubmit}>
                        Connexion
                        <Send className={classes.rightIcon}/>
                      </Button>
                      <Link to="/register" className={classes.textLink}>S'enregistrer ?</Link>
                    </FormGroup>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        );
    }
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.authentication;
    return {
        isLoggedIn
    };
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool,
}

const connectedLogin = connect(mapStateToProps)(Login);
const connectedLoginWithStyles = withStyles(styles)(connectedLogin);
export { connectedLoginWithStyles as Login };
