import React, { Component } from 'react';
import PropTypes from 'prop-types';

//material-ui import
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

//styles
const styles = context => ({
  menuList: {
    width: 250,
  },
  menuTitleContainer: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  menuTitle: {
    padding: 6,
    paddingBottom: 0,
  },
  menuSubTitle: {
    paddingTop: 0,
    padding: 6
  },
});

const MenuTitle = ({classes, theme}) => (
  <div className={classes.menuTitleContainer}>
    <Typography type="headline" className={classes.menuTitle} style={theme.getRowStyle('darkGrey', '')}>KitApp</Typography>
    <Typography type="caption" className={classes.menuSubTitle} style={theme.getRowStyle('grey', '')}>v.1.0.0</Typography>
  </div>
);

class NavMenuList extends Component {
  render() {
    const { classes, theme, handleChangeOnMessage } = this.props;
    return (
      <div className={classes.menuList}>
        <MenuTitle theme={theme} classes={classes}/>
        <Divider />
        <List>
          <ListItem button onClick={() => handleChangeOnMessage("Inbox")}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button onClick={() => handleChangeOnMessage("Drafts")}>
          <ListItemIcon>
            <DraftsIcon  />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
          </ListItem>
        </List>
      </div>
    );
  }
}

NavMenuList.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavMenuList);
