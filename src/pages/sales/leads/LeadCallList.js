import React, { useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Badge from "@material-ui/core/Badge";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { useAlert } from "react-alert";
const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  center: {
    textAlign: "center"
  },
  text: {
    padding: "28px",
    fontFamily: "initial",
    fontSize: "18px",
    fontWeight: "bold"
  }
});

export default function salesDetail({ history }) {
  const [data, SetData] = React.useState([]);
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/job/lead_scedule").then(res => {
      SetData(res.data.result);
    });
  }, [count]);

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <h1 className={classes.center}>Leads Scheduler</h1>

      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Call Time</TableCell>
            <TableCell>Time Zone</TableCell>
            <TableCell>Call Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow>
              <TableCell>{row.leadId.name}</TableCell>
              <TableCell>{row.call_time}</TableCell>
              <TableCell>{row.time_zone}</TableCell>

              <TableCell>{row.call_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
