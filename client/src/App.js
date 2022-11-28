import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./Pages/Login";
import Footer from "./components/Footer/index";
import { useGlobalContext } from "./context";

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
  const { user, setOpenSetting } = useGlobalContext();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppMain />}>
        <Route path="" element={<Home />} />
        <Route
          path="login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
      </Route>
    )
  );
  return (
    <div className="App" onClick={() => setOpenSetting(false)}>
      {/* <Header></Header>
      <Shop></Shop> */}

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
