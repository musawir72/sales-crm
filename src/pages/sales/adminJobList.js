import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import { CsvDataService } from "./exportCsv";
import FilterListIcon from "@material-ui/icons/FilterList";
import { fetchJob } from "../../actions/job";
import { connect } from "react-redux";
import { deleteJob } from "../../actions/job";
import { useAlert } from "react-alert";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import GetAppIcon from "@material-ui/icons/GetApp";
import TextField from "@material-ui/core/TextField";
const BASE_URL = REACT_APP_BASE_URL;
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Username"
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "Company Name"
  },
  { id: "fat", numeric: true, disablePadding: false, label: "URL" },
  { id: "carbs", numeric: true, disablePadding: false, label: "Status" },
  { id: "protein", numeric: true, disablePadding: false, label: "Action" }
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: "1 1 100%"
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected, deleteJob, exportData } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Job List
        </Typography>
      )}

      {numSelected > 0 ? (
        <Fragment>
          <Tooltip title="Delete" onClick={deleteJob}>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Export" onClick={exportData}>
            <IconButton aria-label="export">
              <GetAppIcon />
            </IconButton>
          </Tooltip>
        </Fragment>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  deleteJob: PropTypes.func.isRequired,
  exportData: PropTypes.func.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: "auto"
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  },
  textField: {
    marginTop: "12px",
    marginRight: "22px",
    width: "100%"
  },
  job: {
    backgroundColor: "white",
    fontFamily: "monospace"
  },
  lead: {
    backgroundColor: "#008000bf",
    fontFamily: "monospace"
  }
}));

const adminjobList = ({ deleteJob, history }) => {
  const alert = useAlert();
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [match, setMatch] = useState("Search");
  const [count, setCount] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [job, setJob] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL + "/api/job").then(res => {
      setJob(res.data.result);
    });
  }, [count]);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = job.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = event => {
    setDense(event.target.checked);
  };

  const handleDelete = () => {
    var confirm = window.confirm("Do you want to Delete this Items ?");
    if (confirm == true) {
      const filteredItems = job.filter(item => !selected.includes(item.id));
      setJob(filteredItems);
      deleteJob(selected);
      alert.success("Job Successfully Deleted !");
    }
  };

  const ExportHandler = () => {
    const exportItems = job.filter(item => selected.includes(item.id));
    var download = [];

    exportItems.forEach(user => {
      download.push({
        UserName: user.user.name,
        CompanyName: user.companyName,
        JobTitle: user.job_title,
        URL: user.url,
        Profile: user.profile,
        Status: user.status
      });
    });

    CsvDataService.exportToCsv("jobList.csv", download);
  };

  const searchHandler = e => {
    let lists = job;
    console.log("search", lists);
    if (e.target.value) {
      const newList = lists.filter(item => {
        const list = item.companyName.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return list.includes(filter);
      });
      if (newList.length > 0) {
        console.log("in newlist", lists);
        setJob(newList);
        setMatch("Match");
      } else {
        setCount(count + 1);
        setMatch("Does not Match");
      }
    } else {
      setCount(count + 1);
      setMatch("Search");
    }
  };

  const handleChange = e => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({
      id: e.target.name,
      status: e.target.value
    });
    try {
      const res = axios
        .post(BASE_URL + "/api/job/changed_staus", body, config)
        .then(response => {
          alert.success("Job Status Changed !");
          setCount(count + 1);
          setSelected("");
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const isSelected = id => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, job.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <TextField
        id="search"
        label={match}
        margin="normal"
        type="text"
        className={classes.textField}
        placeholder="Search by Company Name ...."
        onChange={searchHandler}
      />
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          deleteJob={handleDelete}
          exportData={ExportHandler}
        />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={job.length}
            />
            <TableBody>
              {stableSort(job, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      onClick={event => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      className={
                        row.status == "job"
                          ? classes.job
                          : row.status === "lead"
                          ? classes.lead
                          : " "
                      }
                      key={row.id}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.jobId.name}
                      </TableCell>
                      <TableCell>{row.companyName}</TableCell>
                      <TableCell>{row.url}</TableCell>
                      <TableCell>
                        <Select
                          labelId="demo-controlled-open-select-label"
                          name={row.id}
                          key={index}
                          onClose={handleClose}
                          onOpen={handleOpen}
                          value={row.status}
                          onChange={handleChange}
                        >
                          <MenuItem value=""></MenuItem>
                          <MenuItem value="job">Job</MenuItem>
                          <MenuItem value="lead">Lead</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <IconButton aria-label="edit">
                          <EditIcon
                            fontSize="large"
                            onClick={() =>
                              history.push({
                                pathname: "/job_edit",
                                state: { detail: row }
                              })
                            }
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={job.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
};
const mapStateToProps = state => ({
  job: state.JobReducer.job
});
adminjobList.propTypes = {
  fetchJob: PropTypes.func,
  deleteJob: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { fetchJob, deleteJob })(adminjobList);
