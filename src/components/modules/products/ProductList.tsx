import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { useState } from "react";
import { orderBy } from "@progress/kendo-data-query";
import { filterBy } from "@progress/kendo-data-query";
import { sampleProducts } from "./constants";
import styles from "./ProductList.module.scss";

const ProductList = () => {
  const [sort, setSort] = useState([]);
  const [filter, setFilter] = useState();

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
