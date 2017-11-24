import React, { Component } from 'react';

//material-ui
import theme from './style/theme';
import { MuiThemeProvider } from 'material-ui/styles';

import AppBar from './components/AppBar/index.js'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      theme: new theme(),
      message: "KitApp",
      isLoggedIn: false,
    };
    //Fix document margin style
    document.body.style.margin = '0px';
  }

  handleChangeOnMessage = (message) => {
    this.setState({
      message : message
    });
  }

  render() {
    const { theme, message } = this.state;
    const handleChangeOnMessage = this.handleChangeOnMessage;
    return(
      <MuiThemeProvider theme={theme.renderTheme}>
        <AppBar handleChangeOnMessage={handleChangeOnMessage} theme={theme} message={message}/>
      </MuiThemeProvider>
    )
  }
}

export default App;
