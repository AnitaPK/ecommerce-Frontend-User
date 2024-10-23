import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import ProductDetails from './components/ProdutDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ProductsByCategory from './components/ProductsByCategory';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/product/:id" element={<ProductDetails />} /> 
                <Route path='/cart' element={<Cart />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path="/products/:categoryId" element={<ProductsByCategory />} />
            </Routes>
        </Router>
    );
};

export default App;
