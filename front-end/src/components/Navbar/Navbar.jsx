import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import './Navbar.css';
import logo from '../../assets/logo-home.png'

import Scheduler from '../../Pages/Scheduler/Scheduler'; 

const Navbar = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleDemoClick = () => {
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  return (
      <nav className="main-nav">
       <div className='navbar'>
         <Link to='/' className='nav-logo'>
          <img src={logo} alt='logo-home'/>
         </Link>
         <h1 className='nav-item'>Solutions <i className="fas fa-chevron-down icon"></i></h1>
         <h1 className='nav-item'>Product <i className="fas fa-chevron-down icon"></i></h1>
         <h1 className='nav-item'>Resources <i className="fas fa-chevron-down icon"></i></h1>
         <h1 className='nav-item'>Pricing</h1>
         <div className='navbar-right'>
          <Link to='/' className='nav-links'>Log in</Link>      
          <button onClick={handleDemoClick} className='nav-btns'>Get a Demo</button>
          <button className='nav-btn1'>Try for free</button>
         </div>
       </div>
       {showOverlay && (
         <div className='overlay'>
           <Scheduler handleClose={handleCloseOverlay} />
         </div>
       )}
    </nav>
  );
}

export default Navbar;
