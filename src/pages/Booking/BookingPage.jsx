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

    // Format the booking time for display
    const bookingDateTime = new Date(date);
    const [hours, minutes] = timeSlot.split(':');
    bookingDateTime.setHours(hours, minutes, 0, 0);

    alert(`Booking confirmed for ${bookingDateTime.toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'short'
    })}! Worker will contact you.`);
    // Here you can add logic to save the booking
  };

  return (
    <div className="booking-page">
      <h2>Book Appointment {worker ? `with ${worker.name}` : ''}</h2>
      
      <div className="booking-container">
        <div className="calendar-section">
          <h3>Select Date</h3>
          <Calendar
            onChange={handleDateChange}
            value={date}
            minDate={new Date()}
          />
        </div>

        <div className="time-slots-section">
          <h3>Select Time Slot</h3>
          {Object.entries(timeSlots).map(([period, slots]) => (
            <div key={period} className="time-period">
              <h4>{period}</h4>
              <div className="slots">
                {slots.map((slot) => {
                  const isValid = isTimeSlotValid(slot);
                  return (
                    <button
                      key={slot}
                      className={`slot-btn ${timeSlot === slot ? 'selected' : ''} ${!isValid ? 'disabled' : ''}`}
                      onClick={() => handleTimeSlotSelect(slot)}
                      disabled={!isValid}
                    >
                      {formatTimeSlot(slot)}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="booking-actions">
          <button 
            className="confirm-btn"
            onClick={handleConfirmBooking}
            disabled={!date || !timeSlot}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
