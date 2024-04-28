import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";
import ViewEmployeesComponent from "../../components/ViewEmployeesComponent/ViewEmployeesComponent";
import Modal from "../../components/Modal/Modal";
import { Employee } from "../../services/interfaces";
import {
  addEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
} from "../../services/logic";
import { FormType } from "../../services/enums";
import styles from "./DashBoardContainer.module.scss";

const DashBoardContainer = () => {
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [employeeModal, setEmployeeModal] = useState<Employee | null>(null);
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const navigate = useNavigate();

  const addSubmit: (data: Employee) => void = async (data) => {
    try {
      const response = await addEmployee(data);
      console.log("Employee added:", response);
      setEmployeeList((prev) => [...prev, response]);
      alert("Employee added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to add employee", error);
      alert("Failed to add employee.");
    }
  };

  const editSubmit: (data: Employee, id?: string) => void = async (
    data,
    id
  ) => {
    if (!id) return;
    try {
      const response = await updateEmployee(data, id);
      const employeeId = id ? parseInt(id, 10) : undefined;
      console.log("Employee updated:", response);
      setEmployeeList((prev) =>
        prev.map((emp) => (emp.id === employeeId ? response : emp))
      );
      alert("Employee updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to update employee", error);
      alert("Failed to update employee.");
    }
  };

  const handleDeleteEmployee = async (id: String) => {
    try {
      await deleteEmployee(id);
      setEmployeeList(employeeList.filter((emp) => emp.id.toString() !== id)); // Update
      alert("Employee deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete employee", error);
      alert("Failed to delete employee.");
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employees = await getAllEmployees();
        setEmployeeList(employees);
      } catch (error) {
        console.error("Failed to fetch employees", error);
      }
    };

    fetchEmployees();
  }, [ViewEmployeesComponent]);

  const onClose = () => {
    setEmployeeModal(null);
  };

  return (
    <>
      <div className={styles.banner}>{pageTitle}</div>
      <main className={styles.dashboard}>
        <Routes>
          <Route
            path="/"
            element={
              <ViewEmployeesComponent
                setPageTitle={setPageTitle}
                setEmployeeModal={setEmployeeModal}
                employeeList={employeeList}
              />
            }
          />
          <Route
            path="/add"
            element={
              <Form
                setPageTitle={setPageTitle}
                onSubmit={addSubmit}
                type={FormType.ADD}
              />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <Form
                setPageTitle={setPageTitle}
                onSubmit={editSubmit}
                type={FormType.EDIT}
                employeeList={employeeList}
                deleteEmployee={handleDeleteEmployee}
              />
            }
          />
        </Routes>
        {employeeModal && <Modal data={employeeModal} onClose={onClose} />}
      </main>
    </>
  );
};

export default DashBoardContainer;
