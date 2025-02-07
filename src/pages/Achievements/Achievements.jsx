import React from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaUsers, FaBriefcase, FaHandshake, FaStar } from 'react-icons/fa';
import './Achievements.css';

// Monthly growth data
const growthData = [
  { month: 'Jan', jobs: 850, workers: 1200, placements: 600, value: 85000 },
  { month: 'Feb', jobs: 920, workers: 1350, placements: 750, value: 92000 },
  { month: 'Mar', jobs: 1050, workers: 1500, placements: 850, value: 105000 },
  { month: 'Apr', jobs: 1150, workers: 1800, placements: 950, value: 115000 },
  { month: 'May', jobs: 1250, workers: 2100, placements: 1100, value: 125000 },
  { month: 'Jun', jobs: 1500, workers: 3000, placements: 1300, value: 150000 },
];

const statistics = [
  { id: 1, title: 'Registered Workers', value: '3,000+', icon: <FaUsers />, color: '#4CAF50' },
  { id: 2, title: 'Jobs Posted', value: '1,500+', icon: <FaBriefcase />, color: '#2196F3' },
  { id: 3, title: 'Successful Matches', value: '950+', icon: <FaHandshake />, color: '#FF9800' },
  { id: 4, title: 'Average Rating', value: '4.8/5', icon: <FaStar />, color: '#F44336' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
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
      <h1>Our Achievements</h1>
      
      {/* Stats Cards */}
      <div className="stats-grid">
        {statistics.map((stat) => (
          <div className="stat-card" key={stat.id} style={{ borderColor: stat.color }}>
            <div className="stat-icon" style={{ color: stat.color }}>{stat.icon}</div>
            <h3>{stat.title}</h3>
            <p className="stat-value">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Growth Charts */}
      <div className="charts-container">
        <div className="chart-section">
          <h2>Platform Growth Trends</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2196F3" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2196F3" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorWorkers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4CAF50" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="workers" 
                  stroke="#4CAF50" 
                  fillOpacity={1} 
                  fill="url(#colorWorkers)" 
                  name="Active Workers"
                />
                <Area 
                  type="monotone" 
                  dataKey="jobs" 
                  stroke="#2196F3" 
                  fillOpacity={1} 
                  fill="url(#colorJobs)" 
                  name="Jobs Posted"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-section">
          <h2>Success Rate Trends</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="placements" 
                  stroke="#FF9800" 
                  strokeWidth={2}
                  dot={{ stroke: '#FF9800', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Successful Placements"
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#F44336" 
                  strokeWidth={2}
                  dot={{ stroke: '#F44336', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Total Value (₹)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="success-stories">
        <h2>Success Stories</h2>
        <div className="stories-grid">
          <div className="story-card">
            <h3>Top Employer</h3>
            <p>Successfully hired 50+ professionals through our platform</p>
          </div>
          <div className="story-card">
            <h3>Career Growth</h3>
            <p>90% of workers reported career advancement within 6 months</p>
          </div>
          <div className="story-card">
            <h3>Quick Placement</h3>
            <p>Average job filling time reduced to just 2 weeks</p>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="trust-indicators">
        <h2>Why Choose Us</h2>
        <div className="indicators-grid">
          <div className="indicator">
            <h4>Verified Employers</h4>
            <p>100% verified business profiles</p>
          </div>
          <div className="indicator">
            <h4>Skilled Workers</h4>
            <p>Pre-screened talent pool</p>
          </div>
          <div className="indicator">
            <h4>Quick Response</h4>
            <p>24/7 support available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
