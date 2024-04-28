import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import DashBoardContainer from "./containers/DashBoardContainer/DashBoardContainer";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Toast from "./components/Toast/Toast";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <DashBoardContainer />
          <Toast />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
