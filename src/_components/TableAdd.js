import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { SubmitLine, PriceFormatCustom } from './';
import { theme } from '../_helpers';

//material-ui import
import { withStyles } from 'material-ui/styles';
import Input, { InputAdornment } from 'material-ui/Input';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

//material-ui-icon import
import SettingsIcon from 'material-ui-icons/Settings';
import FileUpload from 'material-ui-icons/FileUpload';

//styles
const styles = context => ({
  line: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    minWidth: 220,
  },
  icon: {
    margin: 'auto',
    marginRight: context.spacing.unit,
  },
  button: {
    flex: '1 1 auto'
  },
  rightIcon: {
    marginLeft: context.spacing.unit,
  },
  upload: {
    display: 'none',
  }
});

class TableAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      object: Object.keys(props.columnData).reduce((o, key) => Object.assign(o, {[props.columnData[key].id]: ''}), {}),
      touched: {},
      open: false,
      submitted: false,
    };

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.open){
      this.setState({
        open: nextProps.open
      });
    }
  }

  handleTouched = (name, bool = true) => {
    this.setState({
      touched: {
        ...this.state.touched,
        [name]: bool
      }
    });
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    this.handleTouched(name); //set touched value

    this.setState({
      object: {
        ...this.state.object,
        [name]: value
      }
    });
  }

  handleSubmit = (name, object = this.state.object) => {

      this.setState({
        submitted : true,
        object: {
          ...this.state.object,
          [name]: object[name]
        }
      });

    console.log(object);
    //this.props.handleSubmit(user);
    this.handleTouched(name, false);
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let { touched, object, submitted } = this.state;
    let { classes, columnData } = this.props;

    const handleChange = this.handleChange;
    const handleSubmit = this.handleSubmit;
    const handleClose = this.handleClose;
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="table-form-add"
      >
        <DialogTitle id="table-form-title">Formulaire d'ajout</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          {
            columnData.map((data) => (
              <div key={data.id} className={classes.column}>
                <div className={classes.line}>
                  { data.image &&
                    <label htmlFor="upload" className={classes.button}>
                      <Button raised component="span">
                        Upload <FileUpload className={classes.rightIcon} />
                      </Button>
                    </label>
                  }
                  <Input
                    className={classnames(classes.input, {
                      [classes.upload]: data.image
                    })}
                  style={theme.getRowStyle('darkGrey', 'none')}
                  name={data.id}
                  value={object[data.id]}
                  onChange={handleChange}
                  id={data.image ? "upload" : data.id}
                  type={data.image ? "file" : "text"}
                  placeholder={data.label}
                  multiline={data.multiline}
                  rows={data.multiline ? 4 : 0}
                  inputComponent={data.numeric && PriceFormatCustom}
                  endAdornment={
                    <InputAdornment position="start" className={classes.icon}>
                      { data.numeric && <SettingsIcon /> }
                    </InputAdornment>}
                  />
                  <SubmitLine touched={touched[data.id] && true} handleSubmit={handleSubmit} reset={{[data.id]: object[data.id]}}/>
                </div>
              {submitted && !object[data.id] && data.required &&
                <Typography style={theme.getRowStyle('primaryColor', 'none')} type="caption">
                  {data.label} est requis
                </Typography>
              }
              </div>
            ))
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} raised color="primary">
            Annuler
          </Button>
          <Button onClick={handleSubmit} raised color="accent">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

}

TableAdd.defaultProps = {
  columnData: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
};

const TableAddWithStyles = withStyles(styles)(TableAdd);
export { TableAddWithStyles as TableAdd };
