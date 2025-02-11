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
