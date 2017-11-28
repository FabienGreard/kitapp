import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { history, theme, Router } from './_helpers';
import { alertActions } from './_actions';

//material-ui
import { MuiThemeProvider } from 'material-ui/styles';

import { AppBar } from './AppBar'

class App extends Component {
  constructor(props){
    super(props);

    //listen on url change
    history.listen((location, action) => {
      // clear alert on location change
      props.dispatch(alertActions.clear());
    });

    //Fix document margin style
    document.body.style.margin = '0px';

    //Add a background color
    document.body.style.background = '#fafafa';
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

  render() {
    let message = 'KitApp - ' + this.switch(history.location.pathname);
    return(
      <MuiThemeProvider theme={theme.renderTheme}>
        <AppBar message={message}/>
        <Router/>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  alert: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert,
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
