import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { theme } from '../_helpers';

//material-ui-icon import
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';

//material-ui import
import Menu, { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

const styles = context => ({
  link: {
    textDecoration: 'none',
    outline: 0,
  },
});

//AccountMenu render the account menu under the avatar button
class AccountMenu extends Component {
  onOpen = (e) => {
    this.props.handleAccountMenu(e);
  }

  onClose = () => {
    this.props.handleAccountMenuRequestClose();
  }

  render() {
    let { anchorElAccountMenu, classes } = this.props;
    let isAccountMenu = Boolean(anchorElAccountMenu);

    let onOpen = this.onOpen; //Handle click on Avatar 'open'
    let onClose = this.onClose; //Handle click on Avatar 'close'

    const textMenu = [
      { name: 'Mon Profile', link: '/account'},
      { name: 'Mes Réservations', link: '/order'},
      { name: 'Se Déconnecter', link: '/'},
    ];
    return(
      <div>
        <IconButton style={theme.getRowStyle('white', '')} aria-owns={isAccountMenu ? 'menu-account' : null} onClick={onOpen}>
          <AccountCircle  />
        </IconButton>
        <Menu id="menu-account" anchorEl={anchorElAccountMenu}  open={isAccountMenu} onRequestClose={onClose}>
          {textMenu.map((textMenu) => (
            <Link key={textMenu.name} className={classes.link} style={theme.getRowStyle('', 'none')} to={textMenu.link}>
              <MenuItem onClick={() => onClose()}>
              {textMenu.name}
              </MenuItem>
            </Link>
            ))}
        </Menu>
      </div>
    )
  }
}

AccountMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  anchorElAccountMenu: PropTypes.object.isRequired,
  handleAccountMenuRequestClose: PropTypes.func.isRequired,
  handleAccountMenu: PropTypes.func.isRequired,
};

const AccountMenuWithStyles = withStyles(styles)(AccountMenu);
export { AccountMenuWithStyles as AccountMenu };
