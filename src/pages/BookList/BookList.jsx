import { useEffect, useState } from 'react';
import './BookList.scss';
import ProductCard from '../../components/ProductCard/ProductCard';

const BookList = () => {
    const [warning, setWarning] = useState(false);
    const [books, setBooks] = useState([]);
    useEffect(() => {
          const fetchAllBooks = async() =>{
            const response = await fetch('/api/books');
            const body = await response.json();
            setBooks(body);
          };
          fetchAllBooks();
      }, []);
    return (
        <>
            {/* show warning if the item already exists in the cart */}
            {warning && (
                <div className='container warning bg-warning text-dark'>
                    <p className='warning-text'>Item already exists in the cart</p>
                    <i className="fa fa-warning"></i>
                </div>
            )}
            <div className="container">
                {/* no books status */}
                {books?.length === 0? 
                    <p>No books available.</p>
                :
                <div className='books'>
                    {books?.map((book,id) => (
                        <ProductCard setWarning={setWarning} book={book} key={id} />
                    ))}
                </div>
                }
            </div>
        </>
    );
};


export default BookList;