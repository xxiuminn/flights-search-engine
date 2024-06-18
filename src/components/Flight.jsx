import React from "react";
import styles from "./Flight.module.css";

const Flight = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.flightdetails}>
        <div className={styles.depart}>
          <div className={styles.carrier}></div>
          <div className={styles.from}></div>
          <div className={styles.duration}></div>
          <div className={styles.to}></div>
        </div>
        <div className={styles.flightdetails}>
          <div className={styles.carrier}></div>
          <div className={styles.from}></div>
          <div className={styles.duration}></div>
          <div className={styles.to}></div>
        </div>
      </div>
      <div className={styles.pricedetails}></div>
    </div>
  );
};

export default Flight;
