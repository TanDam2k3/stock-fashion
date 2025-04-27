import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Contact from "./Pages/Contact/Contact";
import Home from "./Pages/Home";
import CreateProdct from "./Pages/Products/create";
import Products from "./Pages/Products";
import ProtectedRoute from "./utils/auth/ProtectedRoute";
import Housewares from "./Pages/Houseware";
import CreateStock from './Pages/Houseware/create'
import Settings from "./Pages/Setting";
import EmployeeManagement from "./Pages/ManageEmployee";
import CreateEmployee from "./Pages/ManageEmployee/create";

const App = () => {
  return (
    <div className="relative">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="products" element={<Products />} />
            <Route path="products/create" element={<CreateProdct />} />

            <Route path="stocks" element={<Housewares />} />
            <Route path="stocks/create" element={<CreateStock />} />

            <Route path="settings" element={<Settings />} />
            <Route path="employees" element={<EmployeeManagement />} />
            <Route path="employees/create" element={<CreateEmployee />} />



            <Route path="contact" element={<Contact />} />
          </Route>
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>

      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default App;
