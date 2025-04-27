import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Contact from "./Pages/Contact/Contact";
import Home from "./Pages/Home";
import AddProduct from "./Pages/Add-product";
import ProductList from "./Pages/ProductList";
import ProtectedRoute from "./utils/auth/ProtectedRoute";
import StockList from "./Pages/Stock";
import CreateStock from './Pages/Stock/create'
import Settings from "./Pages/Setting";
import EmployeeManagement from "./Pages/ManageEmployee";

const App = () => {
  return (
    <div className="relative">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="products" element={<ProductList />} />

            <Route path="stocks" element={<StockList />} />
            <Route path="stocks/create" element={<CreateStock />} />

            <Route path="settings" element={<Settings />} />
            <Route path="employee" element={<EmployeeManagement />} />



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
