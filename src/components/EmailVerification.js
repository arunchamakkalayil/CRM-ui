import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VerificationIcon from './VerificationIcon';

const EmailVerification = () => {
  // Get the verification token from the URL params
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [message,setmessage] = useState(" ")
  const [icon, setIcon]= useState("")

  useEffect(() => {
    // Send a request to your backend to verify the email using the token
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/verify-email/${token}`);
        if(response.status === 404){
          // Email verification failed
          setIcon(<i class="bi bi-check2-circle text-info"></i>)
          setmessage('Invalid Token');
        } 
        else if(response.status === 500){
          setIcon(<i class="bi bi-check2-circle text-info"></i>)
          setmessage("Internal Server Error")
        }
         else if   (response.status === 200) {
          setIcon(<i class="bi bi-check2-circle text-info"></i>)
          setmessage('Email verified successfully')
     
        }

      
     
      } catch (error) {
        console.error('Error verifying email:', error);
        setIcon(<i class="bi bi-exclamation-circle text-danger"></i>)
        setmessage("Error verifying ")
      } finally {
        setIsLoading(false); // Update loading state after request completes
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className='d-flex flex-column justify-content-center text-center align-items-center w-100'>
      
      {isLoading ? (
        <h5>Verifying your email...</h5>
      ) : (
        <VerificationIcon  message={message} icon={icon}/>
      )}
    </div>
  );
};

export default EmailVerification;
