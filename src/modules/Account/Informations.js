import React from 'react';
import PropTypes from 'prop-types';

import { Dialog, NumberFormatCustom } from '../../_components';
import { theme } from '../../_helpers';

//material-ui import
import { withStyles } from 'material-ui/styles';
import Input, { InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText, FormControlLabel } from 'material-ui/Form';
import Divider from 'material-ui/Divider';
import Radio, { RadioGroup } from 'material-ui/Radio';

//material-ui-icon import
import EmailIcon from 'material-ui-icons/Email';
import PhoneIcon from 'material-ui-icons/Phone';
import PermIdentityIcon from 'material-ui-icons/PermIdentity';

//styles
const styles = context => ({
  root: {
    padding: 20,
    display: 'flex',
    flexWrap: 'wrap',
  },
  headline: {
    margin: context.spacing.unit,
  },
  formControl: {
    margin: context.spacing.unit,
    marginLeft: 'auto',
    marginRight: 'auto',
    minWidth: '270px',
  },
  icon: {
    margin: 'auto',
    marginRight: context.spacing.unit,
  },
  input: {
    margin: context.spacing.unit,
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

class Informations extends React.Component {
  handleChange = (e) => {
    this.props.handleChange(e);
  }

  render() {
    let { classes, user } = this.props;

    const handleChange = this.handleChange;
    return (
      <div className={classes.root}>
        <FormControl fullWidth>
          <Dialog className={classes.headline} message="COORDONNÉES" style={theme.getRowStyle('darkGrey', 'none')} type="subheading"/>
          <Divider/>
        </FormControl>
        <FormControl className={classes.formControl}>
          <FormHelperText>Email</FormHelperText>
          <Input className={classes.input} style={theme.getRowStyle('darkGrey', 'none')} name="email" type="email" value={user.email} onChange={handleChange} startAdornment={
            <InputAdornment position="start" className={classes.icon}>
              <EmailIcon/>
            </InputAdornment>}/>
          <FormHelperText>Téléphone</FormHelperText>
          <Input className={classes.input} style={theme.getRowStyle('darkGrey', 'none')} name="phone"  inputComponent={NumberFormatCustom} value={user.phone} onChange={handleChange} startAdornment={
            <InputAdornment position="start" className={classes.icon}>
              <PhoneIcon/>
            </InputAdornment>}/>
        </FormControl>
        <FormControl fullWidth>
          <Dialog className={classes.headline} message="INFORMATIONS GÉNÉRALES" style={theme.getRowStyle('darkGrey', 'none')} type="subheading"/>
          <Divider/>
        </FormControl>
        <FormControl className={classes.formControl}>
          <FormHelperText>Prénom</FormHelperText>
          <Input className={classes.input} style={theme.getRowStyle('darkGrey', 'none')} name="firstName" type="text" value={user.firstName} onChange={handleChange} startAdornment={
            <InputAdornment position="start" className={classes.icon}>
              <PermIdentityIcon/>
            </InputAdornment>}/>
          <FormHelperText>Nom</FormHelperText>
          <Input className={classes.input} style={theme.getRowStyle('darkGrey', 'none')} name="lastName" type="text" value={user.lastName} onChange={handleChange} startAdornment={
            <InputAdornment position="start" className={classes.icon}>
              <PermIdentityIcon/>
            </InputAdornment>}/>
          <FormHelperText>Sexe</FormHelperText>
          <RadioGroup aria-label="gender" name="gender" className={classes.group} value={user.sex} onChange={handleChange}>
            <FormControlLabel value="Homme" control={<Radio />} label="Male" />
            <FormControlLabel value="Femme" control={<Radio />} label="Female" />
            <FormControlLabel value="Autre" control={<Radio />} label="Autre" />
          </RadioGroup>
        </FormControl>
        <FormControl fullWidth>
          <Dialog className={classes.headline} message="MOT DE PASSE" style={theme.getRowStyle('darkGrey', 'none')} type="subheading"/>
          <Divider/>
        </FormControl>
        <FormControl className={classes.formControl}>

        </FormControl>
      </div>
    )
  }
}
Informations.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

const InformationsWithStyles = withStyles(styles)(Informations);
export { InformationsWithStyles as Informations }
