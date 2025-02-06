import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <Link to="/" className="logo">HandyHive</Link>
            <nav className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/find-workers" className="nav-link">Find Workers</Link>
                <Link to="/post-job" className="nav-link">Post a Job</Link>
                <Link to="/About" className="nav-link">About us</Link>
            </nav>
            <div className="search-section">
                {/* <div className="search-container">
                    <input type="text" className="search-bar" placeholder="Search..." />
                </div> */}
                <div className="auth-buttons">
                    <Link to="/login" className="login-button">Login</Link>
                    <Link to="/signup" className="signup-button">Sign Up</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
