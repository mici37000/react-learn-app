import { Routes, Route } from "react-router-dom";
import Home from "../modules/Home";
import Login from "../modules/auth/Login";
import EditProduct from "../modules/products/EditProduct";
import Product from "../modules/products/Product";
import ProductList from "../modules/products/ProductList";
import "./Content.scss";

function Content() {
  return (
    <main className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit-product" element={<EditProduct />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </main>
  );
}

export default Content;
