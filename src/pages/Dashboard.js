import React from 'react';
import CarouselComponent from '../components/Carousel';
import ProductList from '../components/ProductList';
import Footer from '../components/Footer';
import CategoryFilters from '../components/CategoryFilters';
import ProductsByCategory from '../components/ProductsByCategory';

const Dashboard = () => {
    return (
        <div>
            <CarouselComponent />
            <CategoryFilters />
            <ProductList />
            <Footer />
        </div>
    );
};

export default Dashboard;
