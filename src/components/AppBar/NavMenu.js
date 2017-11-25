import React, { Component } from 'react';
import PropTypes from 'prop-types';

//material-ui import
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';

import NavMenuList from './NavMenuList';

//Render the navigation menu on the kitapp bar
class NavMenu extends Component {
  onOpen = () => {
    this.props.handleMenu();
  }

  onClose = () => {
    this.props.handleMenuRequestClose();
  }

  handleChangeOnMessage = (message) => {
    this.props.handleChangeOnMessage(message);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.isMenu){
      //fix drawer outline
       document.getElementsByClassName('MuiDrawer-paperAnchorLeft-61')[0].style.outline = 0;
    }
  }

  render() {
    const { theme, isMenu, message, handleChangeOnMessage } = this.props;
    const onOpen = this.onOpen;
    const onClose = this.onClose;
    return(
      <div>
        <IconButton  style={theme.getRowStyle('white', '')} onClick={onOpen} aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Drawer open={isMenu} onRequestClose={onClose}>
          <div tabIndex={0} role="button" onClick={onClose} onKeyDown={onClose}>
            <NavMenuList handleChangeOnMessage={handleChangeOnMessage} message={message} theme={theme}/>
          </div>
        </Drawer>
      </div>
    )
  }
}

NavMenu.propTypes = {
  theme: PropTypes.object.isRequired,
  isMenu: PropTypes.bool.isRequired,
};

export default NavMenu;
