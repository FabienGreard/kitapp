import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

//material-ui import
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import VerifiedUserIcon from 'material-ui-icons/VerifiedUser';
import FilterListIcon from 'material-ui-icons/FilterList';
import Menu, { MenuItem } from 'material-ui/Menu';

const styles = context => ({
  root: {
    paddingRight: 2,
  },
  highlight:
    context.palette.type === 'light'
      ? {
          color: context.palette.secondary.A700,
          backgroundColor: context.palette.secondary.A100,
        }
      : {
          color: context.palette.secondary.A100,
          backgroundColor: context.palette.secondary.A700,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: context.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  tooltip: {
    display: 'flex',
  }
});

class TableToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { anchorElRoleMenu: null };
  }

    handleRole = (e, role) => {
      this.props.handleClickUpdate(e, role);
      this.onClose();
    }

    onOpen = (e) => {
      this.setState({ anchorElRoleMenu: e.currentTarget });
    }

    onClose = () => {
      this.setState({ anchorElRoleMenu: null });
    }

  render() {
    let { numSelected, classes, tableName, handleClickFiltrer, handleClickDelete } = this.props;
    let { anchorElRoleMenu } = this.state;

    const textMenu = [
      { name: 'Member'},
      { name: 'Dev'},
      { name: 'Admin'},
    ];

    let isRoleMenu = Boolean(anchorElRoleMenu);

    const handleRole = this.handleRole;
    const onOpen = this.onOpen; //Handle click on Avatar 'open'
    const onClose = this.onClose; //Handle click on Avatar 'close'
    return(
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography type="subheading">{numSelected} selected</Typography>
          ) : (
            <Typography type="title">{tableName}</Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <div className={classes.tooltip}>
              <Tooltip title="role">
                <IconButton aria-owns={isRoleMenu ? 'menu-role' : null} onClick={onOpen}>
                  <VerifiedUserIcon/>
                </IconButton>
              </Tooltip>
              <Menu id="menu-role" anchorEl={anchorElRoleMenu}  open={isRoleMenu} onRequestClose={onClose}>
                {textMenu.map((textMenu) => (
                  <MenuItem key={textMenu.name} onClick={(e) => handleRole(e, textMenu.name)}>
                  {textMenu.name}
                  </MenuItem>
                ))}
              </Menu>
              <Tooltip title="Delete">
                <IconButton aria-label="Delete">
                  <DeleteIcon onClick={handleClickDelete}/>
                </IconButton>
              </Tooltip>
            </div>
          ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon onClick={handleClickFiltrer}/>
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    )
  }
}

TableToolbar.propTypes = {
  tableName: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  handleClickFiltrer: PropTypes.func.isRequired,
  handleClickDelete: PropTypes.func.isRequired,
  handleClickUpdate: PropTypes.func.isRequired,
};

TableToolbar = withStyles(styles)(TableToolbar);
export { TableToolbar };
