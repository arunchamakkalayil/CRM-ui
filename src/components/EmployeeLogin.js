import React from 'react'
import './form.css'
import { Link } from 'react-router-dom';



function EmployeeLogin() {
  return (

<div className="col-lg-6 m-auto mt-5">
  
        <section className="container pt-5" id="enroll">
         <h2 className=""> Employee Login</h2>
         <form  name="form" className="form">
   
 

           <div className="input-box">
          
          <input type="email" className="form-control" name="Email" placeholder="Enter Email Address" required></input>
            </div>

             <div className="input-box">
     
               <input type="password" className="form-control" name="password" placeholder="password" required></input>
   
           </div>
          
       
         
           <div className="text-center"><button type="submit">Send Message</button>

          </div>
          
         </form><br />
         <p classNameName='text-center'>Create an account <span><Link to="/EmployeeRegistration">Signup</Link></span></p>
     
     

   
      
 
       </section>

</div>

  )
}

export default EmployeeLogin
