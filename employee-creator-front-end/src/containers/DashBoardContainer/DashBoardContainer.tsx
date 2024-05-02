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
import Button from "../../components/Button/Button";
import Home from "../../components/Home/Home";

const DashBoardContainer = () => {
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const [originalList, setOriginalList] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedAndFilteredEmployees, setSortedAndFilteredEmployees] = useState<
    Employee[]
  >([]);

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
      setOriginalList((prev) => [...prev, response]);
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
      setOriginalList((prev) =>
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
        const transformedEmployees = employees.map((employee) => ({
          ...employee,
          hoursPerWeek: employee.hoursPerWeek.toString(),
          mobileNumber: employee.mobileNumber.toString(),
        }));
        setEmployeeList(transformedEmployees);
        setOriginalList(transformedEmployees);
      } catch (error) {
        console.error("Failed to fetch employees", error);
      }
    };

    fetchEmployees();
  }, [employeeList.length]);

  const onClose = () => {
    dispatch(clearEmployeeModal());
  };

  const [sortType, setSortType] = useState<"Name" | "Date" | "Sort">("Sort");

  const sortEmployees = () => {
    if (sortType === "Sort") {
      setSortType("Name");
    } else if (sortType === "Name") {
      setSortType("Date");
    } else if (sortType === "Date") {
      setSortType("Sort");
    }
  };

  const bannerClass = `${styles.banner__wrap} ${
    pageTitle !== "Dashboard" ? styles.banner__wrap__centred : ""
  }`.trim();

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const applySorting = (list: Employee[]) => {
    if (sortType === "Name") {
      return [...list].sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (sortType === "Date") {
      return [...list].sort((a, b) => a.startDate.localeCompare(b.startDate));
    }
    return list;
  };

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = originalList.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(lowerCaseQuery) ||
        employee.lastName.toLowerCase().includes(lowerCaseQuery) ||
        employee.email.toLowerCase().includes(lowerCaseQuery) ||
        employee.department.toLowerCase().includes(lowerCaseQuery) ||
        employee.jobTitle.toLowerCase().includes(lowerCaseQuery)
    );

    const sorted = applySorting(filtered);
    setSortedAndFilteredEmployees(sorted);
  }, [searchQuery, originalList, sortType, employeeList]);

  const titleClass = `${
    pageTitle === "Dashboard"
      ? styles.banner__wrap__title__home
      : styles.banner__wrap__title__other
  }`.trim();

  return (
    <>
      <div className={styles.banner}>
        <div className={bannerClass}>
          {pageTitle === "Dashboard" && (
            <input
              type="search"
              placeholder="Search employees..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles.banner__search}
            />
          )}
          <p className={titleClass}>{pageTitle}</p>
          {pageTitle === "Dashboard" && (
            <Button onClick={sortEmployees}>{sortType}</Button>
          )}
        </div>
      </div>
      <main className={styles.dashboard}>
        <Routes>
          <Route
            path="/"
            element={
              <ViewEmployeesComponent
                setPageTitle={setPageTitle}
                employeeList={sortedAndFilteredEmployees}
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
          <Route path="/home" element={<Home setPageTitle={setPageTitle} />} />
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
