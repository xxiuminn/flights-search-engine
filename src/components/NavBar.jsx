import React from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className={styles.bg}>
      <div className={styles.navbar}>
        <div className={styles.brand}>
          {/* <div className={styles.logo}></div> */}
          <h2>Googly Flights</h2>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/main"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/flights"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Flights
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/saved"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Saved
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
