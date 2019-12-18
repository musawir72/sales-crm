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
import { updateLead } from "../../../actions/job";

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

  button: {
    width: "100%",
    marginTop: "5%"
  }
});

const editLead = ({ classes, children, history, location, updateLead }) => {
  const [formData, setFormData] = useState(location.state.detail);

  const {
    id,
    profile,
    job_title,
    salary,
    source,
    email,
    website,
    client_name,
    phone_number,
    call_time,
    time_zone,
    call_date
  } = formData;
  const onChangeHandler = e => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  const onSubmitHandler = e => {
    e.preventDefault();
    console.log(formData);
    updateLead(
      id,
      profile,
      job_title,
      salary,
      source,
      email,
      website,
      client_name,
      phone_number,
      call_time,
      time_zone,
      call_date,
      history
    );
  };
  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <IconButton aria-label="edit">
            <ArrowBackIcon
              fontSize="large"
              onClick={() => history.push("/leads_list/")}
            />
          </IconButton>
          <Avatar className={classes.avatar}>
            <Edit />
          </Avatar>

          <Typography align="center" variant="headline">
            Edit Lead
          </Typography>
          <form onSubmit={onSubmitHandler}>
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
            <TextField
              id="client_name"
              label="Client Name"
              margin="normal"
              type="text"
              placeholder="enter client name"
              className={classes.textField}
              value={formData.client_name}
              onChange={onChangeHandler}
            />
            <TextField
              id="source"
              label="Source"
              margin="normal"
              type="text"
              placeholder="enter source"
              className={classes.textField}
              value={formData.source}
              onChange={onChangeHandler}
            />
            <TextField
              id="email"
              label="Email"
              margin="normal"
              type="text"
              placeholder="enter @mail"
              className={classes.textField}
              value={formData.email}
              onChange={onChangeHandler}
            />
            <TextField
              id="website"
              label="Website"
              margin="normal"
              type="text"
              className={classes.textField}
              value={formData.website}
              placeholder="enter website"
              onChange={onChangeHandler}
            />

            <TextField
              id="phone_number"
              label="Phone Number"
              margin="normal"
              type="text"
              className={classes.textField}
              value={formData.phone_number}
              placeholder="enter phone number"
              onChange={onChangeHandler}
            />
            <TextField
              id="call_time"
              label="Call Time"
              margin="normal"
              type="text"
              className={classes.textField}
              value={formData.call_time}
              placeholder="enter call time"
              onChange={onChangeHandler}
            />

            <TextField
              id="time_zone"
              label="Time Zone"
              margin="normal"
              type="text"
              className={classes.textField}
              value={formData.time_zone}
              placeholder="enter time zone"
              onChange={onChangeHandler}
            />

            <TextField
              id="call_date"
              margin="normal"
              type="date"
              className={classes.textField}
              onChange={onChangeHandler}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
            >
              Update Lead
            </Button>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
};

editLead.propTypes = {
  classes: PropTypes.object.isRequired,
  updateJob: PropTypes.func.isRequired
};

export default compose(
  withStyles(styles),
  connect(null, { updateLead })
)(editLead);
