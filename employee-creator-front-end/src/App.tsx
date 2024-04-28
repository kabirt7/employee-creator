import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import DashBoardContainer from "./containers/DashBoardContainer/DashBoardContainer";
import { store } from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <DashBoardContainer />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
