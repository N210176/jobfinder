import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Services.css';

const Services = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const navigate = useNavigate();

    const services = [
        {
            id: 1,
            icon: '🧹',
            title: 'House Cleaner',
            description: 'Professional cleaning and housekeeping services',
            category: 'House Cleaner',
            rating: 4.8,
            reviews: 156,
            startingPrice: 299
        },
        {
            id: 2,
            icon: '🔧',
            title: 'Plumber',
            description: 'Expert plumbing repair and installation services',
            category: 'Plumber',
            rating: 4.7,
            reviews: 203,
            startingPrice: 399
        },
        {
            id: 3,
            icon: '⚡',
            title: 'Electrician',
            description: 'Skilled electrical repair and installation',
            category: 'Electrician',
            rating: 4.9,
            reviews: 178,
            startingPrice: 349
        },
        {
            id: 4,
            icon: '🔨',
            title: 'Carpenter',
            description: 'Custom woodwork and furniture repair',
            category: 'Carpenter',
            rating: 4.6,
            reviews: 142,
            startingPrice: 499
        },
        {
            id: 5,
            icon: '🎨',
            title: 'Painter',
            description: 'Professional painting services',
            category: 'Painter',
            rating: 4.7,
            reviews: 165,
            startingPrice: 599
        },
        {
            id: 6,
            icon: '🌳',
            title: 'Gardener',
            description: 'Garden maintenance and landscaping',
            category: 'Gardener',
            rating: 4.5,
            reviews: 98,
            startingPrice: 299
        },
        {
            id: 7,
            icon: '❄️',
            title: 'AC Technician',
            description: 'AC repair and maintenance services',
            category: 'AC Technician',
            rating: 4.8,
            reviews: 187,
            startingPrice: 699
        },
        {
            id: 8,
            icon: '👨‍🍳',
            title: 'Cook',
            description: 'Professional cooking services',
            category: 'Cook',
            rating: 4.7,
            reviews: 134,
            startingPrice: 599
        },
        {
            id: 9,
            icon: '👮',
            title: 'Security Guard',
            description: 'Professional security services',
            category: 'Security Guard',
            rating: 4.6,
            reviews: 112,
            startingPrice: 399
        }
    ];

    const handleServiceClick = (category) => {
        // Navigate to FindWorkers with the selected category
        navigate('/find-workers', { state: { selectedCategory: category } });
    };

    const filteredServices = services.filter(service => {
        const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            service.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="services">
            <h2>Our Services</h2>
            <div className="search-filter">
                <input
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="services-grid">
                {filteredServices.map((service) => (
                    <div 
                        key={service.id} 
                        className="service-card"
                        onClick={() => handleServiceClick(service.category)}
                    >
                        <div className="service-icon">{service.icon}</div>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                        <div className="service-details">
                            <div className="rating">
                                ⭐ {service.rating} ({service.reviews} reviews)
                            </div>
                            <div className="price">
                                Starting from ₹{service.startingPrice}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
