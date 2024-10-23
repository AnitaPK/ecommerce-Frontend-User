import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../store/cartSlice'; 

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth); 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                setError('Failed to fetch product details');
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-danger">{error}</div>;
    if (!product) return null;

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            alert('Please log in to add items to your cart.');
            return;
        }
        const quantity = 1; 
        console.log(product);
        dispatch(addItemToCart({ productId: product.id, quantity })); 
        alert(`${product.name} has been added to your cart!`);
    };

    const handleBuyNow = () => {
        alert(`You are buying ${product.name} now!`);
    };

    return (
        <div className="container my-4">
            <h1 className="text-center mb-4">{product.name}</h1>
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={product.productImage}
                        alt={product.name}
                        className="img-fluid rounded shadow"
                    />
                </div>
                <div className="col-md-6">
                    <h2 className="my-3">{product.name}</h2>
                    <p className="lead">{product.description}</p>
                    <p className="h5"><strong>Price:</strong> ₹{product.price.toFixed(2)}</p>
                    <p className={`h5 ${product.availability === 'InStock' ? 'text-success' : 'text-danger'}`}>
                        <strong>Status:</strong> {product.availability}
                    </p>
                    <p><strong>Category:</strong> {product.category?.name || 'N/A'}</p>
                    <div className="d-flex justify-content-start my-3">
                        <button className="btn btn-success me-2" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                        <button className="btn btn-primary me-2" onClick={handleBuyNow}>
                            Buy Now
                        </button>
                        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
            <div className="my-4">
                <h4>Product Reviews</h4>
                <p>No reviews yet. Be the first to review this product!</p>
            </div>
        </div>

    );
};

export default ProductDetails;