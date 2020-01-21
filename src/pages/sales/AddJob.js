import React, { useState, useEffect, Fragment } from "react";
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
    padding: theme.spacing(2, 4, 3),
    width: "58%"
  },
  compExist: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid 6c697859",
    boxShadow: theme.shadows[5],

    width: "41%",
    float: "right",
    marginTop: "-481px"
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
    backgroundColor: theme.palette.secondary.main,
    margin: " 0 auto"
  },
  typography: {
    fontFamily: "initial",
    fontSize: "25px",
    position: "relative",
    left: "260px"
  },
  error1: {
    position: "absolute",
    right: "777px",
    top: "226px",
    color: "red"
  },
  error2: {
    position: "absolute",
    top: "227px",
    color: "red"
  },
  profile: {
    marginTop: "24px"
  },
  header: {
    textAlign: "center",
    fontSize: "20px",
    color: "red"
  }
}));

const AddJob = ({ addJob, history, job, count }) => {
  const [dailyJob, setDailyJob] = useState([]);
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
  const [compExist, setCompExist] = useState([]);

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
        setCompExist(exist);
      } else {
        setCompExist([]);
        setExistComp("");
      }
    } else {
      setCompExist([]);
      setExistComp("");
    }
  };

  const searchHandlerUrl = e => {
    if (e.target.value) {
      setFormData({
        ...formData,
        url: e.target.value
      });
    }
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    addJob(company_name, job_title, url, profile, location, salary, history);
    count(company_name, job_title, url);
  };

  console.log(compExist, "eeeeeeee");
  return (
    <div>
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

        <form onSubmit={onSubmitHandler} noValidate autoComplete="off">
          <div className="form-group">
            <label for="company_name">Company Name:</label>
            <input
              autoFocus
              id="company_name"
              onChange={searchHandler}
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label for="job_title">Job Title:</label>
            <input
              id="job_title"
              className="form-control"
              type="text"
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-group">
            <label for="url">URL:</label>
            <input
              id="url"
              type="text"
              name="url"
              onChange={searchHandlerUrl}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label for="location">Location:</label>
            <input
              id="location"
              type="text"
              name="location"
              onChange={onChangeHandler}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Job
          </button>
        </form>
        {/* <form onSubmit={onSubmitHandler} noValidate autoComplete="off">
          <span className={classes.error2}>{existComp}</span>
          <TextField
            autoFocus
            id="company_name"
            label="Company Name"
            margin="normal"
            onChange={searchHandler}
          />
          <TextField
            id="job_title"
            label="Job Title"
            type="text"
            margin="normal"
            onChange={onChangeHandler}
          />
          <TextField
            id="url"
            label="URL"
            type="text"
            name="url"
            margin="normal"
            onChange={searchHandlerUrl}
          />
          <span className={classes.error1}>{exist}</span>
          <br></br>
          <TextField
            id="location"
            label="Location"
            type="text"
            margin="normal"
            onChange={onChangeHandler}
          />
          <TextField
            id="salary"
            label="Salary"
            type="text"
            margin="normal"
            onChange={onChangeHandler}
          />
          <Button
            className={classes.profile}
            variant="contained"
            color="primary"
            type="submit"
          >
            Add Job
          </Button>
        </form> */}
      </div>
      {compExist.length > 0 ? (
        <div className={classes.compExist}>
          <h1 className={classes.header}>Job Alredy Exist</h1>
          <ul style={{ listStyleType: "none", textAlign: "left", margin: "0" }}>
            {compExist.map((comp, index) => {
              return (
                <Fragment>
                  <li
                    style={{
                      marginBottom: "5px",
                      fontSize: "15px",
                      display: "inline-block",
                      width: "50%"
                    }}
                  >
                    <b style={{ marginRight: "10px" }}>Company Name:</b>
                    <span>{comp.companyName}</span>
                  </li>
                  <li
                    style={{
                      marginBottom: "5px",
                      fontSize: "15px",
                      display: "inline-block",
                      width: "50%"
                    }}
                  >
                    <b style={{ marginRight: "10px" }}>URL:</b>
                    <span>{comp.url}</span>
                  </li>
                  <li
                    style={{
                      marginBottom: "5px",
                      fontSize: "15px",
                      display: "inline-block",
                      width: "50%"
                    }}
                  >
                    <b style={{ marginRight: "10px" }}>Job Title:</b>
                    <span>{comp.job_title}</span>
                  </li>
                  <li
                    style={{
                      marginBottom: "5px",
                      fontSize: "15px",
                      display: "inline-block",
                      width: "50%"
                    }}
                  >
                    <b style={{ marginRight: "10px" }}>Profile:</b>{" "}
                    <span>{comp.profile}</span>
                  </li>
                  <li
                    style={{
                      marginBottom: "5px",
                      fontSize: "15px",
                      display: "inline-block",
                      width: "50%"
                    }}
                  >
                    <b style={{ marginRight: "10px" }}> CreateAt:</b>
                    <span>{comp.createdAt}</span>
                  </li>
                  <hr></hr>
                </Fragment>
              );
            })}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

AddJob.propTypes = {
  addJob: PropTypes.func.isRequired
};

export default connect(null, { addJob })(withRouter(AddJob));
