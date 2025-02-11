
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../api/authService';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('client');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        role: userType === 'client' ? 'user' : 'employer'
      };

      await authService.signup(userData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
return (
    <div className="signup-container">
      <div className="signup-left">
        <div className="signup-content">
          <div className="signup-header">
            <h2>Welcome to HandyHive!</h2>
            <p className="subtitle">Create an account to get started</p>
          </div>
        </div>
      </div>

      <div className="signup-right">
        <div className="signup-box">
          <h3>Create Account</h3>
          
          <div className="user-type-buttons">
            <button 
              type="button"
              className={`user-type-btn ${userType === 'client' ? 'active' : ''}`}
              onClick={() => setUserType('client')}
            >
              <i className="fas fa-user"></i>
              I need a service
            </button>
            <button 
              type="button"
              className={`user-type-btn ${userType === 'worker' ? 'active' : ''}`}
              onClick={() => setUserType('worker')}
            >
              <i className="fas fa-tools"></i>
              I provide services
            </button>
          </div>
          <form onSubmit={handleSubmit} className="signup-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <div className="input-group">
                  <div className="input-group-icon">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <div className="input-group-input">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      autoComplete="given-name"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <div className="input-group">
                  <div className="input-group-icon">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="input-group-input">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      autoComplete="family-name"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-group">
                <div className="input-group-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="input-group-input">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-group">
                <div className="input-group-icon">
                  <i className="fas fa-lock"></i>
                </div>
                <div className="input-group-input">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-group">
                <div className="input-group-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div className="input-group-input">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </div>

            <div className="form-group terms-checkbox">
 <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  required
                />
                <span>I agree to the <Link to="/terms" className="terms-link">Terms & Conditions</Link></span>
              </label>
            </div>

            <button type="submit" className="signup-button" disabled={!formData.agreeToTerms || loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <div className="login-link">
              Already have an account? <Link to="/login">Login here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
