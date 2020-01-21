import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MailFolderListItemsfrom from "./NavSide";

import { logout } from "../actions/auth";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  header: {
    fontSize: "12px"
  },
  appFrame: {
    height: "100vh",
    width: "100vw",
    zIndex: 1,
    overflow: "scroll",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    position: "absolute",
    width: "100vw",
    backgroundColor: "#1c304e",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  "appBarShift-left": {
    marginLeft: drawerWidth
  },
  "appBarShift-right": {
    marginRight: drawerWidth
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  logoText: {
    textDecoration: "none",
    marginLeft: "21px"
  },
  rightMostButton: {
    marginRight: 12
  },
  hide: {
    display: "none"
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth,
    backgroundColor: "#1c304e",
    color: "white"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  pushRight: {
    marginLeft: "auto"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  "content-left": {
    marginLeft: -drawerWidth
  },
  "content-right": {
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  "contentShift-left": {
    marginLeft: 0
  },
  "contentShift-right": {
    marginRight: 0
  },
  color: {
    color: "white"
  },
  h4: {
    margin: "0 auto"
  }
});

class NavMain extends React.Component {
  state = {
    open: false,
    anchor: "left"
  };

  renderButtons = () => {
    const { auth, classes, user } = this.props;

    if (user) {
      for (var i = 0; i < user.length; i++) {
        var name = user[i].name;
        var profile = user[i].profile;
      }
    }
    if (auth) {
      return (
        <React.Fragment>
          <h4 className={classes.h4}>Profile name :{profile}</h4>

          <Button
            onClick={this.handleLogout}
            color="inherit"
            to="/"
            component={Link}
            className={classes.rightMostButton}
          >
            Log Out
          </Button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Button
            color="inherit"
            to="/"
            component={Link}
            className={classes.pushRight}
          >
            Login
          </Button>
          <Button
            to="/signup"
            component={Link}
            color="inherit"
            className={classes.rightMostButton}
          >
            Sign Up
          </Button>
        </React.Fragment>
      );
    }
  };

  handleLogout = () => {
    this.props.logout();
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value
    });
  };

  render() {
    const { classes, theme, children, user, auth } = this.props;
    const { anchor, open } = this.state;
    if (user) {
      for (var i = 0; i < user.length; i++) {
        var name = user[i].name;
        var profile = user[i].profile;
        var registrer = user[i].registrationNumber;
      }
    }
    var drawer = (
      <Drawer
        variant="persistent"
        anchor={anchor}
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <h4 className={classes.header}>{name}</h4>
          <IconButton
            className={classes.color}
            onClick={this.handleDrawerClose}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <MailFolderListItemsfrom user={user} />
        </List>
      </Drawer>
    );

    let before = null;
    let after = null;

    if (anchor === "left") {
      before = drawer;
    } else {
      after = drawer;
    }

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open
            })}
          >
            <Toolbar disableGutters={!open}>
              {auth ? (
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(
                    classes.menuButton,
                    open && classes.hide
                  )}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                " "
              )}
              <Typography
                component={Link}
                className={classes.logoText}
                to="/"
                variant="title"
                color="inherit"
                noWrap
              >
                <img src="https://cloudtek.biz/images/logo.png" />
              </Typography>

              {this.renderButtons()}
            </Toolbar>
          </AppBar>
          {before}
          <main
            className={classNames(
              classes.content,
              classes[`content-${anchor}`],
              {
                [classes.contentShift]: open,
                [classes[`contentShift-${anchor}`]]: open
              }
            )}
          >
            <div className={classes.drawerHeader} />
            {children}
          </main>
          {after}
        </div>
      </div>
    );
  }
}

NavMain.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  auth: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.authReducer.isAuth,
  user: state.authReducer.user
});

export default compose(
  withStyles(styles, { withTheme: true }),
  withRouter,
  connect(mapStateToProps, { logout })
)(NavMain);
