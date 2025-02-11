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
