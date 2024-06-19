import React from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className={styles.navbar}>
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
    </header>
  );
};

export default NavBar;
