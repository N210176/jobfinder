import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const location = useLocation();
    
    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    return (
        <header className="header">
            <Link to="/" className="logo">HandyHive</Link>
            <nav className="nav-links">
                <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
                <Link to="/find-workers" className={`nav-link ${isActive('/find-workers') ? 'active' : ''}`}>Find Workers</Link>
                <Link to="/post-job" className={`nav-link ${isActive('/post-job') ? 'active' : ''}`}>Post a Job</Link>
                <Link to="/achievements" className={`nav-link ${isActive('/achievements') ? 'active' : ''}`}>Achievements</Link>
                <Link to="/About" className={`nav-link ${isActive('/About') ? 'active' : ''}`}>About us</Link>
            </nav>
            <div className="search-section">
                {/* <div className="search-container">
                    <input type="text" className="search-bar" placeholder="Search..." />
                </div> */}
                <div className="auth-buttons">
                    <Link to="/login" className={`login-button ${isActive('/login') ? 'active' : ''}`}>Login</Link>
                    <Link to="/signup" className={`signup-button ${isActive('/signup') ? 'active' : ''}`}>Sign Up</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
