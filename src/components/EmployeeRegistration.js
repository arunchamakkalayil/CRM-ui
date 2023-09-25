import React, { useState } from 'react'
import './form.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
function EmployeeRegistration() {
  
  const [name,setName]=useState()
  const [empid,setEmpid]=useState()
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const [phone,setPhone]=useState()
  const [errorMessage, setErrorMessage] = useState('');
  
  
  const handleSubmit = async(e)=>{

 e.preventDefault()

 try {
  const response = await axios.post('http://localhost:5000/EmployeeRegistration', {
    name,
    empid,
    email,
    password,
    phone,
  });

  if (response.status === 201) {
    // Registration successful
    // Redirect to login or display a success message
  }
} catch (error) {
  if (error.response && error.response.status === 400) {
    // User already exists
    setErrorMessage('User with this number exists');
  } else {
    // Other errors
    console.error('Error:', error);
    setErrorMessage('Error during registration');
  }
}
};
  return (

<div className="col-lg-6 m-auto mt-5">
  
        <section className="container pt-5" id="enroll">
         <h2 className="">Employee Registration</h2>
         {errorMessage && <div className="error-message">{errorMessage}</div>}
         <form  name="form" className="form" onSubmit={handleSubmit}>
         <div className="input-box">
      
          
      <input type="text" name="empid" value={empid} onChange={(e)=>{setEmpid(e.target.value)}} className="form-control" placeholder="Employee ID" required></input>
    </div>
           <div className="input-box">
      
          
             <input type="text" name="Name" value={name} onChange={(e)=>{setName(e.target.value)}} className="form-control" placeholder="Enter Full Name" required></input>
           </div>
           <div className="input-box">
          
          <input type="email" className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}} name="Email" placeholder="Enter Email Address" required></input>
        </div>
        <div className="input-box">
          
          <input type="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}} name="Password" placeholder="Password" required></input>
        </div>
           <div className="column">
             <div className="input-box">
     
               <input type="phone" value={phone} className="form-control" onChange={(e)=>{setPhone(e.target.value)}} name="Phone" placeholder="Phone" required></input>
             </div>
            
           </div>
           <div className="text-center"><button type="submit"  >Send Message</button>

          </div>
          
         </form><br />
         <p classNameName='text-center'>Already have an account ? <span><Link to="/EmployeeLogin">Login</Link></span></p>
       </section>
     
</div>

  )
}

export default EmployeeRegistration
