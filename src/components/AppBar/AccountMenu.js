import React, { Component } from 'react';
import PropTypes from 'prop-types';

//material-ui import
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';

import AccountMenuList from './AccountMenuList';

//AccountMenu render the account menu under the avatar button
class AccountMenu extends Component {
  onOpen = (e) => {
    this.props.handleAccountMenu(e);
  }

  onClose = () => {
    this.props.handleAccountMenuRequestClose();
  }

  handleChangeOnMessage = (message) => {
    this.props.handleChangeOnMessage(message);
  }

  render() {
    const { theme, anchorElAccountMenu, message, handleChangeOnMessage} = this.props;

    const isAccountMenu = Boolean(anchorElAccountMenu);

    const onOpen = this.onOpen;
    const onClose = this.onClose;
    return(
      <div>
        <IconButton style={theme.getRowStyle('white', '')} aria-owns={isAccountMenu ? 'menu-account' : null} onClick={onOpen}>
          <AccountCircle  />
        </IconButton>
        <AccountMenuList style={theme.getRowStyle('white', '')} message={message} theme={theme} handleChangeOnMessage={handleChangeOnMessage} anchorElAccountMenu={anchorElAccountMenu}  isAccountMenu={isAccountMenu} onClose={onClose}/>
      </div>
    )
  }
}

AccountMenu.propTypes = {
  message: PropTypes.string.isRequired,
  handleChangeOnMessage: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  anchorElAccountMenu: PropTypes.object,
  isAccountMenu: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose : PropTypes.func,
};

export default AccountMenu;
