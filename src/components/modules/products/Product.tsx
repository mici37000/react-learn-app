import { useParams } from 'react-router-dom';
import './Product.scss';

function Product() {
    const { id } = useParams();

    return (
        <>Product ID: {id}</>
    );
}

export default Product;