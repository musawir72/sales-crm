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
import { updateUser } from "../../actions/user";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { useAlert } from "react-alert";
import Select from "@material-ui/core/Select";

import MenuItem from "@material-ui/core/MenuItem";

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

const editUser = ({ classes, children, history, location, updateUser }) => {
  //const alert = useAlert();
  const [formData, setFormData] = useState(location.state.detail);

  const { registrationNumber, name, designation, id } = formData;
  const [role, setRole] = useState("");
  const onChangeHandler = e => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  const onSubmitHandler = e => {
    e.preventDefault();

    updateUser(registrationNumber, name, designation, id, role, history);
    alert.success("User Updated !");
  };

  const roleHandler = e => {
    setRole(e.target.value);
  };
  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <IconButton aria-label="edit">
            <ArrowBackIcon
              fontSize="large"
              onClick={() => history.push("/user_list/")}
            />
          </IconButton>
          <Avatar className={classes.avatar}>
            <Edit />
          </Avatar>

          <Typography align="center" variant="headline">
            Edit User
          </Typography>
          <form onSubmit={onSubmitHandler}>
            <TextField
              disabled
              id="registrationNumber"
              label="Registration Number"
              margin="normal"
              type="text"
              className={classes.textField}
              value={formData.registrationNumber}
              onChange={onChangeHandler}
            />
            <TextField
              id="name"
              label="Name"
              margin="normal"
              type="text"
              className={classes.textField}
              value={formData.name}
              onChange={onChangeHandler}
            />
            <TextField
              id="designation"
              label="Designation"
              margin="normal"
              type="text"
              className={classes.textField}
              value={formData.designation}
              onChange={onChangeHandler}
            />
            <TextField
              id="designation"
              label="Assign"
              margin="normal"
              type="text"
              className={classes.textField}
              value={formData.designation}
              onChange={onChangeHandler}
            />
            <Select
              id="role"
              label="Role"
              className={classes.textField}
              margin="normal"
              onChange={roleHandler}
            >
              <MenuItem value="super_admin">Super Admin</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
            >
              Update User
            </Button>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
};

editUser.propTypes = {
  classes: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired
};

export default compose(
  withStyles(styles),
  connect(null, { updateUser })
)(editUser);
