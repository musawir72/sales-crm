import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { logIn } from "../actions/auth";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
const styles = theme => ({
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
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

const SignIn = ({ logIn, history, classes, auth }) => {
  // if (auth) {
  //   return <Redirect to="/job_list" />;
  // }
  const [formData, setFormData] = useState({
    registration_number: null,
    password: null
  });

  const { registration_number, password } = formData;
  const onChangesHandler = e => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const submitHandler = e => {
    e.preventDefault();
    logIn(registration_number, password, history);
  };

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography variant="headline">Sign in</Typography>
          <form onSubmit={submitHandler} className={classes.form}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="registration_number">
                Registration Number
              </InputLabel>
              <Input
                id="registration_number"
                type="text"
                name="registration_number"
                autoComplete="registration_number"
                onChange={onChangesHandler}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                onChange={onChangesHandler}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="raised"
              color="primary"
              className={classes.submit}
              onChange={onChangesHandler}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
};

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  logIn: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  auth: state.authReducer.isAuth
});
export default compose(
  withStyles(styles),
  connect(mapStateToProps, { logIn })
)(withRouter(SignIn));
