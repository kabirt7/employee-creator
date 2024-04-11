import Form from "../../components/Form/Form";
import ViewEmployeesComponent from "../../components/ViewEmployeesComponent/ViewEmployeesComponent";
import styles from "./DashBoardContainer.module.scss";
import { Routes, Route } from "react-router-dom";

const DashBoardContainer = () => {
  return (
    <>
      <div className={styles.banner}></div>
      <main className={styles.dashboard}>
        <Routes>
          <Route path="/" element={<ViewEmployeesComponent />}></Route>
          <Route path="/add" element={<Form />}></Route>
          <Route path="/edit/:id" element={<Form />}></Route>
        </Routes>
      </main>
    </>
  );
};

export default DashBoardContainer;
