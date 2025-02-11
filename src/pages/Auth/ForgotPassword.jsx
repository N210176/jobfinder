import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateCode = (code) => {
    return /^\d{4}$/.test(code);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // TODO: Implement API call to send verification code
      // await authService.sendResetCode(email);
      setStep(2);
    } catch (err) {
      setError(err.message || 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateCode(code)) {
      setError('Please enter a valid 4-digit verification code');
      return;
    }

    if (!validatePassword(newPassword)) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    try {
      alert('Password reset successful!');
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };
