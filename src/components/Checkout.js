import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, emptyCart } from '../store/cartSlice';
import './Checkout.css';

const Checkout = () => {
    const dispatch = useDispatch();
    const { items, totalPrice } = useSelector((state) => state.cart);
    
    const [coupon, setCoupon] = useState('');
    const [shippingMethod, setShippingMethod] = useState('standard');
    const [discount, setDiscount] = useState(0);
    const deliveryCharges = Math.floor(Math.random() * (15 - 5 + 1)) + 5; // Random delivery charges between $5 and $15

    useEffect(() => {
        dispatch(fetchCartItems());
    }, [dispatch]);

    const validateCoupon = () => {
        if (coupon === 'SAVE100') {
            setDiscount(10);
        } else {
            setDiscount(0);
            alert('Invalid coupon');
        }
    };

    const handleCheckout = () => {
        alert('Proceeding to payment');
        dispatch(emptyCart());
    };

    const totalAfterDiscount = totalPrice - discount + deliveryCharges;

    return (
        <div className="container checkout mt-5">
            <h2 className="mb-4 text-center">Review Your Cart</h2>
            {items.length === 0 ? (
                <div className="alert alert-warning text-center" role="alert">
                    Your cart is empty.
                </div>
            ) : (
                <div className="row">
                    <div className="col-lg-8">
                        <ul className="list-group mb-4">
                            {items.map(item => (
                                <li key={item.product._id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5>{item.product.name}</h5>
                                        <p>Price: ${item.product.price} (x{item.quantity})</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-lg-4">
                        <h3>Price Details</h3>
                        <p>Price ({items.length} item{items.length > 1 ? 's' : ''}): <strong>${totalPrice.toFixed(2)}</strong></p>
                        {discount > 0 && <p>Discount: <strong>-${discount.toFixed(2)}</strong></p>}
                        <p>Delivery Charges: <strong>${deliveryCharges.toFixed(2)}</strong></p>
                        <h3>Total Amount: <strong>${totalAfterDiscount.toFixed(2)}</strong></h3>

                        {discount > 0 && (
                            <p className="text-success">
                                You will save ${discount.toFixed(2)} on this order!
                            </p>
                        )}

                        <div className="mt-4">
                            <h4>Apply Coupon</h4>
                            <div className="input-group mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={coupon} 
                                    onChange={(e) => setCoupon(e.target.value)} 
                                    placeholder="Coupon code"
                                />
                                <button className="btn btn-primary" onClick={validateCoupon}>Apply</button>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h4>Shipping Options</h4>
                            <div>
                                <label className="me-3">
                                    <input 
                                        type="radio" 
                                        value="standard" 
                                        checked={shippingMethod === 'standard'} 
                                        onChange={(e) => setShippingMethod(e.target.value)} 
                                    />
                                    Standard Shipping
                                </label>
                                <label>
                                    <input 
                                        type="radio" 
                                        value="express" 
                                        checked={shippingMethod === 'express'} 
                                        onChange={(e) => setShippingMethod(e.target.value)} 
                                    />
                                    Express Shipping
                                </label>
                            </div>
                        </div>

                        <button className="btn btn-success mt-4" onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;
