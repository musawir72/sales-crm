import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { List } from "@material-ui/core";
import axios from "axios";
import { connect } from "react-redux";
const h1 = {
  marginTop: "-45px",
  fontFamily: "serif",
  color: "white"
};

const jumbo = {
  backgroundColor: "#285151"
};
const ul = {
  fontWeight: "bold",
  fontFamily: "serif",
  fontSize: "15px"
};
const DashboardPage = ({ user }) => {
  //week state
  const [job, SetJob] = React.useState([]);
  const [lead, SetLead] = React.useState([]);
  const [goodLead, SetGoodLead] = React.useState([]);
  const [hotLead, SetHotLead] = React.useState([]);
  const [closedLead, SetClosedLead] = React.useState([]);
  const [rejectlead, SetRejectLead] = React.useState([]);

  //month state
  const [mJob, SetMJob] = React.useState([]);
  const [mLead, SetMLead] = React.useState([]);
  const [mGoodLead, SetMGoodLead] = React.useState([]);
  const [mHotLead, SetMHotLead] = React.useState([]);
  const [mClosedLead, SetMClosedLead] = React.useState([]);
  const [mRejectlead, SetMRejectLead] = React.useState([]);

  useEffect(() => {
    // jobs count
    axios.get("http://127.0.0.1:5000/api/job/status_job_count").then(res => {
      SetJob(res.data.result);
    });
    //leads count
    axios.get("http://127.0.0.1:5000/api/job/status_lead_count").then(res => {
      SetLead(res.data.result);
    });
    // good leads count
    axios
      .get("http://127.0.0.1:5000/api/job/status_good_lead_count")
      .then(res => {
        SetGoodLead(res.data.result);
      });
    // hot leads count
    axios
      .get("http://127.0.0.1:5000/api/job/status_hot_lead_count")
      .then(res => {
        SetHotLead(res.data.result);
      });
    // closed lead count
    axios
      .get("http://127.0.0.1:5000/api/job/status_closed_lead_count")
      .then(res => {
        SetClosedLead(res.data.result);
      });
    //rejected lead count
    axios
      .get("http://127.0.0.1:5000/api/job/status_rejected_lead_count")
      .then(res => {
        SetRejectLead(res.data.result);
      });

    // Previous Monthly Job Report
    axios
      .get("http://127.0.0.1:5000/api/job/status_job_monthly_count")
      .then(res => {
        SetMJob(res.data.result);
      });

    // Previous Monthly Lead Report
    axios
      .get("http://127.0.0.1:5000/api/job/status_lead_monthly_count")
      .then(res => {
        SetMLead(res.data.result);
      });

    // Previous Monthly Good Lead Report
    axios
      .get("http://127.0.0.1:5000/api/job/status_good_lead_monthly_count")
      .then(res => {
        SetMGoodLead(res.data.result);
      });

    // Previous Monthly Good Lead Report
    axios
      .get("http://127.0.0.1:5000/api/job/status_hot_lead_month_count")
      .then(res => {
        SetMHotLead(res.data.result);
      });

    // Previous Monthly Good Lead Report
    axios
      .get("http://127.0.0.1:5000/api/job/status_closed_lead_monthly_count")
      .then(res => {
        SetMClosedLead(res.data.result);
      });

    // Previous Monthly Good Lead Report
    axios
      .get("http://127.0.0.1:5000/api/job/status_rejected_lead_monthly_count")
      .then(res => {
        SetMRejectLead(res.data.result);
      });
  }, []);

  if (user) {
    for (var i = 0; i < user.length; i++) {
      var raceName = user[i].role;
      var name = user[i].name;
    }
  }
  return (
    <React.Fragment>
      {raceName == "super_admin" ? (
        <div class="row">
          <div class="col-md-5 offset-md-1">
            <div style={jumbo} class="jumbotron jumbotron-fluid">
              <h1 style={h1} class="text-center">
                Previous Week Report
              </h1>
              <ul style={ul} class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Total Applied Job
                  <span class="badge badge-primary badge-pill">
                    {job.length}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Total Leads
                  <span class="badge badge-primary badge-pill">
                    {lead.length}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Total Good Leads
                  <span class="badge badge-primary badge-pill">
                    {goodLead.length}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Total Hot Leads
                  <span class="badge badge-primary badge-pill">
                    {hotLead.length}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Total Closed Leads
                  <span class="badge badge-primary badge-pill">
                    {closedLead.length}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Total Rejected Leads
                  <span class="badge badge-primary badge-pill">
                    {rejectlead.length}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-md-5">
            <div style={jumbo} class="jumbotron jumbotron-fluid">
              <h1 style={h1} class="text-center">
                Previous Month Report
              </h1>
              <ul style={ul} class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Total Applied Job
                  <span class="badge badge-primary badge-pill">
                    {mJob.length}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Total Leads
                  <span class="badge badge-primary badge-pill">
                    {mLead.length}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Total Good Leads
                  <span class="badge badge-primary badge-pill">
                    {mGoodLead.length}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Total Hot Leads
                  <span class="badge badge-primary badge-pill">
                    {mHotLead.length}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Total Closed Leads
                  <span class="badge badge-primary badge-pill">
                    {mClosedLead.length}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Total Rejected Leads
                  <span class="badge badge-primary badge-pill">
                    {mRejectlead.length}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <h1>Welcome "{name}" to Sales CRM</h1>
      )}
    </React.Fragment>
  );
};
const mapStateToProps = state => ({
  user: state.authReducer.user
});
export default connect(mapStateToProps, {})(DashboardPage);
