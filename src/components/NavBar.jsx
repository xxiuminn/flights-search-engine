import React from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className={styles.bg}>
      <div className={styles.navbar}>
        <div className={styles.brand}>
          <h2>GOOGLY FLIGHTS</h2>
        </div>
        <nav>
          <ul>
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
