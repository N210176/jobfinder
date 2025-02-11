import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>About HandyHive</h1>
            <p className="tagline">Connecting Skilled Workers with Quality Opportunities</p>
            <div className="mission-text">
              <p>At HandyHive, we're dedicated to revolutionizing the way skilled workers connect with opportunities.</p>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://static.vecteezy.com/system/resources/previews/003/689/228/original/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg" alt="HandyHive Professionals" />
          </div>
        </div>
      </div>

      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <i className="fas fa-handshake"></i>
            <h3>Trust</h3>
            <p>Building lasting relationships</p>
          </div>
          <div className="value-card">
            <i className="fas fa-award"></i>
            <h3>Quality</h3>
            <p>Maintaining high standards</p>
          </div>
          <div className="value-card">
            <i className="fas fa-users"></i>
            <h3>Community</h3>
            <p>Fostering supportive network</p>
          </div>
          <div className="value-card">
            <i className="fas fa-shield-alt"></i>
            <h3>Security</h3>
            <p>Ensuring safe transactions</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>1000+</h3>
            <p>Professional Workers</p>
          </div>
          <div className="stat-card">
            <h3>5000+</h3>
            <p>Completed Jobs</p>
          </div>
          <div className="stat-card">
            <h3>98%</h3>
            <p>Client Satisfaction</p>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose HandyHive?</h2>
        <div className="features-grid">
          <div className="feature">
            <i className="fas fa-check-circle"></i>
            <h3>Verified Professionals</h3>
            <p>All service providers undergo thorough verification</p>
          </div>
          <div className="feature">
            <i className="fas fa-bolt"></i>
            <h3>Quick Response</h3>
            <p>Get connected with professionals within minutes</p>
          </div>
          <div className="feature">
            <i className="fas fa-wallet"></i>
            <h3>Secure Payments</h3>
            <p>Safe and transparent payment processing</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
