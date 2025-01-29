import { useDispatch, useSelector } from 'react-redux';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/userSlice';

const Header = () => {
    const user = useSelector(state => state.user);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        history('/login');
    }
    const history = useNavigate();
    //history('/cart');
    return(
        <nav className="navbar">
            <div className="container-fluid">
                <div className="navbar-text">
                    <p className='title'>Quints<span className='sub-heading'>Digest</span></p>
                </div>
                {user.isLoggedIn && (
                    <div className='options'>
                        <button className='logout btn btn-danger' onClick={() => handleLogout()}>Logout</button>
                        <div onClick={() => history('/cart')}>
                            <i className='fa fa-shopping-cart'></i>
                            <span className='count'>{cart.items.length}</span>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
};

export default Header;