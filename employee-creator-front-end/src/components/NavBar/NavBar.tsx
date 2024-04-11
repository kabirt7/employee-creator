import React from "react";
import styles from "./NavBar.module.scss";
import logo from "../../assets/logo.jpeg";
import NavOption from "../NavOption/NavOption";

const NavBar = () => {
  return (
    <section className={styles.navBar}>
      <div className={styles.navBar__title}>
        <img src="dsfsdff.jpg" />
        <h3>EMPLO</h3>
      </div>
      <NavOption>Title</NavOption>
      <NavOption>Title</NavOption>
      <NavOption>Title</NavOption>
      <NavOption>Title</NavOption>
      <NavOption>Title</NavOption>
    </section>
  );
};

export default NavBar;
