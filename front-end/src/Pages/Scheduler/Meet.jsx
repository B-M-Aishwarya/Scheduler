import React from 'react';
import './meet.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faGlobeAsia, faVideo } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faUser } from '@fortawesome/free-regular-svg-icons';

const Meet = ({ handleClose, selectedTimeSlot, selectedDate }) => {
  return (
    <div className='sch-content'>
        <button onClick={handleClose} className='close-button'>X</button>
        <div>
        <img src={logo} alt='logo-home' className='image' />
        <h1><FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', marginRight: '10px' }} />
          You're Scheduled</h1>
        <p>A calendar invitation has been sent to your email address.</p>
        <div className='meet-sch'>
        <h2>Scheduler Demo</h2>
        <p><FontAwesomeIcon icon={faUser} /> John Doe</p>
        <p><FontAwesomeIcon icon={faCalendar} /> {selectedTimeSlot}
          , {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
        <p><FontAwesomeIcon icon={faGlobeAsia} /> India Standard Time</p>
        <p><FontAwesomeIcon icon={faVideo} /> Web conferencing details to follow.</p>
        </div>
        <div className="ribbon ribbon-top-right">
            <span>POWERED BY<br />Calendly</span>
        </div>
        <div className='bot-con'>
           <h4>Schedule your own meetings with calendly for free</h4>
           <p>Eliminate the back-and-forth emails for finding time.</p>
           <button>Sign up with Google</button>
           <button>Sign up with Microsoft</button><br/>
           <Link to="/" className='mail'>Sign up with work email</Link>
        </div>
      </div>
    </div>
  );
};

export default Meet;
