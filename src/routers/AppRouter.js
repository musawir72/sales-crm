import React, { Fragment } from "react";
import { Router, Route, Switch } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import LandingPage from "../pages/LandingPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import DashboardPage from "../pages/DashboardPage";
import AddPostPage from "../pages/AddPostPage";
import Alert from "../pages/Alert";
import JobList from "../pages/sales/JobList";
import AdminJobList from "../pages/sales/adminJobList";
import EditJob from "../pages/sales/JobEdit";
import SalesDetails from "../pages/sales/salesDetail";
import UserList from "../pages/sales/UserList";
import EditUser from "../pages/sales/EditUser";
import LeadsList from "../pages/sales/leads/LeadList";
import LeadDetails from "../pages/sales/leads/LeadDetails";
import EditLead from "../pages/sales/leads/LeadEdit";
import MyLeads from "../pages/sales/leads/MyLead";
import LeadSchedule from "../pages/sales/leads/LeadCallList";
import UserReport from "../pages/sales/user/UserReport";
import UserDetails from "../pages/sales/user/UserDetails";
const history = createBrowserHistory();

export default () => {
  return (
    <Fragment>
      <Alert />
      <Router history={history}>
        <Switch>
          <PublicRoute exact path="/" component={SignInPage} />
          <PublicRoute exact path="/signup" component={SignUpPage} />
          <PrivateRoute exact path="/dashboard" component={DashboardPage} />
          <PrivateRoute exact path="/addpost" component={AddPostPage} />
          <PrivateRoute exact exact path="/user_list" component={UserList} />
          <PrivateRoute exact path="/edit" component={EditUser} />
          <PrivateRoute exact path="/job_list" component={JobList} />
          <PrivateRoute exact path="/admin_job_list" component={AdminJobList} />
          <PrivateRoute exact path="/job_edit" component={EditJob} />
          <PrivateRoute
            exact
            path="/sales_daily_details"
            component={SalesDetails}
          />
          <PrivateRoute exact path="/leads_list" component={LeadsList} />
          <PrivateRoute exact path="/lead_details" component={LeadDetails} />
          <PrivateRoute exact path="/lead_edit" component={EditLead} />
          <PrivateRoute exact path="/my_leads" component={MyLeads} />
          <PrivateRoute exact path="/lead_scedule" component={LeadSchedule} />
          <PrivateRoute exact path="/user_report" component={UserReport} />
          <PrivateRoute exact path="/user_details" component={UserDetails} />
        </Switch>
      </Router>
    </Fragment>
  );
};
