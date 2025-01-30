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
import SearchIcon from '@mui/icons-material/Search';
import './FindWorkers.css';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a2634',
    },
    secondary: {
      main: '#FFD700',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
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
        },
        contained: {
          backgroundColor: '#1a2634',
          color: '#FFD700',
          '&:hover': {
            backgroundColor: '#FFD700',
            color: '#1a2634',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#FFD700',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1a2634',
            },
          },
        },
      },
    },
  },
});

const FindWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const sampleWorkers = [
      {
        id: 1,
        name: 'Rajesh Kumar',
        category: 'Plumber',
        location: 'Mumbai',
        rating: 4.8,
        experience: '8 years',
        hourlyRate: '₹600',
        skills: ['Pipe Fitting', 'Leak Repair', 'Bathroom Installation'],
        languages: ['Hindi', 'English', 'Marathi'],
        availability: 'Weekdays & Weekends',
        completedJobs: 234,
        profileImage: 'https://images.unsplash.com/photo-1617960149025-9a79b0f0c45b?w=500&auto=format&fit=crop&q=80',
        verified: true
      },
      {
        id: 2,
        name: 'Priya Singh',
        category: 'Electrician',
        location: 'Delhi',
        rating: 4.9,
        experience: '6 years',
        hourlyRate: '₹550',
        skills: ['Wiring', 'Circuit Installation', 'Smart Home Setup'],
        languages: ['Hindi', 'English'],
        availability: 'Weekdays',
        completedJobs: 189,
        profileImage: 'https://images.unsplash.com/photo-1621608038222-6cc771faee80?w=500&auto=format&fit=crop&q=80',
        verified: true
      },
      {
        id: 3,
        name: 'Mohammed Ali',
        category: 'Carpenter',
        location: 'Bangalore',
        rating: 4.7,
        experience: '12 years',
        hourlyRate: '₹700',
        skills: ['Custom Furniture', 'Wood Repair', 'Cabinet Making'],
        languages: ['Kannada', 'English', 'Hindi'],
        availability: 'All Days',
        completedJobs: 345,
        profileImage: 'https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=500&auto=format&fit=crop&q=80',
        verified: true
      },
      {
        id: 4,
        name: 'Lakshmi Reddy',
        category: 'House Cleaner',
        location: 'Hyderabad',
        rating: 4.6,
        experience: '4 years',
        hourlyRate: '₹400',
        skills: ['Deep Cleaning', 'Organization', 'Sanitization'],
        languages: ['Telugu', 'Hindi', 'English'],
        availability: 'Weekdays',
        completedJobs: 156,
        profileImage: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=500&auto=format&fit=crop&q=80',
        verified: true
      },
      {
        id: 5,
        name: 'Amit Sharma',
        category: 'Painter',
        location: 'Pune',
        rating: 4.8,
        experience: '10 years',
        hourlyRate: '₹650',
        skills: ['Interior Painting', 'Exterior Painting', 'Wallpaper Installation'],
        languages: ['Hindi', 'Marathi', 'English'],
        availability: 'Flexible',
        completedJobs: 278,
        profileImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop&q=80',
        verified: true
      },
      {
        id: 6,
        name: 'Sarah Thomas',
        category: 'Gardener',
        location: 'Chennai',
        rating: 4.7,
        experience: '5 years',
        hourlyRate: '₹450',
        skills: ['Landscaping', 'Plant Care', 'Garden Maintenance'],
        languages: ['Tamil', 'English'],
        availability: 'Morning Hours',
        completedJobs: 143,
        profileImage: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500&auto=format&fit=crop&q=80',
        verified: true
      },
      {
        id: 7,
        name: 'Ravi Verma',
        category: 'AC Technician',
        location: 'Mumbai',
        rating: 4.9,
        experience: '7 years',
        hourlyRate: '₹800',
        skills: ['AC Repair', 'Installation', 'Maintenance'],
        languages: ['Hindi', 'English', 'Marathi'],
        availability: 'All Days',
        completedJobs: 312,
        profileImage: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&auto=format&fit=crop&q=80',
        verified: true
      },
      {
        id: 8,
        name: 'Anita Desai',
        category: 'Cook',
        location: 'Delhi',
        rating: 4.8,
        experience: '15 years',
        hourlyRate: '₹750',
        skills: ['Indian Cuisine', 'Baking', 'Dietary Cooking'],
        languages: ['Hindi', 'English', 'Punjabi'],
        availability: 'Flexible Hours',
        completedJobs: 423,
        profileImage: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=500&auto=format&fit=crop&q=80',
        verified: true
      },
      {
        id: 9,
        name: 'John Wilson',
        category: 'Security Guard',
        location: 'Bangalore',
        rating: 4.6,
        experience: '9 years',
        hourlyRate: '₹500',
        skills: ['Surveillance', 'Emergency Response', 'Access Control'],
        languages: ['English', 'Kannada', 'Hindi'],
        availability: '24/7 Shifts',
        completedJobs: 167,
        profileImage: 'https://images.unsplash.com/photo-1582295523904-6db51cc5c28f?w=500&auto=format&fit=crop&q=80',
        verified: true
      }
    ];
    setWorkers(sampleWorkers);
  }, []);

  const handleSearch = () => {
    const filteredWorkers = workers.filter(worker => {
      const matchesSearch = worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          worker.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = category === 'all' || worker.category === category;
      const matchesLocation = !location || worker.location.toLowerCase().includes(location.toLowerCase());
      
      return matchesSearch && matchesCategory && matchesLocation;
    });
    
    setWorkers(filteredWorkers);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }} className="find-workers-page">
        <Typography variant="h4" gutterBottom sx={{ color: '#1a2634', fontWeight: 600, mb: 4 }}>
          Find Workers
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Search workers"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="Plumber">Plumber</MenuItem>
                <MenuItem value="Electrician">Electrician</MenuItem>
                <MenuItem value="Carpenter">Carpenter</MenuItem>
                <MenuItem value="Painter">Painter</MenuItem>
                <MenuItem value="House Cleaner">House Cleaner</MenuItem>
                <MenuItem value="Gardener">Gardener</MenuItem>
                <MenuItem value="AC Technician">AC Technician</MenuItem>
                <MenuItem value="Cook">Cook</MenuItem>
                <MenuItem value="Security Guard">Security Guard</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Location"
              variant="outlined"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              sx={{ height: '56px' }}
            >
              Search
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {workers.map((worker) => (
            <Grid item xs={12} sm={6} md={4} key={worker.id}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                backgroundColor: 'white',
                border: '1px solid rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                {worker.verified && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      backgroundColor: '#1a2634',
                      color: '#FFD700',
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
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      component="img"
                      src={worker.profileImage}
                      alt={worker.name}
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '3px solid #1a2634',
                        mr: 2
                      }}
                      onError={(e) => {
                        e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(worker.name) + '&background=1a2634&color=ffd700&size=80';
                      }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ color: '#1a2634', fontWeight: 600 }}>
                        {worker.name}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
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

                  <Box sx={{ 
                    backgroundColor: '#f8f9fa', 
                    borderRadius: '8px', 
                    p: 2, 
                    mb: 2 
                  }}>
                    <Typography sx={{ color: '#1a2634', fontWeight: 500, mb: 1 }}>
                      Rate: {worker.hourlyRate}/hour
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {worker.experience} Experience
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {worker.completedJobs} Jobs Completed
                    </Typography>
                  </Box>

                  <Typography sx={{ color: '#1a2634', fontWeight: 500, mb: 1 }}>
                    Skills
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {worker.skills.map((skill, index) => (
                      <Box
                        key={index}
                        component="span"
                        sx={{
                          display: 'inline-block',
                          bgcolor: '#1a2634',
                          color: '#FFD700',
                          borderRadius: '16px',
                          px: 1.5,
                          py: 0.5,
                          mr: 1,
                          mb: 1,
                          fontSize: '0.875rem',
                        }}
                      >
                        {skill}
                      </Box>
                    ))}
                  </Box>

                  <Typography sx={{ color: '#1a2634', fontWeight: 500, mb: 1 }}>
                    Location & Availability
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography sx={{ color: 'text.secondary' }}>
                      📍 {worker.location}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      🕒 {worker.availability}
                    </Typography>
                  </Box>

                  <Typography sx={{ color: '#1a2634', fontWeight: 500, mb: 1 }}>
                    Languages
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                    {worker.languages.join(' • ')}
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 'auto',
                      height: '48px',
                      fontSize: '1rem'
                    }}
                  >
                    Contact Worker
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default FindWorkers;
