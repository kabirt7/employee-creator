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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { clearEmployeeModal } from "../../features/modalSlice";
import { setToast } from "../../features/toastSlice";

const DashBoardContainer = () => {
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const navigate = useNavigate();

  const employeeModal = useSelector(
    (state: RootState) => state.modal.employeeModal
  );
  const dispatch = useDispatch();

  const addSubmit: (data: Employee) => void = async (data) => {
    try {
      const response = await addEmployee(data);
      console.log("Employee added:", response);
      setEmployeeList((prev) => [...prev, response]);
      dispatch(setToast("Employee added successfully!"));
      navigate("/");
    } catch (error) {
      console.error("Failed to add employee", error);
      dispatch(setToast("Failed to add employee."));
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
      dispatch(setToast("Employee updated successfully!"));
      navigate("/");
    } catch (error) {
      console.error("Failed to update employee", error);
      dispatch(setToast("Failed to update employee."));
    }
  };

  const handleDeleteEmployee = async (id: String) => {
    try {
      await deleteEmployee(id);
      setEmployeeList(employeeList.filter((emp) => emp.id.toString() !== id)); // Update
      dispatch(setToast("Employee deleted successfully!"));
      navigate("/");
    } catch (error) {
      console.error("Failed to delete employee", error);
      dispatch(setToast("Failed to delete employee."));
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
    dispatch(clearEmployeeModal());
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
