import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import image1 from '../assets/pinkGradient1.jpg';
import image2 from '../assets/pinkGradient2.jpg';
import image3 from '../assets/pinkGradient3.avif';
import headerImage from '../assets/headerImage.jpg'

import './Carousel.css'; 

const variants = {
    enter: (direction) => ({
        opacity: 0,
        x: direction > 0 ? 1000 : -1000, 
    }),
    center: {
        opacity: 1,
        x: 0,
    },
    exit: (direction) => ({
        opacity: 0,
        x: direction < 0 ? 1000 : -1000, 
    }),
};

const CarouselComponent = () => {
    return (
        <Carousel>
            {[image1, image2, image3].map((src, index) => (
                <Carousel.Item key={index}>
                    <motion.img
                        src={src}
                        alt={`Slide ${index + 1}`}
                        className="d-block w-100"
                        initial="enter"
                        animate="center"
                        exit="exit"
                        variants={variants}
                        transition={{ duration: 0.5 }} 
                    />
                    <Carousel.Caption>
                        <h4>"Discover Your Unseen Passion"</h4>
                        <h4>"Welcome to the Extraordinary"</h4>
                        <img src={headerImage} alt="headerImage" height="200" width="300" style={{borderRadius:"15px"}}/><br></br>
                        <button>Get Discounts</button>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default CarouselComponent;
