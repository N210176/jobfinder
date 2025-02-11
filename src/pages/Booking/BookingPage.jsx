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

  // Time slots in IST
  const timeSlots = {
    'Morning': ['09:00', '10:00', '11:00'],
    'Afternoon': ['12:00', '14:00', '15:00'],
    'Evening': ['16:00', '17:00', '18:00']
  };

  // Function to check if a time slot is in the past
  const isTimeSlotValid = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const selectedDateTime = new Date(date);
    selectedDateTime.setHours(hours, minutes, 0, 0);
    
    const now = new Date();
    return selectedDateTime > now;
  };

  // Format time slot for display in IST 12-hour format
  const formatTimeSlot = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period} IST`;
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setTimeSlot(''); // Reset time slot when date changes
  };

  const handleTimeSlotSelect = (time) => {
    if (isTimeSlotValid(time)) {
      setTimeSlot(time);
    } else {
      alert('Please select a future time slot');
    }
  };

  const handleConfirmBooking = () => {
    if (!date || !timeSlot) {
      alert('Please select both date and time slot');
      return;
    }

    if (!isTimeSlotValid(timeSlot)) {
      alert('Selected time slot is in the past. Please choose a future time.');
      return;
    }
