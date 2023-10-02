import React, { useEffect } from 'react'
import './form.css'
import { Link,useNavigate } from 'react-router-dom';
import  { useState } from 'react'
import axios from 'axios';


function EmployeeLogin() {

  const [email,setEmail]=useState()
  const [password,setPassword]=useState()  
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userLoggedIn = async () => {
      const token = localStorage.getItem("usersdatatoken");
  
      if (token) {
        try {
          // Send a request to the backend to validate the token
          const response = await axios.post(
            "http://localhost:5000/validateToken",
{},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
       
  
          if (response.status === 200) {
            // Token is valid, navigate to the dashboard
            navigate('/dashboard');
          } else {
            // Handle unexpected response status codes
            console.error('Unexpected response status:', response.status);
          }
        } catch (error) {
          // Handle errors in a more specific way
          if (axios.isCancel(error)) {
            // Request was canceled
            console.error('Request was canceled:', error);
          } else if (error.response) {
            // Server responded with an error status code
            if (error.response.status === 401) {
              // Unauthorized, token is invalid
              console.error('Token is invalid');
            } else {
              console.error('Server error:', error.response.data);
            }
          } else if (error.request) {
            // Request was made but no response was received
            console.error('No response received:', error.request);
          } else {
            // Something else went wrong
            console.error('Unknown error occurred:', error);
          }
        }
      }
    };
  
    userLoggedIn();
  }, []);
  
    


  const handleSubmit = async(e)=>{

    e.preventDefault()

   
    
    try {
      const response = await axios.post("http://localhost:5000/EmployeeLogin", {
        email,
        password,
      }
      );

   console.log(response.data.result)
     if (response.status === 201) {
      setErrorMessage('');
      localStorage.setItem("usersdatatoken",response.data.result.token)
      
       alert("Login Successfull")
       navigate('/dashboard');
     }
    
   } catch (error) {
     if (error.response && error.response.status === 400) {
      
       setErrorMessage('Invalid password');
     } else if (error.response && error.response.status === 501){
       // Other errors
     
       setErrorMessage('User not found');
     }else{
      console.error('Error:', error);
      setErrorMessage('Something went wrong');
     }
   }
   };



  return (

<div className="col-lg-6 m-auto mt-5">
  
        <section className="container pt-5" id="enroll">
         <h2 className="text-center"> Employee Login</h2>
         {errorMessage && <div className=" text-center error-message">{errorMessage}</div>}
         <form  name="form" className="form" onSubmit={handleSubmit}>
   
 

           <div className="input-box">
          
          <input type="email" className="form-control" name="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter Email Address" required></input>
            </div>

             <div className="input-box">
     
               <input type="password" className="form-control" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" required></input>
   
           </div>
          
       
         
           <div className="text-center"><button type="submit">Send Message</button>

          </div>
          
         </form><br />
         <p className='text-center'>Create an account <span><Link to="/EmployeeRegistration">Signup</Link></span></p>
     
     

   
      
 
       </section>

</div>

  )
}

export default EmployeeLogin
