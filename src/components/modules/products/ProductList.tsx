import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { useState } from "react";
import { orderBy } from "@progress/kendo-data-query";
import { filterBy } from "@progress/kendo-data-query";
import { useTranslation } from "react-i18next";
import { sampleProducts } from "./constants";
import styles from "./ProductList.module.scss";

const ProductList = () => {
  const [sort, setSort] = useState([]);
  const [filter, setFilter] = useState();
  const { t } = useTranslation();

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
      <h1>{t("productList.title")}</h1>
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
        <Column field="ProductID" title={t("productList.columnId")} />
        <Column
          field="ProductName"
          title={t("productList.columnProductName")}
        />
        <Column field="Category" title={t("productList.columnCategory")} />
        <Column
          field="UnitPrice"
          title={t("productList.columnUnitPrice")}
          format="{0:c}"
        />
        <Column
          field="UnitsInStock"
          title={t("productList.columnUnitsInStock")}
        />
        <Column
          field="Discontinued"
          title={t("productList.columnDiscontinued")}
        />
      </Grid>
    </div>
  );
};

export default ProductList;
