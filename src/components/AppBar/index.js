import React, { Component } from 'react';
import PropTypes from 'prop-types';

//material-ui import
import { withStyles } from 'material-ui/styles';

import SimpleBar from './SimpleBar';
import AccountMenu from './AccountMenu';
import Dialog from './Dialog';
import NavMenu from './NavMenu';

//styles
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

    const { theme, message, classes, handleChangeOnMessage } = this.props;
    return (
      <SimpleBar theme={theme}>
        <div className={classes.menuButton}>
          <NavMenu message={message} theme={theme} isMenu={isMenu} handleChangeOnMessage={handleChangeOnMessage} handleMenu={handleMenu} handleMenuRequestClose={handleMenuRequestClose}/>
        </div>
        <div className={classes.flex}>
          <Dialog theme={theme} message={message}/>
        </div>
        <AccountMenu handleChangeOnMessage={handleChangeOnMessage} message={message} theme={theme} anchorElAccountMenu={anchorElAccountMenu} handleAccountMenu={handleAccountMenu} handleAccountMenuRequestClose={handleAccountMenuRequestClose}/>
      </SimpleBar>
    );
  }
}

AppBar.propTypes = {
  theme: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  handleChangeOnMessage: PropTypes.func.isRequired,
};

export default withStyles(styles)(AppBar);
