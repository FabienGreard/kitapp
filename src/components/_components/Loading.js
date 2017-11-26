import React, { Component } from 'react';
import PropTypes from 'prop-types';

//material-ui import
import { LinearProgress } from 'material-ui/Progress';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = { timer : 0 };
  }

  componentDidMount(){
    this.timerID = setInterval(() => this.countDown(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  countDown(){
    this.setState((prevState, props) => ({
      timer: prevState.timer + (100 / (props.timer * 10))
    }));
  }

  render() {
    const { timer } = this.state;
    const { color } = this.props;
    return (
      <LinearProgress mode="determinate" value={timer} color={color} />
    );
  }

}

Loading.propTypes = {
  timer: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

Loading.defaultProps = {
  timer : 1,
};

export { Loading }
