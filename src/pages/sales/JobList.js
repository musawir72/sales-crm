import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import AddJob from "./AddJob";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useAlert } from "react-alert";
import { fetchJob } from "../../actions/job";
import axios from "axios";
const BASE_URL = REACT_APP_BASE_URL;
const columns = [
  { id: "name", label: "Company Name", minWidth: 170 },
  { id: "code", label: "Job Title", minWidth: 100, align: "center" },
  { id: "code", label: "URL", minWidth: 100, align: "center" },
  {
    id: "population",
    label: "Profile",
    minWidth: 170,
    align: "center",
    format: value => value.toLocaleString()
  },
  {
    id: "size",
    label: "Location",
    minWidth: 170,
    align: "right",
    format: value => value.toLocaleString()
  },

  {
    id: "density",
    label: "Status",
    minWidth: 170,
    align: "right",
    format: value => value.toFixed(2)
  },
  {
    id: "density",
    label: "Applied Date",
    minWidth: 170,
    align: "right",
    format: value => value.toFixed(2)
  }
];

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  tableWrapper: {
    overflow: "auto"
  },
  jobHeader: {
    textAlign: "center",
    fontFamily: "initial",
    color: "blue"
  }
});
const jobList = ({ fetchJob, job }) => {
  const alert = useAlert();
  const [dailyJob, setDailyJob] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchJob();
    axios.get(BASE_URL + "/api/job/user_daily_job_created").then(res => {
      setDailyJob(res.data.result);
    });
  }, []);

  console.log(dailyJob, "dailyyyyyyyy");
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const countAdd = (company_name, job_title, url) => {
    dailyJob.push({
      companyName: company_name,
      job_title,
      url
    });
    if (company_name && url) {
      alert.success("Job Successfully Added !");
    }
  };

  return (
    <Paper className={classes.root}>
      <AddJob job={job} count={countAdd} />
      <div className={classes.tableWrapper}>
        <h1 className={classes.jobHeader}>Job List</h1>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dailyJob
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow
                    className={
                      row.status == "job"
                        ? classes.job
                        : row.status === "lead"
                        ? classes.lead
                        : ""
                    }
                    key={row.id}
                  >
                    <TableCell component="th" scope="row">
                      {row.companyName}
                    </TableCell>

                    <TableCell align="right">{row.job_title}</TableCell>
                    <TableCell align="right">{row.url}</TableCell>
                    <TableCell align="right">{row.profile}</TableCell>
                    <TableCell align="right">{row.location}</TableCell>

                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="right">{row.createdAt}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={dailyJob.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "previous page"
        }}
        nextIconButtonProps={{
          "aria-label": "next page"
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

const mapStateToProps = state => ({
  job: state.JobReducer.job
});
jobList.propTypes = {
  fetchJob: PropTypes.func.isRequired,
  job: PropTypes.array.isRequired
};

export default connect(mapStateToProps, { fetchJob })(jobList);
