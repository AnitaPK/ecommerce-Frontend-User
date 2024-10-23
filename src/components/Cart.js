import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItems,
  deleteItemFromCart,
  emptyCart,
  updateQuantity,
} from "../store/cartSlice";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleIncrement = (productId) => {
    const item = items.find((item) => item.product._id === productId);
    if (item) {
      dispatch(updateQuantity({ productId, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrement = (productId) => {
    const item = items.find((item) => item.product._id === productId);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({ productId, quantity: item.quantity - 1 }));
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(deleteItemFromCart(productId));
  };

  const handleEmptyCart = () => {
    dispatch(emptyCart());
  };

  const navigate = useNavigate();
  const handleBuyNow = () => {
    navigate('/checkout'); 
  };

  return (
    <div className="container cart mt-5">
      <h2 className="mb-4">Your Shopping Cart</h2>
      {items.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          Your cart is empty
        </div>
      ) : (
        <div>
          <ul className="list-group">
            {items.map((item) => (
              <li key={item.product._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.product.name}</h5>
                  <p className="mb-1">Price: <strong>${item.product.price}</strong></p>
                  <div>
                    <span className="me-2">Quantity:</span>
                    <button className="btn btn-outline-secondary btn-sm me-1" onClick={() => handleDecrement(item.product._id)}>-</button>
                    {item.quantity}
                    <button className="btn btn-outline-secondary btn-sm ms-1" onClick={() => handleIncrement(item.product._id)}>+</button>
                  </div>
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => handleRemoveItem(item.product._id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <h3>Total Price: <strong>${totalPrice.toFixed(2)}</strong></h3>
            <button className="btn btn-outline-danger me-2" onClick={handleEmptyCart}>Empty Cart</button>
            <button className="btn btn-success" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
