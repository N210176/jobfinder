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
  createTheme,
  InputAdornment
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
        setWorkers([...defaultWorkers, ...formattedWorkers]);
      } else {
        console.error('Invalid response format:', result);
      }
    } catch (error) {
      console.error('Error fetching worker profiles:', error);
      setWorkers(defaultWorkers); // Fallback to default workers
    }
  };

      


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
    
    // If a category was passed from Services, filter workers immediately
    if (location.state?.selectedCategory) {
      const filtered = initialWorkers.filter(worker => 
        worker.category === location.state.selectedCategory
      );
      setWorkers(filtered);
    } else {
      setWorkers(initialWorkers);
    }
    
    // Fetch registered workers after setting default workers
    fetchWorkerProfiles();
  }, [location.state?.selectedCategory]);
  

  useEffect(() => {
    if (category === 'all') {
      // When 'all' is selected, show both default and registered workers
      setWorkers([...defaultWorkers, ...registeredWorkers]);
    } else {
      // Filter both default and registered workers by category
      const allWorkers = [...defaultWorkers, ...registeredWorkers];
      const filtered = allWorkers.filter(worker => 
        (worker.category || worker.service).toLowerCase() === category.toLowerCase()
      );
      setWorkers(filtered);
    }
  }, [category, defaultWorkers, registeredWorkers]);
  

  const handleLocationChange = (event) => {
    setWorkerLocation(event.target.value);
  };

  const handleSearch = () => {
    let filtered = [...defaultWorkers, ...registeredWorkers];

    console.log("Search Query:", searchQuery);
    console.log("Workers before filtering:", filtered);

    if (searchQuery) {
        filtered = filtered.filter(worker =>
            worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (Array.isArray(worker.skills) && worker.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())))
        );
    }

    if (category !== 'all') {
        filtered = filtered.filter(worker => (worker.category || worker.service).toLowerCase() === category.toLowerCase());
    }

    if (workerLocation) {
        filtered = filtered.filter(worker =>
            (worker.location || (worker.address?.city)).toLowerCase().includes(workerLocation.toLowerCase())
        );
    }

    console.log("Filtered Workers:", filtered);
    setWorkers(filtered);
};

  const handleBooking = (worker) => {
    navigate('/booking', { state: { worker } });
  };

  // Get unique categories from default workers and sort them
  const categories = [
    'Plumber',
    'Electrician',
    'Carpenter',
    'Painter',
    'House Cleaner',
    'Gardener',
    'AC Technician',
    'Cook',
    'Security Guard'
  ].sort();

  const renderWorkerCard = (worker) => {
    const isDefaultWorker = worker.verified !== undefined;

    if (isDefaultWorker) {
      // Render default worker card with original layout
      return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flexGrow: 1 }}>
            {worker.verified && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  backgroundColor: '#ff6b00',
                  color: '#ffffff',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  zIndex: 1,
                }}
              >
                ✓ Verified
              </Box>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                component="img"
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #ff6b00'
                }}
                src={worker.profileImage}
                alt={worker.name}
              />
              <Box sx={{ ml: 2 }}>
                <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 600 }}>
                  {worker.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#ffffff' }}>
                  {worker.category}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <Typography sx={{ color: '#FFD700', fontWeight: 600, mr: 1 }}>
                    {worker.rating}
                  </Typography>
                  <Typography sx={{ color: '#FFD700' }}>
                    {'★'.repeat(Math.floor(worker.rating))}
                    {worker.rating % 1 !== 0 && '½'}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Typography variant="body2" sx={{ mb: 1, color: '#ffffff' }}>
              <strong style={{ color: '#FFD700' }}>Rate:</strong> {worker.hourlyRate}/hour
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: '#ffffff' }}>
              <strong style={{ color: '#FFD700' }}>Experience:</strong> {worker.experience} years
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: '#ffffff' }}>
              <strong style={{ color: '#FFD700' }}>Location:</strong> {worker.location}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: '#ffffff' }}>
              <strong style={{ color: '#FFD700' }}>Languages:</strong> {worker.languages.join(', ')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: '#ffffff' }}>
              <strong style={{ color: '#FFD700' }}>Availability:</strong> {worker.availability}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ color: '#FFD700', mb: 1 }}>
                Skills:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {worker.skills.map((skill, index) => (
                  <Box
                    key={index}
                    sx={{
                      bgcolor: 'rgba(255, 107, 0, 0.2)',
                      color: '#ffffff',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.75rem',
                      border: '1px solid #ff6b00'
                    }}
                  >
                    {skill}
                  </Box>
                ))}
              </Box>
            </Box>
          </CardContent>
          <Box sx={{ p: 2, pt: 0 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleBooking(worker)}
              sx={{
                bgcolor: '#ff6b00',
                '&:hover': {
                  bgcolor: '#ff8533',
                },
                color: '#ffffff',
                fontWeight: 600,
              }}
            >
              Book Now
            </Button>
          </Box>
        </Card>
      );
    } else {
      // Render new worker card with PostJob layout
      return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                component="img"
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #ff6b00'
                }}
                src={worker.profilePhotoUrl ? `http://localhost:5001/${worker.profilePhotoUrl}` : '/default-profile.png'}
                alt={worker.name}
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = '/default-profile.png';
                }}
              />
              <Box sx={{ ml: 2 }}>
                <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 600 }}>
                  {worker.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#ffffff' }}>
                  {worker.service}
                </Typography>
              </Box>
            </Box>

            <Typography variant="body2" sx={{ mb: 1, color: '#ffffff' }}>
              <strong style={{ color: '#FFD700' }}>Experience:</strong> {worker.experience} years
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: '#ffffff' }}>
              <strong style={{ color: '#FFD700' }}>Phone:</strong> {worker.phone}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: '#ffffff' }}>
              <strong style={{ color: '#FFD700' }}>Location:</strong> {worker.address.city}, {worker.address.district}
            </Typography>
            <Typography variant="body2" sx={{ color: '#ffffff' }}>
              <strong style={{ color: '#FFD700' }}>Address:</strong> {worker.address.street}
            </Typography>
          </CardContent>
          <Box sx={{ p: 2, pt: 0 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleBooking(worker)}
              sx={{
                bgcolor: '#ff6b00',
                '&:hover': {
                  bgcolor: '#ff8533',
                },
                color: '#ffffff',
                fontWeight: 600,
              }}
            >
              Book Now
            </Button>
          </Box>
        </Card>
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        p: 3, 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #333333 100%)',
        position: 'relative'
      }} className="find-workers-page">
        <Box sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(255, 107, 0, 0.1) 0%, rgba(17, 16, 16, 0) 100%)',
          pointerEvents: 'none'
        }} />
        
        <Box sx={{ position: 'relative', maxWidth: '1200px', margin: '0 auto' }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#FFD700', fontWeight: 600, mb: 4, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
            Find Workers
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Search workers"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearch();
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#FFD700' }}>Category</InputLabel>
                <Select
                  value={category}
                  label="Category"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  sx={{
                    color: '#ffffff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ff6b00',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#FFD700',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ff6b00',
                    },
                  }}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Location"
                variant="outlined"
                value={workerLocation}
                onChange={handleLocationChange}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSearch}
                sx={{
                  height: '56px',
                  bgcolor: '#ff6b00',
                  '&:hover': {
                    bgcolor: '#ff8533',
                  },
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {workers.map((worker) => (
              <Grid item xs={12} sm={6} md={4} key={worker.id || worker._id || `worker-${worker.name}-${worker.category || worker.service}`}>
                {renderWorkerCard(worker)}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};


export default FindWorkers;
