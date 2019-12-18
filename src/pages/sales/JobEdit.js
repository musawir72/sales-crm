import React, { useState } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Edit from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { updateJob } from "../../actions/job";

const styles = theme => ({
  layout: {
    width: "100%",
    display: "block",
    margin: "0 auto",
    [theme.breakpoints.up("sm")]: {
      width: "80%"
    },
    [theme.breakpoints.up("md")]: {
      width: "65%"
    },
    [theme.breakpoints.up("lg")]: {
      width: "45%"
    }
  },
  paper: {
    minHeight: "300px",
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: `${theme.spacing.unit}px auto`,
    backgroundColor: theme.palette.secondary.main
  },
  textField: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    width: "100%"
  },
  button: {
    width: "100%",
    marginTop: "5%"
  }
});

const editJob = ({ classes, children, history, location, updateJob }) => {
  const [formData, setFormData] = useState(location.state.detail);

  const { id, companyName, url, profile, job_title, salary } = formData;
  const onChangeHandler = e => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  const onSubmitHandler = e => {
    e.preventDefault();
    updateJob(id, companyName, url, profile, job_title, salary, history);
  };
  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <IconButton aria-label="edit">
            <ArrowBackIcon
              fontSize="large"
              onClick={() => history.push("/admin_job_list/")}
            />
          </IconButton>
          <Avatar className={classes.avatar}>
            <Edit />
          </Avatar>

          <Typography align="center" variant="headline">
            Edit Job
          </Typography>
          <form onSubmit={onSubmitHandler}>
            <TextField
              id="companyName"
              label="Company Name"
              margin="normal"
              type="text"
              className={classes.textField}
              value={formData.companyName}
              onChange={onChangeHandler}
            />
            <TextField
              id="job_title"
              label="Job Title"
              margin="normal"
              type="text"
              className={classes.textField}
              value={formData.job_title}
              onChange={onChangeHandler}
            />
            <TextField
              id="url"
              label="Url"
              margin="normal"
              type="text"
              className={classes.textField}
              value={formData.url}
              onChange={onChangeHandler}
            />
            <TextField
              id="profile"
              label="Profile"
              margin="normal"
              type="text"
              className={classes.textField}
              value={formData.profile}
              onChange={onChangeHandler}
            />
            <TextField
              id="salary"
              label="Salary"
              margin="normal"
              type="text"
              className={classes.textField}
              value={formData.salary}
              onChange={onChangeHandler}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
            >
              Update Job
            </Button>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
};

editJob.propTypes = {
  classes: PropTypes.object.isRequired,
  updateJob: PropTypes.func.isRequired
};

export default compose(
  withStyles(styles),
  connect(null, { updateJob })
)(editJob);
