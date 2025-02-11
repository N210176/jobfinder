import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import { useLocation } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './BookingPage.css';

function BookingPage() {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState('');
  const location = useLocation();
  const worker = location.state?.worker;
