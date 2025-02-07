import React from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaTrophy, FaHandHoldingUsd, FaClock, FaChartLine, FaGraduationCap, FaStar, FaHandshake, FaTools } from 'react-icons/fa';
import './Achievements.css';

// Import images
import sudhakarImg from '../FindWorkers/img/Sudhakar.JPG';
import harikaImg from '../FindWorkers/img/Harika.JPG';
import mohanImg from '../FindWorkers/img/Mohan.JPG';
import yasaswiImg from '../FindWorkers/img/Yasaswi.JPG';
import anilImg from '../FindWorkers/img/Anil.JPG';
import venkataLakshmiImg from '../FindWorkers/img/Venkata Lakshmi.JPG';

// Monthly earnings data
const earningsData = [
  { month: 'Jan', averageEarnings: 25000, topEarnings: 45000, jobSuccess: 92 },
  { month: 'Feb', averageEarnings: 27000, topEarnings: 48000, jobSuccess: 94 },
  { month: 'Mar', averageEarnings: 28000, topEarnings: 52000, jobSuccess: 93 },
  { month: 'Apr', averageEarnings: 30000, topEarnings: 55000, jobSuccess: 95 },
  { month: 'May', averageEarnings: 32000, topEarnings: 58000, jobSuccess: 96 },
  { month: 'Jun', averageEarnings: 35000, topEarnings: 62000, jobSuccess: 97 },
];

const workerAchievements = [
  { 
    id: 1, 
    title: 'Top Earner', 
    value: '₹62,000/month', 
    description: 'Highest earning worker on our platform',
    icon: <FaTrophy />, 
    color: '#FFD700' 
  },
  { 
    id: 2, 
    title: 'Average Earnings', 
    value: '₹35,000/month', 
    description: 'Average earnings of active workers',
    icon: <FaHandHoldingUsd />, 
    color: '#4CAF50' 
  },
  { 
    id: 3, 
    title: 'Quick Response', 
    value: '15 minutes', 
    description: 'Average response time to new jobs',
    icon: <FaClock />, 
    color: '#2196F3' 
  },
  { 
    id: 4, 
    title: 'Growth Rate', 
    value: '+45%', 
    description: 'Worker earnings growth rate',
    icon: <FaChartLine />, 
    color: '#FF9800' 
  },
];

const successStories = [
  {
    name: "Sudhakar",
    role: "Carpenter",
    achievement: "Top Rated Professional",
    story: "Started as a basic carpenter, now manages a team of 5 and earns ₹55,000 monthly",
    image: sudhakarImg
  },
  {
    name: "Harika",
    role: "House Cleaner",
    achievement: "Most Reliable Worker",
    story: "Single mother who built a client base of 30+ regular customers through HandyHive",
    image: harikaImg
  },
  {
    name: "Mohan",
    role: "Electrician",
    achievement: "Highest Earnings",
    story: "Doubled his monthly income within 6 months of joining HandyHive",
    image: mohanImg
  }
];

const testimonials = [
  {
    id: 1,
    name: "Yasaswi",
    role: "Professional Painter",
    image: yasaswiImg,
    quote: "HandyHive's platform helped me showcase my painting portfolio and connect with high-quality clients. My income has increased by 60% since joining.",
    rating: 5
  },
  {
    id: 2,
    name: "Anil",
    role: "Master Electrician",
    image: anilImg,
    quote: "The skill development workshops and certification programs have helped me stay updated with the latest electrical safety standards.",
    rating: 5
  },
  {
    id: 3,
    name: "Venkata Lakshmi",
    role: "Home Organizer",
    image: venkataLakshmiImg,
    quote: "From part-time cleaning to full-service home organization, HandyHive helped me expand my business beyond my expectations.",
    rating: 4.8
  }
];

const skillsData = [
  { skill: 'Carpentry', growth: 85, demand: 92 },
  { skill: 'Plumbing', growth: 78, demand: 88 },
  { skill: 'Electrical', growth: 90, demand: 95 },
  { skill: 'Painting', growth: 75, demand: 82 },
  { skill: 'Cleaning', growth: 82, demand: 89 },
  { skill: 'Cooking', growth: 88, demand: 94 },
  { skill: 'Gardening', growth: 76, demand: 85 },
  { skill: 'Security', growth: 80, demand: 87 },
  { skill: 'AC Technician', growth: 92, demand: 96 }
];

