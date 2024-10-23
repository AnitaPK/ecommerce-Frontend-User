import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice'; 
import { FaShoppingCart } from 'react-icons/fa';


const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user); 
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); 

    const handleLogout = () => {
        dispatch(logout());
        navigate('/'); 
    };
    console.log(user,'Userin navbar');
    // console.log(user.user.name,'Userin navbar');

  const { items } = useSelector((state) => state.cart);


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    MyShop
                </Link>
                <button 
                className="navbar-toggler" 
                type="button" 
                data-toggle="collapse" 
                data-target="#navbarNav" 
                aria-controls="navbarNav" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">
                                Home
                            </Link>
                        </li>
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                   {user == null ? (<span> User </span>) :
                                   ( <span className="nav-link">Welcome, {user.user.name}</span> )
                                    }
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/cart">
                                        <FaShoppingCart /> Cart<sup>{items.length}</sup>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-link nav-link" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
