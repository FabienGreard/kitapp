import React, { Component } from 'react';
import PropTypes from 'prop-types';

//material-ui import
import { withStyles } from 'material-ui/styles';

//material-ui-icon import


//styles
const styles = context => ({
});

class TableAdd extends Component {
  render() {
    //const { classes } = this.props;
    return (
      <div></div>
    );
  }

}

TableAdd.defaultProps = {
  columnData: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

const TableAddWithStyles = withStyles(styles)(TableAdd);
export { TableAddWithStyles as TableAdd };
