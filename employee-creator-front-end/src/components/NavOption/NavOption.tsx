import styles from "./NavOption.module.scss";

interface NavOptionProps {
  children: String;
}

const NavOption = ({ children }: NavOptionProps) => {
  return (
    <div className={styles.navOption}>
      <img src="fnkl.jpg" alt="" />
      <p>{children}</p>
    </div>
  );
};

export default NavOption;
