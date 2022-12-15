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
import AdminPage from "./Pages/admin";
import HomeAdmin from "./Pages/admin/pages/home/Index";
import { Client } from "./Pages/admin/components/client/Client";
import { Order } from "./Pages/admin/components/Order/Order";
import { TypeBook } from "./Pages/admin/components/TypeBook/TypeBook";
import { Book } from "./Pages/admin/components/Book/Book";
import { AddBook } from "./Pages/admin/components/Book/AddBook";
import { AddTypeBook } from "./Pages/admin/components/TypeBook/AddTypeBook";
import { Profile } from "./Pages/Profile/Profile";
import { DetailBook } from "./Pages/DetailBook/DetailBook";
import { Orders } from "./components/orders/Orders";
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
      <Route>
        <Route path="/" element={<AppMain />}>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<DisplayBooks />} />
            <Route path="payment" element={<Payment />} />
            <Route path="paymentSuccess" element={<PaymentSuccess />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="detailBook" element={<DetailBook />} />
          <Route path="orders" element={<Orders />} />

          <Route
            path="login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />
        </Route>
        {user?.isAdmin && (
          <Route path="/adminPage" element={<AdminPage />}>
            <Route path="home" element={<HomeAdmin />} />
            <Route path="client" element={<Client />} />
            <Route path="order" element={<Order />} />
            <Route path="typeBook" element={<TypeBook />} />
            <Route path="addBook" element={<AddBook />} />
            <Route path="addTypeBook" element={<AddTypeBook />} />
            <Route path="book" element={<Book />} />
          </Route>
        )}
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
