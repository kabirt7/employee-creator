import styles from "./ViewEmployeesComponent.module.scss";
import EmployeeComponent from "../EmployeeComponent/EmployeeComponent";
import { useEffect } from "react";
import { Employee } from "../../services/interfaces";

interface ViewEmployeesComponentProps {
  setPageTitle: Function;
  setEmployeeModal: Function;
  employeeList: Employee[] | null;
}

const ViewEmployeesComponent = ({
  setPageTitle,
  setEmployeeModal,
  employeeList,
}: ViewEmployeesComponentProps) => {
  useEffect(() => {
    setPageTitle("Dashboard");
  }, []);

  return (
    <div className={styles.viewEmployees}>
      <div className={styles.viewEmployees__wrap}>
        {employeeList &&
          employeeList.map((employee, index) => (
            <EmployeeComponent
              key={index}
              employee={employee}
              click={(selectedEmployee) => {
                console.log(selectedEmployee);
                setEmployeeModal(selectedEmployee);
              }}
              lastEmployee={
                employeeList.length % 3 === 2
                  ? index === employeeList.length - 1 ||
                    index === employeeList.length - 2
                    ? true
                    : false
                  : employeeList.length % 3 === 1
                  ? index === employeeList.length - 1
                    ? true
                    : false
                  : false
              }
            />
          ))}
      </div>
    </div>
  );
};

export default ViewEmployeesComponent;
