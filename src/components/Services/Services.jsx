import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const services = [
        {
            id: 1,
            icon: '🧹',
            title: 'Maid Services',
            description: 'Professional cleaning and housekeeping services',
            link: '/find-workers?category=maid',
            rating: 4.8,
            reviews: 156,
            category: 'cleaning',
            startingPrice: 299
        },
        {
            id: 2,
            icon: '🔧',
            title: 'Plumbing',
            description: 'Expert plumbing repair and installation services',
            link: '/find-workers?category=plumbing',
            rating: 4.7,
            reviews: 203,
            category: 'repair',
            startingPrice: 399
        },
        {
            id: 3,
            icon: '⚡',
            title: 'Electricians',
            description: 'Skilled electrical repair and installation',
            link: '/find-workers?category=electrical',
            rating: 4.9,
            reviews: 178,
            category: 'repair',
            startingPrice: 349
        },
        {
            id: 4,
            icon: '🔨',
            title: 'Carpenters',
            description: 'Custom woodwork and furniture repair',
            link: '/find-workers?category=carpentry',
            rating: 4.6,
            reviews: 142,
            category: 'repair',
            startingPrice: 449
        },
        {
            id: 5,
            icon: '🎨',
            title: 'Painting',
            description: 'Interior and exterior painting services',
            link: '/find-workers?category=painting',
            rating: 4.7,
            reviews: 165,
            category: 'renovation',
            startingPrice: 599
        },
        {
            id: 6,
            icon: '🏠',
            title: 'Home Repair',
            description: 'General home maintenance and repair',
            link: '/find-workers?category=repair',
            rating: 4.8,
            reviews: 189,
            category: 'repair',
            startingPrice: 299
        }
    ];

    const categories = [
        { id: 'all', name: 'All Services' },
        { id: 'cleaning', name: 'Cleaning' },
        { id: 'repair', name: 'Repair & Maintenance' },
        { id: 'renovation', name: 'Renovation' }
    ];

    const filteredServices = services.filter(service => {
        const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            service.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <section className="services">
            <div className="services-container">
                <h2>Our Services</h2>
                <p className="services-subtitle">Find skilled professionals for all your home needs</p>
                
                <div className="services-filters">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="category-filters">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="services-grid">
                    {filteredServices.map((service) => (
                        <div key={service.id} className="service-card">
                            <div className="service-icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <div className="service-details">
                                <div className="service-rating">
                                    <span className="stars">{'⭐'.repeat(Math.floor(service.rating))}</span>
                                    <span className="rating-text">{service.rating} ({service.reviews} reviews)</span>
                                </div>
                                <div className="service-price">
                                    Starting from ₹{service.startingPrice}
                                </div>
                            </div>
                            <div className="service-actions">
                                <Link to={service.link} className="view-workers-btn">
                                    View Workers
                                </Link>
                                <Link to={`/book${service.link}`} className="quick-book-btn">
                                    Quick Book
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
