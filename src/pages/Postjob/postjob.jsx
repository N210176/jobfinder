import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import workerService from '../../api/workerService';
import './PostJob.css';

const PostJob = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        service: '',
        experience: '',
        gender: '',
        address: {
            street: '',
            city: '',
            district: ''
        },
        profilePhotoUrl: null,
        profilePhoto: null
    });
        const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Phone number validation
        if (name === 'phone') {
            // Remove any non-digit characters
            const cleanedValue = value.replace(/\D/g, '');
            
            // Check if the number contains invalid starting digits (0-5)
            if (/^[012345]/.test(cleanedValue)) {
                setError('Phone number must not start with 0, 1, 2, 3, 4, or 5');
                return; // Don't update the form value
            }
            
            // Check if the number starts with 7, 8, or 9 and is exactly 10 digits
            const phoneRegex = /^[789]\d{9}$/;
            
            if (cleanedValue.length > 0) {
                if (cleanedValue.length !== 10) {
                    setError('Phone number must be 10 digits');
                } else if (!phoneRegex.test(cleanedValue)) {
                    setError('Phone number must start with 7, 8, or 9');
                } else {
                    setError('');
                }
            } else {
                setError('');
            }
            
            // Only update if it's a valid number or empty
            if (cleanedValue.length <= 10 && !/^[012345]/.test(cleanedValue)) {
                if (name.includes('.')) {
                    const [parent, child] = name.split('.');
                    setFormData(prev => ({
                        ...prev,
                        [parent]: {
                            ...prev[parent],
                            [child]: cleanedValue
                        }
                    }));
                } else {
                    setFormData(prev => ({
                        ...prev,
                        [name]: cleanedValue
                    }));
                }
            }
            return;
        }
