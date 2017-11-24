import React from 'react';
import PropTypes from 'prop-types';

//material-ui
import theme from './style/theme';
import Typography from 'material-ui/Typography';
import { MuiThemeProvider, withStyles } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';

import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';

const styles = context => ({
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  menuList: {
    width: 250,
  },
});

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      theme: new theme(),
      message: "KitAPP",
      isLoggedIn: false,
      anchorElAccountMenu: null,
      isMenu: false
    };
    //Fix document margin style
    document.body.style.margin = '0px';
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

  render() {
    const theme = this.state.theme;
    const message = this.state.message;

    const anchorElAccountMenu = this.state.anchorElAccountMenu;
    const handleAccountMenu = this.handleAccountMenu;
    const handleAccountMenuRequestClose = this.handleAccountMenuRequestClose;

    const isMenu = this.state.isMenu;
    const handleMenu = this.handleMenu;
    const handleMenuRequestClose = this.handleMenuRequestClose;
    return(
      <MuiThemeProvider theme={theme.renderTheme}>
        <MenuAppBar theme={theme} menu={<MenuIconButton theme={theme} isMenu={isMenu} handleMenu={handleMenu} handleMenuRequestClose={handleMenuRequestClose}/>} dialog={<Dialog theme={theme} message={message}/>} auth={<AvatarButton theme={theme} anchorElAccountMenu={anchorElAccountMenu} handleAccountMenu={handleAccountMenu} handleAccountMenuRequestClose={handleAccountMenuRequestClose}/>}/>
      </MuiThemeProvider>
    )
  }
}

//APP bar
const MenuAppBar = ({theme, menu, dialog, auth, context}) => (
  <AppBar position="static" style={theme.getRowStyle('', 'primaryColor',)}>
    <Toolbar>
      <div style={styles(context).menuButton}>
        {menu}
      </div>
      <div style={styles(context).flex}>
        {dialog}
      </div>
      {auth}
    </Toolbar>
  </AppBar>
);

//Basic text dialog
const Dialog = ({theme, message}) => (
  <Typography type="title" style={theme.getRowStyle('white', '')}>{message}</Typography>
);

//Nav Menu
class MenuIconButton extends React.Component {
  constructor(props) {
    super(props);
    console.log('IsMenu', this.props.isMenu);
  }

  onOpen = () => {
    this.props.handleMenu();
    console.log('onOpen', this.props.isMenu);
  }

  onClose = () => {
    this.props.handleMenuRequestClose();
    console.log('onClose', this.props.isMenu);
  }

  render() {
    const theme = this.props.theme;
    const isMenu = this.props.isMenu;
    const context = this.props.context;

    const onOpen = this.onOpen;
    const onClose = this.onClose;

    const sideList = (
      <div style={styles(context).menuList}>
        <List>
          <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button>
          <ListItemIcon>
            <DraftsIcon  />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemText primary="Trash" />
          </ListItem>
          <ListItem button component="a" href="#simple-list">
            <ListItemText primary="Spam" />
          </ListItem>
        </List>
      </div>
    );
    return(
      <div>
        <IconButton  style={theme.getRowStyle('white', '')} onClick={onOpen} aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Drawer open={isMenu} onRequestClose={onClose}>
          <div tabIndex={0} role="button" onClick={onClose} onKeyDown={onClose}>
            {sideList}
          </div>
        </Drawer>
      </div>
    )
  }
}

//Login menu
class AvatarButton extends React.Component {
  onOpen = (e) => {
    this.props.handleAccountMenu(e);
  }

  onClose = () => {
    this.props.handleAccountMenuRequestClose();
  }

  render() {
    const theme = this.props.theme;
    const anchorElAccountMenu = this.props.anchorElAccountMenu;
    const isAccountMenu = Boolean(anchorElAccountMenu);

    const onOpen = this.onOpen;
    const onClose = this.onClose;
    return(
      <div>
        <IconButton  style={theme.getRowStyle('white', '')} aria-owns={isAccountMenu ? 'menu-account' : null} onClick={onOpen}>
          <AccountCircle  />
        </IconButton>
        <Menu id="menu-account" anchorEl={anchorElAccountMenu}  open={isAccountMenu} onRequestClose={onClose}>
          <MenuItem onClick={onClose}>Mon profile</MenuItem>
          <MenuItem onClick={onClose}>Mon compte</MenuItem>
          <MenuItem onClick={onClose}>Se déconnecter</MenuItem>
        </Menu>
      </div>
    )
  }
}

export default withStyles(styles)(App);
