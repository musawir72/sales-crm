import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NavMain from "../components/NavMain";
import HeroUnit from "../components/HeroUnit";
import CardGrid from "../components/CardGrid";

const LandingPage = ({ auth }) => {
  // if (auth) {
  //   return <Redirect to="/addpost" />;
  // }
  return (
    <React.Fragment>
      <NavMain>
        <HeroUnit />
        <CardGrid />
      </NavMain>
    </React.Fragment>
  );
};

LandingPage.propTypes = {
  auth: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  auth: state.authReducer.isAuth
});

export default connect(mapStateToProps)(LandingPage);
