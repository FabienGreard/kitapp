import React from 'react';
import PropTypes from 'prop-types';

import { theme } from '../_helpers';
//material-ui impor
import { CardContent , CardMedia } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

//material-ui-icon import
import SettingsIcon from 'material-ui-icons/Settings';

//styles
const styles = context => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: context.spacing.unit,
    minHeight: 72
  },
  media: {
    height: 194,
  },
  price: {
    alignItems: 'center',
    display: 'flex',
  },
  flex: {
    display: 'flex',
    flexDirection: 'column'
  }
});

const _CardHeader = ({title, image, location, price, classes}) => (
  <div className={classes.flex}>
    <CardContent className={classes.header}>
      <div>
        <Typography type="headline" style={theme.getRowStyle('black','')}>{title}</Typography>
        <Typography type="subheading" style={theme.getRowStyle('darkGrey','none')}>{location}</Typography>
      </div>
      <div>
        <Typography type="subheading" className={classes.price} style={theme.getRowStyle('darkPrimaryColor','')}>
          <SettingsIcon/>
          {price}
        </Typography>

      </div>
    </CardContent>
    <CardMedia
      className={classes.media}
      image={image}
      title={title}
    />
  </div>
);

_CardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

const _CardHeaderWithStyles = withStyles(styles)(_CardHeader);
export { _CardHeaderWithStyles as CardHeader };
