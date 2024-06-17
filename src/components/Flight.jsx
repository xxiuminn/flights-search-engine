import React from "react";
import styles from "./Flight.module.css";

const Flight = (props) => {
  return (
    <div className={`container ${styles.flight}`}>
      <div className="row">
        <div className="col-sm-1">image</div>
        <div className="col-sm-4">flight timings</div>
        <div className="col-sm-2">flight duration</div>
        <div className="col-sm-2">number of stops</div>
        <div className="col-sm-3">price</div>
      </div>
    </div>
  );
};

export default Flight;
