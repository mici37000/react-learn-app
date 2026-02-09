import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Product() {
  const { id } = useParams();
  const { t } = useTranslation();

  return (
    <>
      {t("product.id")}: {id}
    </>
  );
}

export default Product;
