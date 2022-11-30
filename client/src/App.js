import "./App.css";
import Header from "./components/Header/Header";
import Home from "./Pages/Home/Home";
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
import { DisplayBooks } from "./components/displayBooks";
import { Payment } from "./components/payment";
import PaymentSuccess from "./components/PaymentCuccess";

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
        <Route path="/" element={<Home />}>
          <Route path="/" element={<DisplayBooks />} />
          <Route path="payment" element={<Payment />} />
          <Route path="paymentSuccess" element={<PaymentSuccess />} />
        </Route>
        <Route
          path="login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
      </Route>
    )
  );
  return (
    <div className="App" onClick={() => setOpenSetting(false)}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
