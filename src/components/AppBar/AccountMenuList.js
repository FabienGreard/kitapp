import React, { Component } from 'react';
import PropTypes from 'prop-types';
//material-ui import
import Menu, { MenuItem } from 'material-ui/Menu';

//Render The list when a click is trigger on the account menu
class AccountMenuList extends Component {
  onClose = () => {
    this.props.onClose();
  }

  render() {
    const { handleChangeOnMessage, anchorElAccountMenu, message } = this.props;

    const isAccountMenu = Boolean(anchorElAccountMenu);

    const textMenu = [
      'Mon Profile',
      'Mon Compte',
      'Se Déconnecter',
    ];

    const onClose = this.onClose;
    return (
      <div>
        <Menu id="menu-account" anchorEl={anchorElAccountMenu}  open={isAccountMenu} onRequestClose={onClose}>
          {textMenu.map((textMenu, index) => (
            <MenuItem key={textMenu} selected={message === textMenu} onClick={() => handleChangeOnMessage(textMenu)}>
              {textMenu}
            </MenuItem>
            ))}
        </Menu>
      </div>
    );
  }
}

AccountMenuList.propTypes = {
  message: PropTypes.string.isRequired,
  handleChangeOnMessage: PropTypes.func.isRequired,
  anchorElAccountMenu: PropTypes.object,
  isAccountMenu: PropTypes.bool,
  onClose : PropTypes.func,
};

export default AccountMenuList;
