import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Card, CardContent, Typography, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const FindWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [location, setLocation] = useState('');

  // Sample worker data (replace with actual API call)
  useEffect(() => {
    // Simulated data - replace with actual API call
    const sampleWorkers = [
      {
        id: 1,
        name: 'John Doe',
        category: 'Plumber',
        location: 'Mumbai',
        rating: 4.5,
        experience: '5 years',
        hourlyRate: '₹500'
      },
      // Add more sample workers as needed
    ];
    setWorkers(sampleWorkers);
  }, []);

  const handleSearch = () => {
    // Filter workers based on search criteria
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
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
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {worker.name}
                </Typography>
                <Typography color="textSecondary">
                  Category: {worker.category}
                </Typography>
                <Typography color="textSecondary">
                  Location: {worker.location}
                </Typography>
                <Typography color="textSecondary">
                  Experience: {worker.experience}
                </Typography>
                <Typography color="textSecondary">
                  Rating: {worker.rating} ⭐
                </Typography>
                <Typography color="textSecondary">
                  Rate: {worker.hourlyRate}/hour
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Contact Worker
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FindWorkers;
