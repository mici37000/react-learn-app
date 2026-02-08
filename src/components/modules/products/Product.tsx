import { useParams } from "react-router-dom";

function Product() {
  const { id } = useParams();

  return <>Product ID: {id}</>;
}

export default Product;
