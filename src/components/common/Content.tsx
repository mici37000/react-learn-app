import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../modules/Home';
import EditProduct from '../modules/products/EditProduct';
import Product from '../modules/products/Product';
import "./Content.scss";
import Form from '../modules/form/form';

function Content() {
  return (
    <main className="content">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-product" element={<EditProduct />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="form" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default Content;