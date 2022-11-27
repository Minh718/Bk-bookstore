import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import {createBrowserRouter} from "react-router-dom"
function App() {
  return (
    <div className="App">
      <Header></Header>
      <Shop></Shop>
    </div>
  );
}

export default App;
