import React from 'react';
import './css/VerificationIcon.css'; // Import CSS file for styling

function VerificationIcon(props) {
  return (
    <div className='verification-icon'>
      <div className='icon'>{props.icon}</div>
      <div className='message'>{props.message}</div>
    </div>
  );
}

export default VerificationIcon;
