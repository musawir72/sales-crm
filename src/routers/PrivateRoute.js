import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NavMain from "../components/NavMain";

export const PrivateRoute = ({ auth, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth ? (
        <NavMain>
          <Component {...props} />
        </NavMain>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  auth: state.authReducer.isAuth
});

export default connect(mapStateToProps)(PrivateRoute);
