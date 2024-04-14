import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function NewPassword() {
  const { token } = useParams(); // Extract token from URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passMessage,setPassMessage] = useState("")
const [linkStatus,setLinkStatus] = useState(false)
  useEffect(() => {
    // Validate token when component mounts
    validateToken();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const validateToken = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/validate-token/${token}`);
      console.log(response.status);
    if(response.status === 200){
        console.log("Token valid")
   setLinkStatus(true)
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {

        setErrorMessage('Expired Link');
      } else if (error.response && error.response.status === 404) {
        setErrorMessage('Reset token not found.');
      }  else {
        console.error("Error:", error);
        setErrorMessage("Something went wrong");
      }
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setPassMessage('Passwords do not match');
      return;
    }else{
      setPassMessage('')
      
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/reset-password/${token}`, {
        password,
        confirmPassword,
      });

      if (response.status === 200) {
        setSuccessMessage('Password reset successful.');
         // Clear password fields after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
        setPassword('');
        setConfirmPassword('');

        // Navigate to login page after clearing success message
        window.location.href = '/';
      }, 3000);
      }
    } catch (error) {
    if(error.response.status=== 404){
      setErrorMessage('User not found');
    }else if(error.response.status=== 400){
      setErrorMessage('Invalid token');
    }else{
      setErrorMessage('Internal server error');
    }
  }
  };

  return (
    <div className="container">
      <lord-icon
        src="https://cdn.lordicon.com/fygyhyze.json"
        trigger="loop"
        delay="2000"
        style={{ width: '90px', height: '90px' }}
      ></lord-icon>
      <div className="row justify-content-center">
        <div className="col-md-12">
{  <div className="text-danger text-center">{passMessage}</div>}
            {successMessage && <div className="text-success text-center">{successMessage}</div>}
         {linkStatus? <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>New Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter new password"
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm new password"
              />
            </div>
          
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Reset Password
              </button>
            </div>
          </form>: errorMessage && <div className="text-danger text-center">{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
