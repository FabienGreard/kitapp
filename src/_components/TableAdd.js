import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { SubmitLine, PriceFormatCustom, Stars } from './';
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
  flex: {
    marginRight: 'auto',
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
      submitObject: Object.keys(this.props.columnData).reduce((o, key) => Object.assign(o, {[this.props.columnData[key].id]: ''}), {}),
      touched: {},
      open: false,
      submitted: false,
    };

  }

  reset = () => {
    this.setState({
      object: Object.keys(this.props.columnData).reduce((o, key) => Object.assign(o, {[this.props.columnData[key].id]: ''}), {}),
      submitObject: Object.keys(this.props.columnData).reduce((o, key) => Object.assign(o, {[this.props.columnData[key].id]: ''}), {}),
      touched: {},
      open: false,
      submitted: false,
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.open !== this.state.open){
      this.setState({
        open: nextProps.open
      });
    }
  }

  checkForm = () => {
    let check = true;
    this.props.columnData.map(value => {
      if(value.required && this.state.submitObject[value.id] === ''){
        check = false;
      }
    });
    return check;
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

  handleLevelChange = (value) => {
    this.handleTouched('level');

    this.setState({
      object: {
        ...this.state.object,
        level: value
      }
    });
  }

  handleSubmit = (name, object = this.state.object) => {
      this.setState({
        submitObject: {
          ...this.state.submitObject,
          [name]: object[name]
        },
        object: {
          ...this.state.object,
          [name]: object[name]
        }
      });
    this.handleTouched(name, false);
  }

  handleSubmitObject = () => {
    this.setState({
      submitted : true,
    });

    if(this.checkForm()){
      console.log('AMAZING');
      //this.props.handleSubmit(object);
    }
  }

  handleClose = (e) => {
    this.reset();
    this.props.handleClickAddModify(e);
  };

  render() {
    let { touched, object, submitObject, submitted, open } = this.state;
    let { classes, columnData } = this.props;

    const handleChange = this.handleChange;
    const handleSubmit = this.handleSubmit;
    const handleSubmitObject = this.handleSubmitObject;
    const handleClose = this.handleClose;
    const handleLevelChange = this.handleLevelChange;
    return (
      <Dialog
        open={open}
        onRequestClose={handleClose}
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
                    <label htmlFor="upload" className={classes.flex}>
                      <Button raised component="span">
                        Upload <FileUpload className={classes.rightIcon} />
                      </Button>
                    </label>
                  }
                  { data.id !== 'level' ?
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
                    /> :
                    <div className={classes.flex}>
                      <Stars level={object[data.id] === '' ? 0 : object[data.id]} handleLevelChange={handleLevelChange}/>
                    </div>
                  }
                  <SubmitLine touched={touched[data.id] && true} handleSubmit={handleSubmit} reset={{[data.id]: object[data.id]}}/>
                </div>
              {submitted && !submitObject[data.id] && data.required &&
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
          <Button onClick={handleSubmitObject} raised color="accent">
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
  handleClickAddModify: PropTypes.func,
};

const TableAddWithStyles = withStyles(styles)(TableAdd);
export { TableAddWithStyles as TableAdd };
