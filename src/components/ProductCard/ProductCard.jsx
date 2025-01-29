/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../store/slices/cartSlice';
import './ProductCard.scss';



const ProductCard = ({book, setWarning}) => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const handleAddToCart = (book) => {
        let itemExistsInCart = false;
        cart.items.forEach((item) => {
            if (book?.id === item.id) {
                itemExistsInCart = true;
            }
        })
        if (itemExistsInCart) {
            setWarning(true);
            setTimeout(() => {
                setWarning(false);
            }, 2000);
        } else {
            dispatch(addItem(book));
        }
    };
    return (
        <div className='product'>
            <div className='container'>
                <div className='product-img'></div>
                <h5>{book.title}</h5>
                <p>{book.author}</p>
                <p className='price'><span className='unit'>€</span>{book.price}</p>
                <button className='btn btn-primary' data-testid="product-card" onClick={() => handleAddToCart(book)}>Add to Cart</button>
            </div>
        </div>
    );
};
export default ProductCard;