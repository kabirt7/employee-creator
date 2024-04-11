import styles from "./EmployeeComponent.module.scss";

type EmployeeComponentProps = {
  lastEmployee?: boolean;
};

const EmployeeComponent = ({ lastEmployee }: EmployeeComponentProps) => {
  return (
    <article
      className={`${styles.employee} ${
        lastEmployee ? styles.employee__last : ""
      }`}
    >
      <img src="nkd.png" />
      <div className={styles.employee__headerBox}>
        <h2>John Smith</h2>
        <h3>Branch Manager</h3>
      </div>
      <div className={styles.employee__infoBox}>
        <div className={styles.employee__infoBox__topRow}>
          <div className={styles.employee__infoBox__topRow__department}>
            <p className={styles.infoTitle}> Department</p>
            <p>Marketing</p>
          </div>
          <div className={styles.employee__infoBox__topRow__dateHired}>
            <p className={styles.infoTitle}>Date Hired</p>
            <p>31/07/15</p>
          </div>
        </div>
        <div className={styles.employee__infoBox__bottomRow}>
          <p>email: josmith@hotmail.com</p>
          <p>phone: +61 468 625 100</p>
        </div>
      </div>
    </article>
  );
};

export default EmployeeComponent;
