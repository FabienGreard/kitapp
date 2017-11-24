import React, { Component } from 'react';
import PropTypes from 'prop-types';

//material-ui import
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

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

//SimpleBar render the kitapp bar
class SimpleBar extends Component {
  render() {
    const { classes, theme, menu, dialog, auth } = this.props;
    return (
      <AppBar position="static" style={theme.getRowStyle('', 'primaryColor',)}>
        <Toolbar>
          <div className={classes.menuButton}>
            {menu}
          </div>
          <div className={classes.flex}>
            {dialog}
          </div>
          {auth}
        </Toolbar>
      </AppBar>
    );
  }
}

SimpleBar.propTypes = {
  menu: PropTypes.object.isRequired,
  dialog: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme : PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBar);
