import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom' // Import the 'Routes' component
import Login from './pages/Login/Login';
import BookList from './pages/BookList/BookList';
import Cart from './pages/Cart/Cart';
import Summary from './pages/Summary/Summary';
import Register from './pages/Register/Register';
function App() {
  return (
   <>
      <BrowserRouter>
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
   </>
  )
}

export default App
