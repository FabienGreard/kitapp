import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//material-ui import
import Menu, { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

const styles = context => ({
  link: {
    textDecoration: 'none',
    outline: 0,
  },
});
//Render The list when a click is trigger on the account menu
class AccountMenuList extends Component {
  onClose = () => {
    this.props.onClose();
  }

  render() {
    const { classes, anchorElAccountMenu, handleChangeOnAuth, theme } = this.props;

    const isAccountMenu = Boolean(anchorElAccountMenu);

    const textMenu = [
      { name: 'Mon Profile', link: '/account'},
      { name: 'Mes Réservations', link: '/order'},
      { name: 'Se Déconnecter', link: '/'},
    ];

    const onClose = this.onClose;
    return (
      <div>
        <Menu id="menu-account" anchorEl={anchorElAccountMenu}  open={isAccountMenu} onRequestClose={onClose}>
          {textMenu.map((textMenu) => (
            <Link key={textMenu.name} className={classes.link} style={theme.getRowStyle('', 'none')} to={textMenu.link}>
              <MenuItem onClick={() => { onClose(); textMenu.name === 'Se Déconnecter' && handleChangeOnAuth(false)}}>
              {textMenu.name}
              </MenuItem>
            </Link>
            ))}
        </Menu>
      </div>
    );
  }
}

AccountMenuList.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  anchorElAccountMenu: PropTypes.object,
  isAccountMenu: PropTypes.bool,
  onClose : PropTypes.func,
};

export default withStyles(styles)(AccountMenuList);
