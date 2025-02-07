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

  const timeSlots = {
    Morning: ['9:00 AM', '10:00 AM', '11:00 AM'],
    Afternoon: ['12:00 PM', '2:00 PM', '3:00 PM'],
    Evening: ['4:00 PM', '5:00 PM', '6:00 PM']
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTimeSlotSelect = (time) => {
    setTimeSlot(time);
  };

  const handleConfirmBooking = () => {
    if (date && timeSlot) {
      alert('Booking confirmed! Worker will contact you');
      // Here you can add logic to save the booking
    } else {
      alert('Please select both date and time slot');
    }
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
                {slots.map((slot) => (
                  <button
                    key={slot}
                    className={`slot-btn ${timeSlot === slot ? 'selected' : ''}`}
                    onClick={() => handleTimeSlotSelect(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="booking-summary">
        <h3>Booking Summary</h3>
        <p>Date: {date.toLocaleDateString()}</p>
        <p>Time: {timeSlot}</p>
        <button 
          className="confirm-btn"
          onClick={handleConfirmBooking}
          disabled={!date || !timeSlot}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default BookingPage;
