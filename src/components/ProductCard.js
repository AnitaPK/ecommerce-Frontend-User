import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="card mb-4 shadow-sm" style={{width:"16rem"}}>
            <img 
                src={product.productImage} 
                alt={product.name} 
                className="card-img-top" 
                style={{ height: '200px' }} 
            />
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{`${product.description.substring(0, 25)}...`}</p>
                <p className="card-text"><strong>Price:</strong> ₹{product.price.toFixed(2)}</p>
                <p className="card-text"><strong>Brand:</strong> {product.brand.name}</p>

                <p className="card-text"><strong>Status:</strong> {product.availability ? 'In Stock' : 'Out of Stock'}</p>
                <Link to={`/product/${product.id}`} className="btn btn-primary">View Details</Link>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        productImage: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number.isRequired,
        available: PropTypes.bool,
    }).isRequired,
};

export default ProductCard;
