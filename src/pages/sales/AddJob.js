import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import HowToReg from "@material-ui/icons/HowToReg";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addJob } from "../../actions/job";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid 6c697859",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  button: {
    position: "relative"
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  h1: {
    fontSize: "25px",
    fontFamily: "auto"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "31"
  },
  buttonform: {
    marginTop: "5%",
    width: "100%"
  },
  avatar: {
    margin: `${theme.spacing.unit}px auto`,
    backgroundColor: theme.palette.secondary.main
  },
  typography: {
    fontFamily: "initial",
    fontSize: "25px",
    position: "relative",
    left: "308px"
  },
  error1: {
    position: "absolute",
    right: "491px",
    top: "363px",
    color: "red"
  },
  error2: {
    position: "absolute",
    top: "360px",
    color: "red"
  },
  top: {
    marginTop: "24px"
  }
}));

const AddJob = ({ addJob, history, job, count }) => {
  const [formData, setFormData] = useState({
    job_title: null,
    profile: null,
    location: null,
    salary: null,
    company_name: null,
    url: null
  });

  const [exist, setExist] = useState("");
  const [existComp, setExistComp] = useState("");

  const { company_name, job_title, url, profile, location, salary } = formData;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeHandler = e => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const selectHandler = e => {
    setFormData({
      ...formData,
      profile: e.target.value
    });
  };

  const searchHandler = e => {
    if (e.target.value) {
      setFormData({
        ...formData,
        company_name: e.target.value
      });
      const exist = job.filter(item => {
        return item.companyName.toLowerCase() == e.target.value.toLowerCase();
      });
      if (exist.length > 0) {
        setExistComp("Company Name Already Exist");
      } else {
        setExistComp("");
      }
    } else {
      setExistComp("");
    }
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    addJob(company_name, job_title, url, profile, location, salary, history);
    count();
    return <Redirect to="/job_list" />;
  };
  return (
    <div>
      <Tooltip
        title="Add"
        aria-label="add"
        onClick={handleOpen}
        className={classes.button}
      >
        <Fab color="primary">
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <HowToReg />
            </Avatar>
            <Typography
              className={classes.typography}
              align="center"
              variant="headline"
            >
              Add new Job
            </Typography>
            <form
              onSubmit={onSubmitHandler}
              className={classes.root}
              noValidate
              autoComplete="off"
            >
              <span className={classes.error2}>{existComp}</span>
              <TextField
                autoFocus
                id="company_name"
                label="Company Name"
                className={classes.textField}
                margin="normal"
                onChange={searchHandler}
              />
              <TextField
                id="job_title"
                label="Job Title"
                type="text"
                className={classes.textField}
                margin="normal"
                onChange={onChangeHandler}
              />
              <TextField
                id="url"
                label="URL"
                type="text"
                name="url"
                className={classes.textField}
                margin="normal"
                onChange={onChangeHandler}
              />
              <span className={classes.error1}>{exist}</span>
              <br></br>

              <Select
                id="select"
                label="Designation"
                className={(classes.textField, classes.top)}
                margin="normal"
                onChange={selectHandler}
              >
                <MenuItem value="Ali Muhammad">Ali Muhammad</MenuItem>
                <MenuItem value="Kevin Jay">Kevin Jay</MenuItem>
                <MenuItem value="Danish Khan">Danish Khan</MenuItem>
              </Select>
              <TextField
                id="location"
                label="Location"
                type="text"
                className={classes.textField}
                margin="normal"
                onChange={onChangeHandler}
              />
              <TextField
                id="salary"
                label="Salary"
                type="text"
                className={classes.textField}
                margin="normal"
                onChange={onChangeHandler}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.buttonform}
              >
                Add Job
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

AddJob.propTypes = {
  addJob: PropTypes.func.isRequired
};

export default connect(null, { addJob })(withRouter(AddJob));
