export const categories = [
  { value: "", label: "Select a category" },
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "food", label: "Food & Beverages" },
  { value: "books", label: "Books" },
  { value: "home", label: "Home & Garden" },
];

export const manufacturers = [
  { value: "", label: "Select a manufacturer" },
  { value: "acme", label: "ACME Corp" },
  { value: "globex", label: "Globex Corporation" },
  { value: "initech", label: "Initech" },
  { value: "umbrella", label: "Umbrella Inc" },
  { value: "wayne", label: "Wayne Enterprises" },
];

export interface ProductData {
  ProductID: number;
  ProductName: string;
  Category: string;
  UnitPrice: number;
  UnitsInStock: number;
  Discontinued: boolean;
}

export const sampleProducts: ProductData[] = [
  {
    ProductID: 1,
    ProductName: "Chai",
    Category: "Beverages",
    UnitPrice: 18.0,
    UnitsInStock: 39,
    Discontinued: false,
  },
  {
    ProductID: 2,
    ProductName: "Chang",
    Category: "Beverages",
    UnitPrice: 19.0,
    UnitsInStock: 17,
    Discontinued: false,
  },
  {
    ProductID: 3,
    ProductName: "Aniseed Syrup",
    Category: "Condiments",
    UnitPrice: 10.0,
    UnitsInStock: 13,
    Discontinued: false,
  },
  {
    ProductID: 4,
    ProductName: "Chef Anton's Cajun Seasoning",
    Category: "Condiments",
    UnitPrice: 22.0,
    UnitsInStock: 53,
    Discontinued: false,
  },
  {
    ProductID: 5,
    ProductName: "Chef Anton's Gumbo Mix",
    Category: "Condiments",
    UnitPrice: 21.35,
    UnitsInStock: 0,
    Discontinued: true,
  },
  {
    ProductID: 6,
    ProductName: "Grandma's Boysenberry Spread",
    Category: "Condiments",
    UnitPrice: 25.0,
    UnitsInStock: 120,
    Discontinued: false,
  },
  {
    ProductID: 7,
    ProductName: "Uncle Bob's Organic Dried Pears",
    Category: "Produce",
    UnitPrice: 30.0,
    UnitsInStock: 15,
    Discontinued: false,
  },
  {
    ProductID: 8,
    ProductName: "Northwoods Cranberry Sauce",
    Category: "Condiments",
    UnitPrice: 40.0,
    UnitsInStock: 6,
    Discontinued: false,
  },
  {
    ProductID: 9,
    ProductName: "Mishi Kobe Niku",
    Category: "Meat/Poultry",
    UnitPrice: 97.0,
    UnitsInStock: 29,
    Discontinued: true,
  },
  {
    ProductID: 10,
    ProductName: "Ikura",
    Category: "Seafood",
    UnitPrice: 31.0,
    UnitsInStock: 31,
    Discontinued: false,
  },
  {
    ProductID: 11,
    ProductName: "Queso Cabrales",
    Category: "Dairy Products",
    UnitPrice: 21.0,
    UnitsInStock: 22,
    Discontinued: false,
  },
  {
    ProductID: 12,
    ProductName: "Queso Manchego La Pastora",
    Category: "Dairy Products",
    UnitPrice: 38.0,
    UnitsInStock: 86,
    Discontinued: false,
  },
  {
    ProductID: 13,
    ProductName: "Konbu",
    Category: "Seafood",
    UnitPrice: 6.0,
    UnitsInStock: 24,
    Discontinued: false,
  },
  {
    ProductID: 14,
    ProductName: "Tofu",
    Category: "Produce",
    UnitPrice: 23.25,
    UnitsInStock: 35,
    Discontinued: false,
  },
  {
    ProductID: 15,
    ProductName: "Genen Shouyu",
    Category: "Condiments",
    UnitPrice: 15.5,
    UnitsInStock: 39,
    Discontinued: false,
  },
  {
    ProductID: 16,
    ProductName: "Pavlova",
    Category: "Confections",
    UnitPrice: 17.45,
    UnitsInStock: 29,
    Discontinued: false,
  },
  {
    ProductID: 17,
    ProductName: "Alice Mutton",
    Category: "Meat/Poultry",
    UnitPrice: 39.0,
    UnitsInStock: 0,
    Discontinued: true,
  },
  {
    ProductID: 18,
    ProductName: "Carnarvon Tigers",
    Category: "Seafood",
    UnitPrice: 62.5,
    UnitsInStock: 42,
    Discontinued: false,
  },
  {
    ProductID: 19,
    ProductName: "Teatime Chocolate Biscuits",
    Category: "Confections",
    UnitPrice: 9.2,
    UnitsInStock: 25,
    Discontinued: false,
  },
  {
    ProductID: 20,
    ProductName: "Sir Rodney's Marmalade",
    Category: "Confections",
    UnitPrice: 81.0,
    UnitsInStock: 40,
    Discontinued: false,
  },
];
