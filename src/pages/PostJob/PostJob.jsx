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
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        console.log("File selected:", file);
        if (file) {
            console.log("File selected:", file);
            if (file.size > 30 * 1024 * 1024) { // 5MB limit
                setError('File size should be less than 30MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setFormData(prev => ({
                    ...prev,
                    profilePhotoUrl: base64String,
                    profilePhoto: file
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'address') {
                    Object.keys(formData.address).forEach(addressKey => {
                        formDataToSend.append(`address[${addressKey}]`, formData.address[addressKey]);
                    });
                } else if (key === 'profilePhoto') {
                    formDataToSend.append('profilePhoto', formData.profilePhoto);
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            });
            console.log("formdata",FormData);
            console.log("formdata",formDataToSend);
            await workerService.createWorker(formDataToSend);
            navigate('/find-workers');
        } catch (error) {
            console.error('Error creating profile:', error);
            setError(error.message || 'Failed to create profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="post-job-container">
            <div className="content-wrapper">
                <div className="form-wrapper">
                    <h1>Create Your Worker Profile</h1>
                    <form onSubmit={handleSubmit} className="post-job-form">
                        <div className="form-group">
                            <label htmlFor="name" className="yellow-label">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div className="form-group photo-upload">
                            <label htmlFor="profilePhoto" className="yellow-label">Profile Photo</label>
                            <input
                                type="file"
                                id="profilePhoto"
                                name="profilePhoto"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone" className="yellow-label">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="service">Service You Provide</label>
                            <select
                                id="service"
                                name="service"
                                value={formData.service}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select the service you provide</option>
                                <option value="Plumber">Plumber</option>
                                <option value="Electrician">Electrician</option>
                                <option value="Carpenter">Carpenter</option>
                                <option value="Painter">Painter</option>
                                <option value="House Cleaner">House Cleaner</option>
                                <option value="Gardener">Gardener</option>
                                <option value="AC Technician">AC Technician</option>
                                <option value="Cook">Cook</option>
                                <option value="Security Guard">Security Guard</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="experience">Years of Experience</label>
                                <input
                                    type="number"
                                    id="experience"
                                    name="experience"
                                    min="0"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    placeholder="Years of experience"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="gender">Gender</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select your gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="address-group">
                            <h3>Address Details</h3>
                            <div className="address-fields">
                                <div className="form-group">
                                    <label htmlFor="address.street">Street/Area</label>
                                    <input
                                        type="text"
                                        id="address.street"
                                        name="address.street"
                                        value={formData.address.street}
                                        onChange={handleInputChange}
                                        placeholder="Enter your street or area"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="address.city">City</label>
                                    <input
                                        type="text"
                                        id="address.city"
                                        name="address.city"
                                        value={formData.address.city}
                                        onChange={handleInputChange}
                                        placeholder="Enter your city"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="address.district">District</label>
                                    <input
                                        type="text"
                                        id="address.district"
                                        name="address.district"
                                        value={formData.address.district}
                                        onChange={handleInputChange}
                                        placeholder="Enter your district"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="submit-button" disabled={loading}>Create Profile</button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                </div>

                {/* Preview Profile Card */}
                {formData.name && (
                    <div className="preview-profile">
                        <h2>Profile Preview</h2>
                        <div className="preview-card">
                            <div className="preview-photo">
                                {formData.profilePhotoUrl ? (
                                    <img src={formData.profilePhotoUrl} alt="Profile preview" />
                                ) : (
                                    <div className="photo-placeholder">
                                        <span>No Photo</span>
                                    </div>
                                )}
                            </div>
                            <div className="preview-details">
                                <h3>{formData.name}</h3>
                                <p className="preview-service">{formData.service}</p>
                                <div className="preview-info">
                                    <p><strong>Phone:</strong> <span>{formData.phone}</span></p>
                                    <p><strong>Experience:</strong> <span>{formData.experience} years</span></p>
                                    <p><strong>Gender:</strong> <span>{formData.gender}</span></p>
                                    <p><strong>Location:</strong> <span>{formData.address.street}, {formData.address.city}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostJob;
