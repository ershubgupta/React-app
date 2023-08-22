import "./App.css";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import MainRouter from "./MainRouter";

function App() {
  return (
    <>
      <ReactNotifications />
      <MainRouter />
    </>
  );
}

export default App;
