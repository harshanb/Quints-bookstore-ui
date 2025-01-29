import { useMemo } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import './Cart.scss';
import { addQuantity, reduceQuantity, removeItem } from '../../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate();
    console.log(cart.items)

    const TotalAmount = useMemo(() => {
        let total = 0;
        cart.items.forEach((item) => {
            total += item.price * item.quantity;
        });
        return total.toFixed(2);   
    },[cart.items]);
    return (
        <div className='container'>
            {/* Empty Cart Message */}
            {cart.items.length === 0? 
            <div>
                <h1>Your cart is empty</h1>
                <button className='btn btn-primary' onClick={() => navigate('/books')}>Add Items</button>
            </div> :
            <div className='cart col-8'>
                {cart.items.map((item) => {
                    return(
                        <div key={item.id} className='cart-body col-12'>
                            <div className='cart-img col-6 col-md-6'>
                                <p>{item.title}</p>
                                <p>{item.author}</p>
                            </div>
                            <div className='cart-options col-2'>
                                <button className='btn btn-light' onClick={() => dispatch(addQuantity(item))}>+</button>
                                <button className='btn' data-testid="quantity">{item.quantity}</button>
                                <button className='btn btn-light' onClick={() => dispatch(reduceQuantity(item))}>-</button>
                            </div>
                            <div className='cart-remove col-3'>
                                <span><span className='unit'>€</span>{item.price}</span>
                                <button className='btn btn-danger' onClick={() => dispatch(removeItem(item))}>Remove</button>
                            </div>
                        </div>
                    )
                })}
                <div className='total'>
                    <span>Total Value:</span>
                    <div>
                        <span><span className='unit'>€</span>{TotalAmount}</span>
                        <div>
                            <button className='btn back btn-light' onClick={() => navigate('/books')}>Back</button>
                            <button className='btn btn-primary' onClick={() => navigate('/checkout')}>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default Cart;