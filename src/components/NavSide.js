import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import StarIcon from "@material-ui/icons/Star";
import SendIcon from "@material-ui/icons/Send";
import MailIcon from "@material-ui/icons/Mail";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import DeleteIcon from "@material-ui/icons/Delete";
import ReportIcon from "@material-ui/icons/Report";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import DashboardIcon from "@material-ui/icons/Dashboard";
import StarBorder from "@material-ui/icons/StarBorder";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import ListIcon from "@material-ui/icons/List";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import WorkIcon from "@material-ui/icons/Work";
import PersonIcon from "@material-ui/icons/Person";

import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    color: "white"
  }
});
const mailFolderListItems = ({ user, classes }) => {
  const [open, setOpen] = React.useState(false);
  const [userOpen, setuserOpen] = React.useState(false);
  const [leadsOpen, setleadsOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const userHandleClick = () => {
    setuserOpen(!userOpen);
  };

  const leadsHandleClick = () => {
    setleadsOpen(!leadsOpen);
  };

  if (user) {
    for (var i = 0; i < user.length; i++) {
      var raceName = user[i].role;
      var name = user[i].name;
    }
  }
  return (
    <div>
      <ListItem button component={Link} to="/dashboard">
        <ListItemIcon>
          <DashboardIcon className={classes.root} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <WorkOutlineIcon className={classes.root} />
        </ListItemIcon>
        <ListItemText primary="Sales" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button component={Link} to="/job_list">
            <ListItemIcon>
              <ListIcon className={classes.root} />
            </ListItemIcon>
            <ListItemText primary="Job List" />
          </ListItem>
          {raceName == "admin" || raceName == "super_admin" ? (
            <ListItem button component={Link} to="/admin_job_list">
              <ListItemIcon>
                <SupervisorAccountIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Sales Admin" />
            </ListItem>
          ) : (
            ""
          )}
          {raceName == "admin" || raceName == "super_admin" ? (
            <ListItem button component={Link} to="/sales_daily_details">
              <ListItemIcon>
                <WorkIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Daily Job" />
            </ListItem>
          ) : (
            ""
          )}
        </List>
      </Collapse>
      {raceName == "super_admin" ? (
        <ListItem button onClick={userHandleClick}>
          <ListItemIcon>
            <PersonIcon className={classes.root} />
          </ListItemIcon>
          <ListItemText primary="User" />
          {userOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      ) : (
        ""
      )}

      <Collapse in={userOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {raceName == "super_admin" ? (
            <ListItem button component={Link} to="/user_list">
              <ListItemIcon>
                <ListIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="User List" />
            </ListItem>
          ) : (
            ""
          )}

          {raceName == "admin" && name == "Muddasir Ahmed" ? (
            <ListItem button component={Link} to="/user_report">
              <ListItemIcon>
                <ListIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="User Report" />
            </ListItem>
          ) : (
            ""
          )}
        </List>
      </Collapse>
      {raceName == "admin" || raceName == "super_admin" ? (
        <React.Fragment>
          <ListItem button onClick={leadsHandleClick}>
            <ListItemIcon>
              <WorkOutlineIcon className={classes.root} />
            </ListItemIcon>
            <ListItemText primary="Leads" />
            {leadsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={leadsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {raceName == "super_admin" ? (
                <ListItem button component={Link} to="/leads_list">
                  <ListItemIcon>
                    <ListIcon className={classes.root} />
                  </ListItemIcon>
                  <ListItemText primary="Leads List" />
                </ListItem>
              ) : (
                ""
              )}
              <ListItem button component={Link} to="/my_leads">
                <ListItemIcon>
                  <ListIcon className={classes.root} />
                </ListItemIcon>
                <ListItemText primary="My Leads" />
              </ListItem>
              <ListItem button component={Link} to="/lead_scedule">
                <ListItemIcon>
                  <ListIcon className={classes.root} />
                </ListItemIcon>
                <ListItemText primary="Lead Scheduler" />
              </ListItem>
            </List>
          </Collapse>
        </React.Fragment>
      ) : (
        ""
      )}
    </div>
  );
};

export default compose(withStyles(styles, { withTheme: true }))(
  mailFolderListItems
);
