import React from 'react'
import './form.css'
import { Link } from 'react-router-dom';

function Registration() {
  return (

<div className="col-lg-6 m-auto mt-5">
  
        <section className="container pt-5" id="enroll">
         <h2 className="text-center">Admin Signup</h2>
         <form  name="form" className="form">
           <div className="input-box">
      
          
             <input type="text" name="Name" className="form-control" placeholder="Enter Full Name" required></input>
           </div>
           <div className="column">
             <div className="input-box">
     
               <input type="phone" className="form-control" name="Phone" placeholder="Phone" required></input>
             </div>
             <div className="input-box">
          
               <input type="email" className="form-control" name="Email" placeholder="Enter Email Address" required></input>
             </div>
           </div>
          
           <div className="input-box">
      
          
      <input type="text" name="adminId" className="form-control" placeholder="Admin ID" required></input>
    </div>
         
           <div className="text-center"><button type="submit">Send Message</button>

          </div>
          
         </form><br />
         <p className='text-center'>Already have an account ? <span><Link to="/AdminLogin">Login</Link></span></p>
       </section>
     
</div>

  )
}

export default Registration
