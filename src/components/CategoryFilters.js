import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryFilters.css';
import beauty from '../assets/beauty.jpg';
import axios from 'axios';

const CategoryFilters = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories/getAllCategory');
        setCategories(response.data.categories);
      } catch (err) {
        setError('Error fetching categories');
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/products/${categoryId}`); 
  };

  return (
    <div className="container category-filters mt-4">
      <h3 className="text-center mb-3">Shop by Category</h3>
      <div className="d-flex justify-content-between flex-wrap">
        {categories.map((category) => (
          <div key={category._id} className="category-card text-center" onClick={() => handleCategoryClick(category._id)}>
            <img src={category.image} alt={category.name} className="category-image" />
            <p className="category-name">{category.name}</p>
          </div>
        ))}
      </div>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default CategoryFilters;
