import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SimpleBar from './SimpleBar';
import AccountMenu from './AccountMenu';
import Dialog from './Dialog';
import NavMenu from './NavMenu';

class AppBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      anchorElAccountMenu: null,
      isMenu: false,
    };
  }

  handleAccountMenu = (e) => {
    this.setState({ anchorElAccountMenu: e.currentTarget });
  };

  handleAccountMenuRequestClose = () => {
    this.setState({ anchorElAccountMenu: null });
  };

  handleMenu = () => {
    this.setState({ isMenu: true });
  };

  handleMenuRequestClose = () => {
    this.setState({ isMenu: false });
  };

  handleChangeOnMessage = (message) => {
    this.props.handleChangeOnMessage(message);
  }

  render() {
    const { anchorElAccountMenu, isMenu } = this.state;

    //AccountMenu consts
    const handleAccountMenu = this.handleAccountMenu;
    const handleAccountMenuRequestClose = this.handleAccountMenuRequestClose;

    //NavMenu consts
    const handleMenu = this.handleMenu;
    const handleMenuRequestClose = this.handleMenuRequestClose;

    const { theme, message, handleChangeOnMessage } = this.props;
    return (
      <SimpleBar theme={theme} menu={<NavMenu message={message} theme={theme} isMenu={isMenu} handleChangeOnMessage={handleChangeOnMessage} handleMenu={handleMenu} handleMenuRequestClose={handleMenuRequestClose}/>} dialog={<Dialog theme={theme} message={message}/>} auth={<AccountMenu handleChangeOnMessage={handleChangeOnMessage} message={message} theme={theme} anchorElAccountMenu={anchorElAccountMenu} handleAccountMenu={handleAccountMenu} handleAccountMenuRequestClose={handleAccountMenuRequestClose}/>}/>
    );
  }
}

NavMenu.propTypes = {
  theme: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  handleChangeOnMessage: PropTypes.func.isRequired,
};

export default AppBar;
