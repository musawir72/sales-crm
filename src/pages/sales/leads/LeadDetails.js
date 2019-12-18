import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import Pdf from "react-to-pdf";
const ref = React.createRef();

const useStyles = makeStyles(theme => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0
    },
    li: {
      listStyle: "none"
    }
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: "wrap"
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[700]
        : theme.palette.grey[200]
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
    fontSize: "2rem"
  },
  card: {
    maxWidth: "623px",
    margin: "0 auto"
  },
  cardHeader1: {
    border: "2px solid #000",
    marginBottom: "23px",
    padding: "10px"
  },
  cardBody1: {
    border: "1px solid #000"
  },
  cardContentRight: {
    padding: "20px",
    borderRight: "1px solid"
  },
  cardContentLeft: {
    padding: "20px"
  },
  cardContentInner: {
    marginBottom: "8px"
  }
}));

const Pricing = ({ history, location }) => {
  const classes = useStyles();

  const [formData, setFormData] = React.useState(location.state.detail);
  return (
    <React.Fragment>
      <div class="container">
        <Pdf targetRef={ref} filename="code-example.pdf">
          {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
        </Pdf>
        <div class="card" className={classes.card} ref={ref}>
          <div class="card-header" className={classes.cardHeader1}>
            <strong>Appllied at :</strong>
            {formData.createdAt}

            <span class="float-right">
              <strong>Status:</strong> {formData.status}
            </span>
          </div>
          <div class="card-body" className={classes.cardBody1}>
            <div class="row">
              <div class="col-sm-6">
                <div className={classes.cardContentRight}>
                  <div className={classes.cardContentInner}>
                    <strong>Name :</strong>
                    {formData.client_name}
                  </div>
                  <div className={classes.cardContentInner}>
                    <b>Company Name :</b>
                    {formData.companyName}
                  </div>
                  <div className={classes.cardContentInner}>
                    <b>Location :</b>
                    {formData.location}
                  </div>
                  <div className={classes.cardContentInner}>
                    <b>Email:</b> {formData.email}
                  </div>
                  <div className={classes.cardContentInner}>
                    <b>Website:</b> {formData.website}
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div className={classes.cardContentLeft}>
                  <div className={classes.cardContentInner}>
                    <strong>Phone Number:</strong>
                    {formData.phone_number}
                  </div>
                  <div className={classes.cardContentInner}>
                    <strong>Call Time:</strong>
                    {formData.call_time}
                  </div>
                  <div className={classes.cardContentInner}>
                    <b>Time Zone:</b>
                    {formData.time_zone}
                  </div>
                  <div className={classes.cardContentInner}>
                    <b>Call Status:</b>
                    {formData.call_status}
                  </div>
                  <div className={classes.cardContentInner}>
                    <b>Lead Status:</b>
                    {formData.lead_status}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Pricing;
