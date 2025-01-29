import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <div className="quick-links">
                        <Link to="/">Home</Link>
                        <Link to="/find-workers">Find Workers</Link>
                        <Link to="/post-job">Post a Job</Link>
                        <Link to="/about">About Us</Link>
                    </div>
                </div>
                
                <div className="footer-section">
                    <h3>Connect With Us</h3>
                    <div className="social-media">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">Twitter</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
                    </div>
                </div>

                <div className="footer-section">
                    <h3>Contact Info</h3>
                    <div className="contact-info">
                        <p>Email: info@handyhive.com</p>
                        <p>Phone: +123 456 7890</p>
                        <p>Address: 123 Worker Street, City</p>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 HandyHive team - made with ❤️</p>
            </div>
        </footer>
    );
};

export default Footer;
