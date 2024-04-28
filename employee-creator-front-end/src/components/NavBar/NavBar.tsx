import styles from "./NavBar.module.scss";
import NavOption from "../NavOption/NavOption";
import logoImage from "../../assets/empLogo__white.png";
import { faColumns, faAdd } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  return (
    <section className={styles.navBar}>
      <div className={styles.navBar__title}>
        <img src={logoImage} />
        <h3>EMPLO</h3>
      </div>
      <NavOption to="/" icon={faColumns}>
        Dashboard
      </NavOption>
      <NavOption to="/add" icon={faAdd}>
        Add
      </NavOption>
    </section>
  );
};

export default NavBar;
