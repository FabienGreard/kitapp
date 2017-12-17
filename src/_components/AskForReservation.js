import React from 'react';
import PropTypes from 'prop-types';

//material-ui import
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import { DateTimePicker } from 'material-ui-pickers';
import moment from 'moment'
import 'moment/locale/fr';


//material-ui-icons import
import DateRangeIcon from 'material-ui-icons/DateRange';
import NavigateNextIcon from 'material-ui-icons/NavigateNext';
import NavigateBeforeIcon from 'material-ui-icons/NavigateBefore';
import AccessTimeIcon  from 'material-ui-icons/AccessTime';

//styles
const styles = context => ({
  flex:{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

class AskForReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDateTimeStart: new Date(),
      selectedDateTimeEnd: new Date()
     };
  }
  handleRequestClose = () => {
    this.props.handleRequestClose();
    this.reset();
  };

  handleRequestValidate = () => {
    this.props.handleRequestClose(this.state.selectedDateTimeStart, this.state.selectedDateTimeEnd, this.props.card);
    this.reset();
  }

  reset = () => {
    this.setState({
       selectedDateTimeStart: new Date(),
       selectedDateTimeEnd: new Date()
    });
  }

  handleDateTimeChangeStart = dateTime => {
    this.setState({ selectedDateTimeStart: dateTime })
  }

  handleDateTimeChangeEnd = dateTime => {
    this.setState({ selectedDateTimeEnd: dateTime })
  }

  render() {
    let { open, card, classes } = this.props;
    let { selectedDateTimeStart, selectedDateTimeEnd } = this.state;

    const handleRequestClose = this.handleRequestClose;
    const handleRequestValidate = this.handleRequestValidate;
    const handleDateTimeChangeStart = this.handleDateTimeChangeStart;
    const handleDateTimeChangeEnd = this.handleDateTimeChangeEnd;
    return (
        <Dialog open={open} onRequestClose={handleRequestClose}>
          <DialogTitle>Valider la réservation ({card.name})</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Veuillez indiquer la date de réservation de la machine {card.name}. (Prix de la réservation : {card.price})
            </DialogContentText>
            <div className={classes.flex}>
              <DialogContentText>
                Du
              </DialogContentText>
              <DateTimePicker
                shouldDisableDate={(date: Moment) => {
                  console.log(date);
                  return date.days() === 0 || date.days() === 6;
                }}
                ampm={false}
                value={selectedDateTimeStart}
                onChange={handleDateTimeChangeStart}
                leftArrowIcon={<NavigateBeforeIcon />}
                rightArrowIcon={<NavigateNextIcon />}
                dateRangeIcon={<DateRangeIcon />}
                timeIcon={<AccessTimeIcon />}
                format={'llll'}
              />
              <DialogContentText>
                au
              </DialogContentText>
              <DateTimePicker
                shouldDisableDate={(date: Moment) => {
                  console.log(date);
                  return date.days() === 0 || date.days() === 6;
                }}
                ampm={false}
                value={selectedDateTimeEnd}
                onChange={handleDateTimeChangeEnd}
                leftArrowIcon={<NavigateBeforeIcon />}
                rightArrowIcon={<NavigateNextIcon />}
                dateRangeIcon={<DateRangeIcon />}
                timeIcon={<AccessTimeIcon />}
                format={'llll'}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRequestClose} color="primary">
              Annuler
            </Button>
            <Button onClick={handleRequestValidate} color="accent">
              Valider
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}

AskForReservation.propTypes = {
  open: PropTypes.bool.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

AskForReservation.defaultProps = {
  open: false,
};

const AskForReservationWithStyles = withStyles(styles)(AskForReservation);
export { AskForReservationWithStyles as AskForReservation };
