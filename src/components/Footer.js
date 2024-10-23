import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>ECommerce</h5>
            <p>
              We are a leading eCommerce platform offering a wide range of products. 
              Our mission is to provide the best shopping experience to our customers.
            </p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link href="/about" className="text-light">About Us</Nav.Link>
              <Nav.Link href="/products" className="text-light">Products</Nav.Link>
              <Nav.Link href="/contact" className="text-light">Contact Us</Nav.Link>
              <Nav.Link href="/privacy" className="text-light">Privacy Policy</Nav.Link>
            </Nav>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <Nav className="social-icons">
              <Nav.Link href="https://facebook.com" target="_blank" className="text-light">
                <FaFacebook />
              </Nav.Link>
              <Nav.Link href="https://twitter.com" target="_blank" className="text-light">
                <FaTwitter />
              </Nav.Link>
              <Nav.Link href="https://instagram.com" target="_blank" className="text-light">
                <FaInstagram />
              </Nav.Link>
              <Nav.Link href="https://linkedin.com" target="_blank" className="text-light">
                <FaLinkedin />
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <p>&copy; 2024 ECommerce. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
