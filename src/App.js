import React from 'react';
import PropTypes from 'prop-types';

//material-ui
import theme from './style/theme';
import Typography from 'material-ui/Typography';
import { MuiThemeProvider, withStyles } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 0,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      theme: new theme(),
      message: "KitAPP"
    };
  }

  componentDidMount() {
    this.setState({
      theme: new theme(),
      message: "KitAPP"
    });

    //Fix document margin style
    document.body.style.margin = '0px';
  }

  render() {
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        <MuiThemeProvider theme={this.state.theme.renderTheme}>
          <MenuAppBar theme={this.state.theme} menu={<div className={classes.menuButton}><MenuIconButton theme={this.state.theme}/></div>} dialog={<div className={classes.flex}><Dialog theme={this.state.theme} message={this.state.message}/></div>} auth={<AvatarButton theme={this.state.theme}/>}/>
        </MuiThemeProvider>
      </div>
    )
  }
}

//Our app bar
const MenuAppBar = ({theme, menu, dialog, auth}) => (
  <AppBar position="static" style={theme.getRowStyle('', 'primaryColor',)}>
    <Toolbar>
      {menu}
      {dialog}
      {auth}
    </Toolbar>
  </AppBar>
);

//Basic text
const Dialog = ({theme, message}) => (
  <Typography type="title" style={theme.getRowStyle('white', '')}>{message}</Typography>
);

//Nav menu
const MenuIconButton = ({theme}) => (
  <IconButton  style={theme.getRowStyle('white', '')} aria-label="Menu">
    <MenuIcon />
  </IconButton>
);

//Login menu
const AvatarButton = ({theme}) => (
  <IconButton  style={theme.getRowStyle('white', '')} aria-label="Menu">
    <AccountCircle  />
  </IconButton>
);

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
