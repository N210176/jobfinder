import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import './FindWorkers.css';

// Import images
import ahalyaImg from './img/Ahalya.JPG';
import annieImg from './img/Annie Harshini.JPG';
import kethamImg from './img/Ketham Babu.JPG';
import manojImg from './img/Manoj Kumar.JPG';
import rishikImg from './img/Rishik.JPG';
import sagarImg from './img/Sagar.JPG';
import sunilImg from './img/Sunil Kumar.JPG';
import venkateshImg from './img/Venkatesh.JPG';
import vijayaImg from './img/Vijaya Lakshmi.JPG';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff6b00',
    },
    secondary: {
      main: '#FFD700',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(38, 38, 38, 0.95)',
          color: '#ffffff',
          border: '2px solid #ff6b00',
          borderRadius: '15px',
          boxShadow: '0 8px 32px rgba(163, 148, 148, 0.3)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            boxShadow: '0 8px 16px rgba(255, 107, 0, 0.3)',
            transform: 'translateY(-4px)',
            transition: 'all 0.3s ease',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          textTransform: 'none',
          fontWeight: 500,
          background: 'linear-gradient(90deg, #ff6b00, #ff8533)',
          color: '#ffffff',
          '&:hover': {
            background: 'linear-gradient(90deg, #ff8533, #ff6b00)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            color: '#ffffff',
            '& fieldset': {
              borderColor: '#ff6b00',
            },
            '&:hover fieldset': {
              borderColor: '#FFD700',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ff6b00',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#FFD700',
          },
        },
      },
    },
  },
});

const FindWorkers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [workers, setWorkers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState(location.state?.selectedCategory || 'all');
  const [workerLocation, setWorkerLocation] = useState('');
  const [defaultWorkers, setDefaultWorkers] = useState([]);
  const [registeredWorkers, setRegisteredWorkers] = useState([]);

     // Fetch worker profiles from backend

  const fetchWorkerProfiles = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/workers');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        const formattedWorkers = result.data.map(worker => ({
          ...worker,
          skills: worker.skills || [] // Ensure `skills` is always an array
        }));
        
        setRegisteredWorkers(formattedWorkers);
      } else {
        console.error('Invalid response format:', result);
      }
    } catch (error) {
      console.error('Error fetching worker profiles:', error);
    }
  };

  // Separate useEffect for default workers
  useEffect(() => {
    // Default workers data
    const initialWorkers = [
      {
        id: 1,
        name: 'Manoj Kumar',
        category: 'Carpenter',
        location: 'Bangalore',
        rating: 4.7,
        experience: '12',
        hourlyRate: '₹700',
        skills: ['Custom Furniture', 'Wood Repair', 'Cabinet Making'],
        languages: ['Kannada', 'English', 'Hindi'],
        availability: 'All Days',
        completedJobs: 345,
        profileImage: manojImg,
        verified: true
      },
      {
        id: 2,
        name: 'Rishik',
        category: 'Electrician',
        location: 'Delhi',
        rating: 4.9,
        experience: '6',
        hourlyRate: '₹550',
        skills: ['Wiring', 'Circuit Installation', 'Smart Home Setup'],
        languages: ['Hindi', 'English'],
        availability: 'Weekdays',
        completedJobs: 189,
        profileImage: rishikImg,
        verified: true
      },
      {
        id: 3,
        name: 'Ketham Babu',
        category: 'Plumber',
        location: 'Mumbai',
        rating: 4.8,
        experience: '8',
        hourlyRate: '₹600',
        skills: ['Pipe Fitting', 'Leak Repair', 'Bathroom Installation'],
        languages: ['Hindi', 'English', 'Marathi'],
        availability: 'Weekdays & Weekends',
        completedJobs: 234,
        profileImage: kethamImg,
        verified: true
      },
      {
        id: 4,
        name: 'Ahalya',
        category: 'House Cleaner',
        location: 'Hyderabad',
        rating: 4.6,
        experience: '4',
        hourlyRate: '₹400',
        skills: ['Deep Cleaning', 'Organization', 'Sanitization'],
        languages: ['Telugu', 'Hindi', 'English'],
        availability: 'Weekdays',
        completedJobs: 156,
        profileImage: ahalyaImg,
        verified: true
      },
      {
        id: 5,
        name: 'Sagar',
        category: 'Painter',
        location: 'Pune',
        rating: 4.8,
        experience: '10',
        hourlyRate: '₹650',
        skills: ['Interior Painting', 'Exterior Painting', 'Wallpaper Installation'],
        languages: ['Hindi', 'Marathi', 'English'],
        availability: 'Flexible',
        completedJobs: 278,
        profileImage: sagarImg,
        verified: true
      },
      {
        id: 6,
        name: 'Vijaya Lakshmi',
        category: 'Gardener',
        location: 'Chennai',
        rating: 4.7,
        experience: '5',
        hourlyRate: '₹450',
        skills: ['Landscaping', 'Plant Care', 'Garden Maintenance'],
        languages: ['Tamil', 'English'],
        availability: 'Morning Hours',
        completedJobs: 143,
        profileImage: vijayaImg,
        verified: true
      },
      {
        id: 7,
        name: 'Sunil Kumar',
        category: 'AC Technician',
        location: 'Mumbai',
        rating: 4.9,
        experience: '7',
        hourlyRate: '₹800',
        skills: ['AC Repair', 'Installation', 'Maintenance'],
        languages: ['Hindi', 'English', 'Marathi'],
        availability: 'All Days',
        completedJobs: 312,
        profileImage: sunilImg,
        verified: true
      },
      {
        id: 8,
        name: 'Annie Harshini',
        category: 'Cook',
        location: 'Delhi',
        rating: 4.8,
        experience: '15',
        hourlyRate: '₹750',
        skills: ['Indian Cuisine', 'Baking', 'Dietary Cooking'],
        languages: ['Hindi', 'English', 'Punjabi'],
        availability: 'Flexible Hours',
        completedJobs: 423,
        profileImage: annieImg,
        verified: true
      },
      {
        id: 9,
        name: 'Venkatesh',
        category: 'Security Guard',
        location: 'Bangalore',
        rating: 4.6,
        experience: '9',
        hourlyRate: '₹500',
        skills: ['Surveillance', 'Emergency Response', 'Access Control'],
        languages: ['English', 'Kannada', 'Hindi'],
        availability: '24/7 Shifts',
        completedJobs: 167,
        profileImage: venkateshImg,
        verified: true
      }
    ];
    
    setDefaultWorkers(initialWorkers);