const monthlyHighlights = [
  {
    title: "Training & Development",
    stats: [
      { label: "Skills Workshops Conducted", value: "24" },
      { label: "Certification Programs Completed", value: "156" },
      { label: "Average Skill Assessment Score", value: "88%" }
    ],
    icon: <FaGraduationCap />,
    color: "#9C27B0"
  },
  {
    title: "Client Satisfaction",
    stats: [
      { label: "5-Star Reviews", value: "892" },
      { label: "Repeat Client Rate", value: "78%" },
      { label: "Client Satisfaction Score", value: "4.9/5" }
    ],
    icon: <FaStar />,
    color: "#E91E63"
  },
  {
    title: "Community Impact",
    stats: [
      { label: "Community Projects", value: "12" },
      { label: "Workers Mentored", value: "45" },
      { label: "Local Partnerships", value: "8" }
    ],
    icon: <FaHandshake />,
    color: "#673AB7"
  }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: ₹{entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Achievements = () => {
  return (
    <div className="achievements-container">
      <div className="achievements-hero">
        <h1>Worker Success Stories</h1>
        <p className="subtitle">Celebrating the growth and success of our HandyHive professionals</p>
      </div>
      
      {/* Worker Achievement Stats */}
      <div className="stats-grid">
        {workerAchievements.map((achievement) => (
          <div className="stat-card" key={achievement.id} style={{ borderColor: achievement.color }}>
            <div className="stat-icon" style={{ color: achievement.color }}>{achievement.icon}</div>
            <h3>{achievement.title}</h3>
            <p className="stat-value">{achievement.value}</p>
            <p className="stat-description">{achievement.description}</p>
          </div>
        ))}
      </div>

      {/* Monthly Highlights */}
      <section className="monthly-highlights">
        <h2>Monthly Highlights</h2>
        <div className="highlights-grid">
          {monthlyHighlights.map((highlight, index) => (
            <div className="highlight-card" key={index} style={{ borderColor: highlight.color }}>
              <div className="highlight-header">
                <div className="highlight-icon" style={{ color: highlight.color }}>{highlight.icon}</div>
                <h3>{highlight.title}</h3>
              </div>
              <div className="highlight-stats">
                {highlight.stats.map((stat, idx) => (
                  <div className="highlight-stat" key={idx}>
                    <span className="stat-label">{stat.label}</span>
                    <span className="stat-value" style={{ color: highlight.color }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Development Section */}
      <section className="skills-section">
        <h2>Skills & Demand Growth</h2>
        <div className="skills-grid">
          {skillsData.map((item, index) => (
            <div key={index} className="skill-card">
              <div className="skill-title">{item.skill}</div>
              <div className="skill-metrics">
                <div className="metric">
                  <span>Growth</span>
                  <div className="progress-bar growth" style={{ '--value': `${item.growth}%` }}>
                    <style>{`.progress-bar.growth::after { width: ${item.growth}% }`}</style>
                  </div>
                  <span>{item.growth}%</span>
                </div>
                <div className="metric">
                  <span>Demand</span>
                  <div className="progress-bar demand" style={{ '--value': `${item.demand}%` }}>
                    <style>{`.progress-bar.demand::after { width: ${item.demand}% }`}</style>
                  </div>
                  <span>{item.demand}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories */}
      <section className="success-stories">
        <h2>Featured Success Stories</h2>
        <div className="stories-grid">
          {successStories.map((story, index) => (
            <div className="story-card" key={index}>
              <div className="story-header">
                <img src={story.image} alt={story.name} className="story-image" />
                <div className="story-title">
                  <h3>{story.name}</h3>
                  <p className="role">{story.role}</p>
                </div>
              </div>
              <div className="story-achievement">{story.achievement}</div>
              <p className="story-content">{story.story}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Worker Testimonials */}
      <section className="testimonials">
        <h2>Worker Testimonials</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.id}>
              <div className="testimonial-header">
                <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
                <div className="testimonial-info">
                  <h3>{testimonial.name}</h3>
                  <p className="role">{testimonial.role}</p>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(testimonial.rating) ? 'star-filled' : 'star-empty'} />
                    ))}
                    <span className="rating-value">{testimonial.rating}</span>
                  </div>
                </div>
              </div>
              <p className="testimonial-quote">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Earnings Chart */}
      <div className="charts-container">
        <div className="chart-section">
          <h2>Worker Earnings Trends</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={earningsData}>
                <defs>
                  <linearGradient id="colorAvgEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4CAF50" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorTopEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FFD700" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="averageEarnings" 
                  stroke="#4CAF50" 
                  fillOpacity={1} 
                  fill="url(#colorAvgEarnings)" 
                  name="Average Earnings"
                />
                <Area 
                  type="monotone" 
                  dataKey="topEarnings" 
                  stroke="#FFD700" 
                  fillOpacity={1} 
                  fill="url(#colorTopEarnings)" 
                  name="Top Earnings"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
