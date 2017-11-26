import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

//material-ui
import theme from './style/theme';
import { MuiThemeProvider } from 'material-ui/styles';

import Router from './Router';
import AppBar from './components/AppBar/index'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      theme: new theme(),
      message: "KitApp - " + this.switch(this.props.location.pathname),
      isLoggedIn: false,
    };

    //Fix document margin style
    document.body.style.margin = '0px';
  }

  componentDidUpdate(nextProps, nextState){
    if (!nextState.isLoggedIn && nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        message : 'KitApp - ' + this.switch(this.props.location.pathname),
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.isLoggedIn && nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        message : 'KitApp - ' + this.switch(nextProps.location.pathname),
      });
    }
  }

  switch = (pathname) => {
    switch(pathname.toLowerCase()){
      case '/login':
        return 'Connexion';
      case '/register':
        return 'Inscription';
      case '/engine':
        return 'Machines';
      case '/account':
        return 'compte';
      case '/order':
        return 'Commandes';
      case '/skill':
        return 'Compétences';
      default:
        return 'KitApp';
    }
  }

  handleChangeOnAuth = (auth) =>{
    this.setState({
      isLoggedIn : auth
    });
  }

  render() {
    const { theme, isLoggedIn, message } = this.state;
    const handleChangeOnAuth = this.handleChangeOnAuth;
    return(
      <MuiThemeProvider theme={theme.renderTheme}>
        <AppBar isLoggedIn={isLoggedIn} message={message} handleChangeOnAuth={handleChangeOnAuth} theme={theme}/>
        <Router isLoggedIn={isLoggedIn}/>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(App);
