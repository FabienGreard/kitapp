import React, { Component } from 'react';
import PropTypes from 'prop-types';

//material-ui import
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

//SimpleBar render the kitapp bar
class SimpleBar extends Component {
  render() {
    const { theme, children } = this.props;
    return (
      <AppBar position="static" style={theme.getRowStyle('', 'primaryColor',)}>
        <Toolbar>
          {children}
        </Toolbar>
      </AppBar>
    );
  }
}

SimpleBar.propTypes = {
  children: PropTypes.array.isRequired,
  theme : PropTypes.object.isRequired,
};

export default SimpleBar;
