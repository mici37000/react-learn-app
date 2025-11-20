import { useState } from "react";
import type { Product } from "./interfaces";
import { categories, manufacturers } from "./constants";
import "./EditProduct.scss";

function EditProduct() {
  const [formData, setFormData] = useState<Product>({
    id: "",
    category: "",
    manufacturer: "",
    name: "",
    description: "",
    price: 0,
  });
  const [submittedProduct, setSubmittedProduct] = useState<Product | null>(
    null
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.category ||
      !formData.manufacturer ||
      !formData.name ||
      !formData.price
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Create product object
    const product = {
      ...formData,
      price: formData.price,
      createdAt: new Date().toISOString(),
    };

    setSubmittedProduct(product);

    // Reset form
    setFormData({
      category: "",
      manufacturer: "",
      name: "",
      description: "",
      price: 0,
    });
  };

  const handleReset = () => {
    setFormData({
      category: "",
      manufacturer: "",
      name: "",
      description: "",
      price: 0,
    });
    setSubmittedProduct(null);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Create New Product
      </h1>
      <form onSubmit={handleSubmit} className="product-form">
        {/* Category Select */}
        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category <span className="required">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="form-select"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Manufacturer Select */}
        <div className="form-group">
          <label htmlFor="manufacturer" className="form-label">
            Manufacturer <span className="required">*</span>
          </label>
          <select
            id="manufacturer"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            required
            className="form-select"
          >
            {manufacturers.map((mfr) => (
              <option key={mfr.value} value={mfr.value}>
                {mfr.label}
              </option>
            ))}
          </select>
        </div>

        {/* Name Input */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Product Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter product name"
            className="form-input"
          />
        </div>

        {/* Description Textarea */}
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description (optional)"
            className="form-textarea"
          />
        </div>

        {/* Price Input */}
        <div className="form-group">
          <label htmlFor="price" className="form-label">
            Price <span className="required">*</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price || ""}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="0.00"
            className="form-input"
          />
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button type="submit" className="btn btn-submit">
            Create Product
          </button>
          <button type="button" onClick={handleReset} className="btn btn-reset">
            Reset
          </button>
        </div>
      </form>
      {submittedProduct && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-green-800 mb-4">
            ✓ Product Created Successfully!
          </h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Category:</strong> {submittedProduct.category}
            </p>
            <p>
              <strong>Manufacturer:</strong> {submittedProduct.manufacturer}
            </p>
            <p>
              <strong>Name:</strong> {submittedProduct.name}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {submittedProduct.description || "N/A"}
            </p>
            <p>
              <strong>Price:</strong> ${submittedProduct.price}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProduct;
