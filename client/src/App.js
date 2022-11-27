import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./Pages/Login";
import Footer from "./components/Footer/index";

const AppMain = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppMain />}>
        <Route path="" element={<Shop />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    )
  );
  return (
    <div className="App">
      {/* <Header></Header>
      <Shop></Shop> */}

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
