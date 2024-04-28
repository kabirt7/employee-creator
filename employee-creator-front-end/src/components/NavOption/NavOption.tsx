import { Link } from "react-router-dom";
import styles from "./NavOption.module.scss";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NavOptionProps {
  children: String;
  to: string;
  icon: IconDefinition;
}

const NavOption = ({ children, to, icon }: NavOptionProps) => {
  return (
    <Link to={to} className={styles.navOption}>
      <FontAwesomeIcon icon={icon} className={styles.navOption__icon} />
      <p>{children}</p>
    </Link>
  );
};

export default NavOption;
