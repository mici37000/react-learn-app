import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../modules/Home';
import EditProduct from '../modules/products/EditProduct';
import Product from '../modules/products/Product';
import "./Content.scss";

function Content() {
  return (
    <main className="content">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-product" element={<EditProduct />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default Content;