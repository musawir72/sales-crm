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
import { fetchUser } from "../../actions/user";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { deleteUser } from "../../actions/user";
import { Redirect } from "react-router-dom";
import { useAlert } from "react-alert";

const columns = [
  {
    id: "Designation",
    label: "Registration Number",
    minWidth: 100,

    format: value => value.toLocaleString()
  },
  {
    id: "Designation",
    label: "Name",
    minWidth: 100,
    align: "right",
    format: value => value.toLocaleString()
  },
  {
    id: "Designation",
    label: "Designation",
    minWidth: 170,
    align: "right",
    format: value => value.toLocaleString()
  },
  {
    id: "Designation",
    label: "Role",
    minWidth: 170,
    align: "right",
    format: value => value.toLocaleString()
  },
  {
    id: "Designation",
    label: "Created At",
    minWidth: 170,
    align: "right",
    format: value => value.toLocaleString()
  },
  {
    id: "Action",
    label: "Action",
    minWidth: 170,
    align: "right",
    format: value => value.toLocaleString()
  }
];

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  tableWrapper: {
    maxHeight: 622,
    overflow: "auto"
  },
  jobHeader: {
    textAlign: "center",
    fontFamily: "initial",
    color: "blue"
  },
  delete: {
    backgroundColor: "red,"
  }
});

const userList = ({ fetchUser, users, deleteUser, history }) => {
  //const alert = useAlert();
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchUser();
  }, [count]);

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

  const userDelete = id => {
    deleteUser(id);
    setCount(count + 1);
    alert.success("User Deleted !");
  };

  return (
    <Paper className={classes.root}>
      <h1 className={classes.jobHeader}>User List</h1>
      <div className={classes.tableWrapper}>
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
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow hover key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.registrationNumber}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.designation}</TableCell>
                    <TableCell align="right">{row.role}</TableCell>
                    <TableCell align="right">{row.createdAt}</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="delete">
                        <DeleteIcon
                          fontSize="large"
                          onClick={() => userDelete(row.registrationNumber)}
                        />
                      </IconButton>

                      <IconButton aria-label="edit">
                        <EditIcon
                          fontSize="large"
                          onClick={() =>
                            history.push({
                              pathname: "/edit",
                              state: { detail: row }
                            })
                          }
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.length}
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
  users: state.userReducer.users
});
userList.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  deleteUser: PropTypes.func.isRequired
};
//
export default connect(mapStateToProps, { fetchUser, deleteUser })(userList);
