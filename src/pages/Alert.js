import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import "./alert.css";

const divStyle = {
  padding: "10px 0px 10px 28px",
  width: "405px",
  opacity: "0.9",
  color: "white",
  background: "red",
  position: "absolute",
  top: "34px",
  left: "561px",
  zIndex: "11111",
  border: "5px solid #780c0c",
  borderRadius: "20px",
  zIndex: "10000"
};
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 && (
    <ul style={divStyle} key={alert.id}>
      {alerts.map(alert => (
        <li> {alert.msg}</li>
      ))}
    </ul>
  );

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  alerts: state.alertReducer
});

export default connect(mapStateToProps)(Alert);
