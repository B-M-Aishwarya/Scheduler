import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className='container'>
      <h1>Pricing</h1>
      <p>Start your 14-day free trial. No CC required.</p>
      <div className='row card-container'>
        <div className='col-lg-6'>
          <div className='card1'>
            <div className='left-content'>
              <h3 className='card-title'>Standard</h3>
            </div>
            <div className='right-content'>
              <div className='price-info'>
                <h2>$10</h2>
                <p>per user, per<br/>month<br/>billed annually</p>
              </div>
              <p>Version History: 90 days<br/>Read-only users: unlimited</p>
              <button className='btn btn-primary'>Start Your Free Trial</button>
            </div>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='card'>
            <div className='left-content'>
              <h3 className='card-title'>Pro</h3>
            </div>
            <div className='right-content'>
              <div className='price-info'>
                <h2>$17</h2>
                <p>per user, per<br/>month<br/>billed annually</p>
              </div>
              <p>Version history: unlimited<br/>Read-only users: unlimited,<br/>
                 Group permissions, SAML + SSO,<br/>No Scheduler branding on forms,<br/>
                 Extra-caring support</p>
              <button className='btn btn-primary'>Start Your Free Trial</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
