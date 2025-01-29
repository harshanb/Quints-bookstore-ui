import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";

const Summary = () => {
    const cart = useSelector((state) => state.cart);
    const [checkoutItems, setCheckoutItems] = useState([]);
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetCheckoutItems = async () => {
            try {
                const response = await axios.post('/api/checkout', cart?.items);
                setCheckoutItems(response.data);
            } catch (err) {
                setError('Failed to fetch checkout data. Please try again later.');
                console.error('Error fetching checkout data:', err);
            } finally {
                setLoading(false);
            }
        };

        if (cart?.items?.length > 0) {
            fetCheckoutItems(); 
        } else {
            setLoading(false);
        }
    }, [cart]);

    const totalAmount = checkoutItems.reduce((acc, item) => item.quantity * item.price + acc, 0);

    return (
        <div className='container'>
            <h1 className='mb-3'>Your Order Summary:</h1>

            {/* Show error message if an error occurs */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Show loading state */}
            {loading && <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}

            {checkoutItems?.length > 0 && !loading && !error && (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Row</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Quantity</th>
                            <th>Price/item</th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkoutItems.map((item, id) => (
                            <tr key={id}>
                                <th>{id + 1}</th>
                                <td>{item.title}</td>
                                <td>{item.author}</td>
                                <td>{item.quantity}</td>
                                <td><span className='unit'>€</span><span className='fs-4'>{item.price}</span></td>
                            </tr>
                        ))}
                        <tr>
                            <th colSpan={4}>Total Value:</th>
                            <td><span className='unit'>€</span><span className='fs-4'>{totalAmount}</span></td>
                        </tr>
                    </tbody>
                </table>
            )}

            {/* Show a message when no items are found */}
            {!loading && !error && checkoutItems.items?.length === 0 && (
                <p>No items in your order.</p>
            )}
        </div>
    );
};

export default Summary;
