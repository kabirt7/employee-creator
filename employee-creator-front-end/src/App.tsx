import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import DashBoardContainer from "./containers/DashBoardContainer/DashBoardContainer";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <DashBoardContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
