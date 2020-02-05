import React, { useEffect } from "react";
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
  const [open, setOpen] = React.useState(false);
  const alert = useAlert();
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/job/my_leads").then(res => {
      SetData(res.data.result);
    });
  }, [count]);

  const callHandleChange = e => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({
      id: e.target.name,
      lead_status: e.target.value
    });
    try {
      const res = axios
        .post(BASE_URL + "/api/job/lead_status", body, config)
        .then(response => {
          alert.success(" Lead Status Changed !");
          setCount(count + 1);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <h1 className={classes.center}>My Leads</h1>

      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Company Name</TableCell>
            <TableCell>Client Name</TableCell>
            <TableCell>Profile</TableCell>
            <TableCell>Call Date</TableCell>
            <TableCell>Call Time</TableCell>
            <TableCell>Time Zone</TableCell>
            <TableCell>Call Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow hover key={row.id}>
              <TableCell
                component="th"
                scope="row"
                onClick={() =>
                  history.push({
                    pathname: "/lead_details",
                    state: { detail: row }
                  })
                }
              >
                {row.companyName}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                onClick={() =>
                  history.push({
                    pathname: "/lead_details",
                    state: { detail: row }
                  })
                }
              >
                {row.client_name}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                onClick={() =>
                  history.push({
                    pathname: "/lead_details",
                    state: { detail: row }
                  })
                }
              >
                {row.profile}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                onClick={() =>
                  history.push({
                    pathname: "/lead_details",
                    state: { detail: row }
                  })
                }
              >
                {row.call_date}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                onClick={() =>
                  history.push({
                    pathname: "/lead_details",
                    state: { detail: row }
                  })
                }
              >
                {row.call_time}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                onClick={() =>
                  history.push({
                    pathname: "/lead_details",
                    state: { detail: row }
                  })
                }
              >
                {row.time_zone}
              </TableCell>
              <TableCell>
                <Select
                  labelId="demo-controlled-open-select-label"
                  name={row.id}
                  value={row.lead_status}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  onChange={callHandleChange}
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value="done">Done</MenuItem>
                  <MenuItem value="not done">Not Done</MenuItem>
                  <MenuItem value="Need to Rescedule">
                    Need To Reschedule
                  </MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
