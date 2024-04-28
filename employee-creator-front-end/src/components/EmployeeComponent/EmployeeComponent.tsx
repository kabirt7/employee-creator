import { Employee } from "../../services/interfaces";
import styles from "./EmployeeComponent.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

type EmployeeComponentProps = {
  lastEmployee?: boolean;
  employee: Employee;
  click: (employee: Employee) => void;
};

const EmployeeComponent = ({
  employee,
  lastEmployee,
  click,
}: EmployeeComponentProps) => {
  const handleClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    console.log(event.target);
    const target = event.target as HTMLButtonElement;
    console.log("Clicked element ID:", target);

    click(employee);
  };

  const editHandleClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.stopPropagation();
  };

  return (
    <article
      className={`${styles.employee} ${
        lastEmployee ? styles.employee__last : ""
      }`}
      onClick={handleClick}
    >
      <img src={employee.photoLink} />
      <div className={styles.employee__headerBox}>
        <h2>
          {employee.firstName} {employee.lastName}
        </h2>
        <h3>{employee.jobTitle}</h3>
      </div>
      <div className={styles.employee__infoBox}>
        <div className={styles.employee__infoBox__topRow}>
          <div className={styles.employee__infoBox__topRow__department}>
            <p className={styles.infoTitle}>Department</p>
            <p>Marketing</p>
          </div>
          <div className={styles.employee__infoBox__topRow__dateHired}>
            <p className={styles.infoTitle}>Date Hired</p>
            <p>{employee.startDate}</p>
          </div>
        </div>
        <div className={styles.employee__infoBox__bottomRow}>
          <p>{employee.email}</p>
          <p>{employee.mobileNumber.toString()}</p>
        </div>
      </div>
      <Link
        to={`/edit/${employee.id}`}
        onClick={editHandleClick}
        className={styles.employee__editIcon}
      >
        <FontAwesomeIcon
          icon={faEdit}
          id="editButton"
          className={styles.employee__editIcon__image}
        />
      </Link>
    </article>
  );
};

export default EmployeeComponent;
