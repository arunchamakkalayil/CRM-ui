import React from 'react';
import { Link } from 'react-router-dom';
import './css/home.css';

function Home() {
  const iconStyle = {
    fontSize: '7rem', // Adjust the font-size value as needed
  };

  return (
    <div className="container d-flex justify-content-around align-items-center min-vh-100">
     
      <div className='item-container'>
        <Link to="/EmployeeLogin" className="link-no-underline">
          <div>
            <i className="bi bi-people-fill" style={iconStyle}></i>
          </div>
       
         </Link>
      </div>
    </div>
  );
}

export default Home;
