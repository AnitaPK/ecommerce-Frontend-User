import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./ProductsByCategory.css";

const ProductsByCategory = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOrder, setSortOrder] = useState("");


  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/getProductByCategoryName/${categoryId}`
      );
      setProducts(response.data.modifiedProducts);
    } catch (err) {
      setError("Error fetching products");
    }
  };

  useEffect(() => {
      fetchProducts();
  }, [categoryId]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/brand/getAllBrand"
        );
        setBrands(response.data.brands);
      } catch (err) {
        setError("Error fetching brands");
      }
    };

    fetchBrands();
  }, []);

  const handleFilterApply = async () => {
    // console.log(brands);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/getProductByCategoryBrand`,
        {
          params: {
            categoryId: categoryId,
            brandId: selectedBrands.join(","), 
          },
        }
      );
      setProducts(response.data.modifiedProducts);
    } catch (err) {
      setError("Error fetching filtered products");
    }
  };

  const handleClearFilterApply = async () =>{
    fetchProducts();
  }

  const handleSortChange = (order) => {
    setSortOrder(order);
    const sortedProducts = [...products].sort((a, b) => {
      return order === "lowToHigh" ? a.price - b.price : b.price - a.price;
    });
    setProducts(sortedProducts);
  };

  return (
    <div className="container products-by-category mt-4">
      <div className="row">
        {/* Filter Sidebar */}
        <div className="col-md-3">
          <h5 className="filter-title">
            <i className="fas fa-filter"></i> Filter
          </h5>
          <div className="filter-section">
            <h6>Price Range</h6>
            <div className="price-range">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(Math.max(0, Number(e.target.value)))
                  }
                  style={{ width: "45%" }}
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(Math.max(minPrice, Number(e.target.value)))
                  }
                  style={{ width: "45%" }}
                />
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="form-range"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="form-range"
              />
            </div>
          </div>
          <div className="filter-section">
            <h6>Brands</h6>
            <select
              multiple
              className="form-control mb-2"
              onChange={(e) =>
                setSelectedBrands(
                  [...e.target.selectedOptions].map((option) => option.value)
                )
              }
            >
              {brands.map((brnd) => (
                <option key={brnd._id} value={brnd._id}>
                  {brnd.name}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary" onClick={handleFilterApply}>
            <i className="fas fa-check"></i> Apply Filters
          </button>
          <button className="btn btn-success" onClick={handleClearFilterApply}>
             Clear Filters
          </button>
        </div>

        {/* Products and Sorting */}
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="text-center">Products</h3>
            <div>
              <label htmlFor="sortOrder">Sort by: </label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => handleSortChange(e.target.value)}
                className="form-control d-inline-block"
                style={{ width: "auto" }}
              >
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          {error && <p className="text-danger">{error}</p>}
          <div className="d-flex flex-wrap justify-content-between">
            {products.length > 0 ? (
              products.map((product) => (
                <div className="col-md-4 mb-4" key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <p>No products found in this category.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsByCategory;
