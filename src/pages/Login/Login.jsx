import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import { login } from '../../store/slices/userSlice';
import './Login.scss';
import axios from 'axios';


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    console.log(user);
    useEffect(() => {
        if(user.isLoggedIn) {
            navigate('/books');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user.isLoggedIn]);
    const handleLogin = async() => {
        if(!email || !password){
            setError('Email and Password are required!');
            return;
        }
        try{
            const response = await axios.post('/api/auth/signin', { email, password });
            console.log(response);
            if(response.status === 200){
                dispatch(login(response.data));
                navigate('/books');
            }
            else{
                const errorData = response.data;
                setError(errorData.message || 'Something went wrong!');
            }
        }
        catch(error){
            setError(`${error.message || 'Something went wrong!'}`);
            console.error('Error during login:', error);
        }
    }
    console.log(user.isLoggedIn)
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h1>Login</h1>
                    <div className="card">
                        <div className="login card-body">
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input type="password" 
                                    className="form-control" 
                                    id="password" 
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                            </div>
                            <button className="btn btn-primary mb-4" onClick={() => handleLogin()}>
                                Login
                            </button>
                            <div className="form-group">
                                <span>New User? </span><Link to="/register">Register here</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    );
};

export default Login;