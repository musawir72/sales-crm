import React from "react";
import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import HowToReg from "@material-ui/icons/HowToReg";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import compose from "recompose/compose";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { signUp } from "../actions/auth";
import { Redirect, withRouter } from "react-router-dom";
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "50%",
    margin: "0 auto",
    minHeight: "250px"
  },
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  button: {
    marginTop: "5%",
    width: "100%"
  }
});

const PaperSheet = ({ signUp, classes, history }) => {
  const [formData, setFormData] = useState({
    registration_number: null,
    name: null,
    designation: null,
    password: null
  });

  const { registration_number, name, designation, password } = formData;
  const onChangesHandler = e => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const setSelectHandler = e => {
    setFormData({
      ...formData,
      designation: e.target.value
    });
  };

  const submitHandler = e => {
    e.preventDefault();
    signUp(registration_number, name, designation, password, history);
  };

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper} elevation={1}>
          <Avatar className={classes.avatar}>
            <HowToReg />
          </Avatar>
          <Typography variant="headline">Sign Up</Typography>
          <form
            onSubmit={submitHandler}
            className={classes.container}
            autoComplete="on"
          >
            <TextField
              autoFocus
              id="registration_number"
              label="Registration Number"
              className={classes.textField}
              margin="normal"
              onChange={onChangesHandler}
            />
            <TextField
              id="name"
              label="Name"
              type="text"
              className={classes.textField}
              margin="normal"
              onChange={onChangesHandler}
            />
            <br></br>
            <br></br>
            <Select
              id="select"
              label="Designation"
              className={classes.textField}
              margin="normal"
              onChange={setSelectHandler}
            >
              <MenuItem value="Developer">Developer</MenuItem>

              <MenuItem value="Project Manger">Project Manger</MenuItem>
              <MenuItem value="Sales Manger">Sales Manger</MenuItem>
              <MenuItem value="Sales">Sales User</MenuItem>
            </Select>
            <TextField
              id="password"
              label="Password"
              type="password"
              className={classes.textField}
              margin="normal"
              onChange={onChangesHandler}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
};

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
  signUp: PropTypes.func.isRequired
};

export default compose(
  withStyles(styles),
  connect(null, { signUp })
)(withRouter(PaperSheet));
