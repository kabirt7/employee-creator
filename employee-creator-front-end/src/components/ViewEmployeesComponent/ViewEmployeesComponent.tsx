import styles from "./ViewEmployeesComponent.module.scss";
import EmployeeComponent from "../EmployeeComponent/EmployeeComponent";

const ViewEmployeesComponent = () => {
  return (
    <div className={styles.viewEmployees}>
      <div className={styles.viewEmployees__wrap}>
        <EmployeeComponent />
        <EmployeeComponent />
        <EmployeeComponent />
        <EmployeeComponent />
        <EmployeeComponent />
        <EmployeeComponent />
        <EmployeeComponent lastEmployee={true} />

        {/* {employeeComponents.map((item, index) => (
          <EmployeeComponent
            key={index}
            lastEmployee={index === employeeComponents.length - 1 ? true : false}
            
            CLASS NAME IS USED TO CONFIGURE THE CLASS NAME INSIDE
          
          />
        ))} */}
      </div>
    </div>
  );
};

export default ViewEmployeesComponent;
