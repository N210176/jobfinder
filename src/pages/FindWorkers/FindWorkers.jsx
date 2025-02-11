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
