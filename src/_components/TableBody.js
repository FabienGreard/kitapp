import React, { Component } from 'react';
import PropTypes from 'prop-types';

//material-ui import
import { TableBody, TableCell, TableRow } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

class _TableBody extends Component {
  handleKeyDown = (e, id) => {
    this.props.handleKeyDown(e, id);
  };

  handleClick = (e, id) => {
    this.props.handleClick(e, id);
  };

  render() {
    let { data, rowsPerPage, page } = this.props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

    const handleClick = this.handleClick;
    const handleKeyDown = this.handleKeyDown;
    return (
      <TableBody>
        { Object.keys(data).length !== 0 && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
          const isSelected = this.props.isSelected(n.id);
          return (
            <TableRow
              key={n.id}
              hover
              onClick={e => handleClick(e, n.id)}
              onKeyDown={e => handleKeyDown(e, n.id)}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={-1}
              selected={isSelected}
            >
              <TableCell padding="checkbox">
                <Checkbox checked={isSelected} />
              </TableCell>

              <TableCell padding="none">{n.email}</TableCell>
              <TableCell padding="none">{n.firstName}</TableCell>
              <TableCell padding="none">{n.lastName}</TableCell>
              <TableCell padding="none">{n.role}</TableCell>

            </TableRow>
          );
        })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 49 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    );
  }

}

_TableBody.propTypes = {
  data: PropTypes.array,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  isSelected: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export { _TableBody as TableBody };
