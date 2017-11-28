import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { theme } from '../_helpers';

//material-ui icon import
import IconButton from 'material-ui/IconButton';
import DevicesIcon from 'material-ui-icons/Devices';
import BuildIcon from 'material-ui-icons/Build';
import MenuIcon from 'material-ui-icons/Menu';

//material-ui import
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

//styles
const styles = context => ({
  menuList: {
    width: 250,
  },
  menuTitleContainer: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  menuTitle: {
    padding: 6,
    paddingBottom: 0,
  },
  menuSubTitle: {
    paddingTop: 0,
    padding: 6
  },
  link: {
    textDecoration: 'none',
    outline: 0,
  },
});

//Render the navigation menu on the kitapp bar
class Menu extends Component {
  onOpen = () => {
    this.props.handleMenu();
  }

  onClose = () => {
    this.props.handleMenuRequestClose();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.isMenu && document.getElementsByClassName('MuiDrawer-paperAnchorLeft-61')[0]){
      //fix drawer outline
       document.getElementsByClassName('MuiDrawer-paperAnchorLeft-61')[0].style.outline = 0;
    }
  }

  render() {
    const { isMenu, classes } = this.props;

    const onOpen = this.onOpen; //Handle click on menu 'open'
    let onClose = this.onClose; //Handle click on menu 'close'

    const navName = [
      { name: 'Machines', icon: DevicesIcon, link: 'engine' },
      { name: 'Compétences', icon: BuildIcon, link: 'skill' },
    ];
    return(
      <div>
        <IconButton  style={theme.getRowStyle('white', '')} onClick={onOpen} aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Drawer open={isMenu} onRequestClose={onClose}>
          <div tabIndex={0} role="button" onClick={onClose} onKeyDown={onClose}>
            <div className={classes.menuTitleContainer}>
              <Typography type="headline" className={classes.menuTitle} style={theme.getRowStyle('darkGrey', '')}>KitApp</Typography>
              <Typography type="caption" className={classes.menuSubTitle} style={theme.getRowStyle('grey', '')}>v.1.0.0</Typography>
            </div>
            <Divider />
            <List>
              {navName.map((item) => (
                <Link key={item.name} className={classes.link} style={theme.getRowStyle('', 'none')} to={item.link}>
                  <ListItem button>
                    <ListItemIcon>
                      {React.createElement(item.icon)}
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </div>
        </Drawer>
      </div>
    )
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  isMenu: PropTypes.bool.isRequired,
  handleMenuRequestClose: PropTypes.func.isRequired,
  handleMenu: PropTypes.func.isRequired,
};

const MenuWithStyles = withStyles(styles)(Menu);
export { MenuWithStyles as Menu };
