import React, { useState, useEffect } from 'react';
import './Scheduler.css';
import Calendar from 'react-calendar';
import logo from '../../assets/logo.png';
import Meet from '../../Pages/Scheduler/Meet'
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAsia } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import 'react-calendar/dist/Calendar.css';

const Scheduler = ({ handleClose }) => {
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [isEventScheduled, setIsEventScheduled] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleBackClick = () => {
    setShowDetails(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const options = { timeZone: 'Asia/Kolkata', hour12: true, hour: 'numeric', minute: 'numeric' };
      const indianTime = now.toLocaleTimeString('en-US', options);
      setCurrentTime(indianTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    let firstFridayOfMonth = new Date(nextMonthDate);

    while (firstFridayOfMonth.getDay() !== 5) {
      firstFridayOfMonth.setDate(firstFridayOfMonth.getDate() + 1);
    }

    const datesToHighlight = [];
    let dateToAdd = today;

    while (dateToAdd <= firstFridayOfMonth) {
      if (dateToAdd.getDay() !== 0 && dateToAdd.getDay() !== 6) {
        datesToHighlight.push(new Date(dateToAdd));
      }
      dateToAdd.setDate(dateToAdd.getDate() + 1);
    }

    setHighlightedDates(datesToHighlight);
  }, []);

  const isDateHighlighted = ({ date }) => {
    return highlightedDates.some(
      highlightedDate => highlightedDate.toDateString() === date.toDateString()
    ) ? 'blue-date' : null;
  };

  const handleDateChange = date => {
    if (highlightedDates.some(highlightedDate => highlightedDate.toDateString() === date.toDateString())) {
      setSelectedDate(date);
      const availableTimeSlots = [
        '09:00', '09:30', '10:00',
        '10:30', '11:00', '11:30', '12:00',
        '12:30', '3:00', '4:00'
      ];
      setTimeSlots(availableTimeSlots);
      setIsDateSelected(true);
      setSelectedTimeSlot('');
      setIsTimeSelected(false);
      setShowDetails(false);
    }
  };

  const handleTimeSelection = time => {
    setIsTimeSelected(true);
    setSelectedTimeSlot(time);
  };

  const handleNextClick = () => {
    setShowDetails(true);
  };

  const handleDemoClick = () => {
      setShowOverlay(true);
  };
  
  const handleScheduleEvent = (event) => {
    event.preventDefault(); 
    setIsEventScheduled(true);
    setFormSubmitted(true); 
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <div className='sch-content'>
      {showDetails && (
        <div className="left-content">
          <button onClick={handleClose} className='close-button'>X</button>
          <FontAwesomeIcon icon={faArrowLeft} className="back-arrow" onClick={handleBackClick} />
          <img src={logo} alt='logo-home' className='image'/>
          <h1>Demo</h1>
          <p><FontAwesomeIcon icon={faClock} /> 45 min</p>
          {selectedTimeSlot && (
            <p>
              {selectedTimeSlot} -{' '}
              {(() => {
                const [hours, minutes] = selectedTimeSlot.split(':').map(Number);
                const endTime = new Date();
                endTime.setHours(hours);
                endTime.setMinutes(minutes + 45);
                return endTime.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                });
              })()}
            </p>
          )}
          <p>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <p style={{ textAlign: 'left' }}><FontAwesomeIcon icon={faGlobeAsia} /> India Standard Time</p>
          <span>Book a meeting with a product expert.<br/> We've helped hundreds of companies overcome
            <br />product management challenges. </span>
        </div>
      )}
      <div className='right-content'>
        {!showDetails && (
          <>
            <button onClick={handleClose} className='close-button'>X</button>
            <img src={logo} alt='logo-home' className='image'/>
            <h1>Demo</h1>
            <p><FontAwesomeIcon icon={faClock} /> 45 min</p>
            <span>Book a meeting with a product expert. We've<br /> helped hundreds of companies overcome
              <br />product management challenges. </span>
          </>
        )}
        {showDetails && (
          <div className="form-container">
            <div className="ribbon ribbon-top-right">
              <span>POWERED BY<br />Calendly</span>
            </div>
            <h1>Enter Details</h1>
            <form onSubmit={handleScheduleEvent}>
              <label htmlFor="name">Name *</label>
              <input type="text" id="name" name="name" required />
              <label htmlFor="email">Email *</label>
              <input type="email" id="email" name="email" required />
              <button type="submit">Add guests</button>
              <h4 style={{ textAlign: 'left' }}>I want Scheduler to work for: *</h4>
              <label>
                <input type="checkbox" name="myself" value="Myself" />
                <span role="img" aria-label="myself">🥕 Myself</span>
              </label>
              <label>
                <input type="checkbox" name="lessThan10" value="<10 people" />
                <span role="img" aria-label="Less than 10 people">👩🏽‍🤝‍👩🏻 &lt; 10 people</span>
              </label>
              <h4 style={{ textAlign: 'left' }}>Please, choose up to three options. You are more interested in: *</h4>
              <label>
                <input type="checkbox" name="strategy" value="strategy" />
                <span role="img" aria-label="strategy">🗻 Strategy</span>
              </label>
              <label>
                <input type="checkbox" name="product mngmt" value="product mngmt" />
                <span role="img" aria-label="product mngmt">🌞 Product Management</span>
              </label>
              <h4 style={{ textAlign: 'left' }}>Please, share anything that will help prepare for our meeting.</h4>
              <textarea id="meeting-info" name="meeting-info" rows="4" cols="50"></textarea>
              <label htmlFor="name">Please, share with us the name of your Scheduler workspace (if any)</label>
              <input type="text" id="share" name="share" />
              <button onClick={handleDemoClick} className='sch-btn'>Schedule Event</button>
            </form>
            {formSubmitted && showOverlay && (
              <div className='overlay'>
                <Meet handleClose={handleCloseOverlay} selectedTimeSlot={selectedTimeSlot}
                   selectedDate={selectedDate}/>
              </div>
            )}
          </div>
        )}
      </div>
      {!showDetails && (
        <div className='right-content'>
          <div className="ribbon ribbon-top-right">
            <span>POWERED BY<br />Calendly</span>
          </div>
          <h3>Select a Date & Time</h3>
          <div className='calendar-time-slots-container'>
            <div className='calendar-container'>
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                selectRange={false}
                tileClassName={isDateHighlighted}
              />
              <h4 style={{ textAlign: 'left' }}>Time Zone</h4>
              <p style={{ textAlign: 'left' }}><FontAwesomeIcon icon={faGlobeAsia} /> India Standard Time ({currentTime})</p>
            </div>
            <div className='scrol'>
              {isDateSelected && (
                <div className="time-slots-container">
                  <p>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                  {timeSlots.map((time, index) => (
                    <button
                      className={`time-slot ${selectedTimeSlot === time ? 'selected-time' : ''}`}
                      key={index}
                      onClick={() => handleTimeSelection(time)}
                    >
                      {time}
                    </button>
                  ))}
                  {isTimeSelected && (
                    <div className="next-button-container">
                      <button className="next-button" onClick={handleNextClick}>Next</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scheduler;
