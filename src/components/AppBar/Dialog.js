import React, { Component } from 'react';
import PropTypes from 'prop-types';

//material-ui import
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

//styles
const styles = context => ({
  title: {
    marginLeft: 24,
  },
});

//Render a simple Dialog
class Dialog extends Component {
  render() {
    const { theme, message, classes } = this.props;
    return (
      <div>
        <Typography type="title" className={classes.title} style={theme.getRowStyle('white', '')}>{message}</Typography>
      </div>
    );
  }

}

Dialog.propTypes = {
  theme: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dialog);
