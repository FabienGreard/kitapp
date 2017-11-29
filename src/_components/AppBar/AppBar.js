import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//material-ui import
import { withStyles } from 'material-ui/styles';

import { SimpleBar, Dialog, AccountMenu, Menu } from '../';

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

  render() {
    let { anchorElAccountMenu, isMenu } = this.state;

    //AccountMenu consts
    let handleAccountMenu = this.handleAccountMenu;
    let handleAccountMenuRequestClose = this.handleAccountMenuRequestClose;

    //NavMenu consts
    let handleMenu = this.handleMenu;
    let handleMenuRequestClose = this.handleMenuRequestClose;

    let { message, classes, isLoggedIn } = this.props;
    return (
      <SimpleBar>
        <div className={classes.menuButton}>
          { isLoggedIn && <Menu isMenu={isMenu} handleMenu={handleMenu} handleMenuRequestClose={handleMenuRequestClose}/>}
        </div>
        <div className={classes.flex}>
          <Dialog message={message}/>
        </div>
        { isLoggedIn &&
        <AccountMenu anchorElAccountMenu={anchorElAccountMenu} handleAccountMenu={handleAccountMenu} handleAccountMenuRequestClose={handleAccountMenuRequestClose}/>}
      </SimpleBar>
    );
  }
}

AppBar.propTypes = {
  message: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool,
};

function mapStateToProps(state) {
    const { isLoggedIn } = state.authentication;
    return {
        isLoggedIn,
    };
}

const connectedApp = connect(mapStateToProps)(AppBar);
const AppBarWithStyles = withStyles(styles)(connectedApp);
export { AppBarWithStyles as AppBar }
