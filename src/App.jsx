import Login from './pages/Login/Login';
import BookList from './pages/BookList/BookList';
import Cart from './pages/Cart/Cart';
import Summary from './pages/Summary/Summary';
import Register from './pages/Register/Register';
import { BrowserRouter , Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/index';
import './App.css'
import Header from './components/Header/Header';
import 'font-awesome/css/font-awesome.min.css';

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}></PersistGate>
            <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/books" element={<BookList />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Summary />} />
                    <Route
                        path="*"
                        element={<Navigate to="/login" />}
                    />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};
export default App;