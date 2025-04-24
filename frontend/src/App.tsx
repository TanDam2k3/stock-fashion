import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Contact from "./Pages/Contact/Contact";
import Home from "./Pages/Home";
import AddProduct from "./Pages/Add-product";
import AddStock from "./Pages/Add-stock";
import ProductList from "./Pages/Stock";
import ProtectedRoute from "./utils/auth/ProtectedRoute";

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
            <Route path="add-stock" element={<AddStock />} />
            <Route path="products" element={<ProductList />} />
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
