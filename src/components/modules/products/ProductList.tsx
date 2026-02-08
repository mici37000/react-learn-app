import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { useState } from "react";
import { orderBy } from "@progress/kendo-data-query";
import { filterBy } from "@progress/kendo-data-query";
import styles from "./ProductList.module.scss";

interface ProductData {
  ProductID: number;
  ProductName: string;
  Category: string;
  UnitPrice: number;
  UnitsInStock: number;
  Discontinued: boolean;
}

const ProductList = () => {
  const [sort, setSort] = useState([]);
  const [filter, setFilter] = useState();
  const sampleProducts: ProductData[] = [
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

  // Apply sorting and filtering
  let processedData = sampleProducts;

  if (filter) {
    processedData = filterBy(processedData, filter);
  }

  if (sort.length > 0) {
    processedData = orderBy(processedData, sort);
  }

  return (
    <div className={styles.productListContainer}>
      <h1>Product List</h1>
      <Grid
        data={processedData}
        style={{ width: "100%", height: "100%" }}
        resizable={true}
        sortable={true}
        sort={sort}
        onSortChange={(e) => setSort(e.sort)}
        filterable={true}
        filter={filter}
        onFilterChange={(e) => setFilter(e.filter)}
      >
        <Column field="ProductID" title="ID" />
        <Column field="ProductName" title="Product Name" />
        <Column field="Category" title="Category" />
        <Column field="UnitPrice" title="Unit Price" format="{0:c}" />
        <Column field="UnitsInStock" title="Units In Stock" />
        <Column field="Discontinued" title="Discontinued" />
      </Grid>
    </div>
  );
};

export default ProductList;
