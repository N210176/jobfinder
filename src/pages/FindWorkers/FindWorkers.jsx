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
