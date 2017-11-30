import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import { theme } from '../_helpers';

//material-ui import
//import Button from 'material-ui/Button';
import Dialog, { /*DialogActions,*/ DialogContent, DialogContentText, /*DialogTitle*/ } from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import { withStyles } from 'material-ui/styles';

//styles
const styles = context => ({
  success: {
    color: '#E91E63',
  },
  danger: {
    color: '#FF9800',
  },
});

const Transition = ({...props}) => (
  <Slide direction="up" {...props} />
);

//Render an alert on actions error
class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  componentWillReceiveProps(nextProps) {
    if(typeof nextProps.alert.message !== 'undefined'){
      this.setState({ open: true });
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    let { alert, classes } = this.props;
    return (
      <div>
        <Dialog open={this.state.open} transition={Transition} keepMounted onRequestClose={this.handleRequestClose}>
          <DialogContent>
            <DialogContentText className={alert.type === 'alert-success' ? classes.success : classes.danger}>
              {alert.message}
            </DialogContentText>
          </DialogContent>
          {/*<DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleRequestClose} color="primary">
              Agree
            </Button>
          </DialogActions>*/}
        </Dialog>
      </div>
    );
  }

}

Alert.propTypes = {
  alert : PropTypes.object,
  classes: PropTypes.object.isRequired,
};

const AlertWithStyles = withStyles(styles)(Alert);
export { AlertWithStyles as Alert }
