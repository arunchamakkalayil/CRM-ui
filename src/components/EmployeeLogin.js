import React from 'react'
import './form.css'
import { Route, Link, Routes } from 'react-router-dom';

import EmployeeRegistration from './EmployeeRegistration';

function EmployeeLogin() {
  return (

<div class="col-lg-6 m-auto mt-5">
  
        <section class="container pt-5" id="enroll">
         <h2 class=""> Employee Login</h2>
         <form  name="form" class="form">
           <div class="input-box">
      
          
             <input type="text" name="Name" class="form-control" placeholder="Enter Full Name" required></input>
           </div>
           <div class="column">
             <div class="input-box">
     
               <input type="phone" class="form-control" name="Phone" placeholder="Phone" required></input>
             </div>
             <div class="input-box">
          
               <input type="email" class="form-control" name="Email" placeholder="Enter Email Address" required></input>
             </div>
           </div>
          
           <div class="column">
             <div class="input-box">
               <div class="select-box">
                 <select name="Education" onchange='checkvalue(this.value)' >
                   <option hidden>Education</option>
                   <option>Plus Two</option>
                   <option>Diploma</option>
                   <option>UG</option>
                   <option>PG</option>
                   <option>PhD</option>
                  
                 </select>
               </div>
               
             </div>
           </div>
           <div class="input-box address">
             <div class="column">
               <div class="select-box">
                 <select name="Interested Domain">
                   <option hidden>Domain</option>
                   <option>Cybersecurity</option>
                   <option>Data Science</option>
                   <option>Full Stack Development</option>
                   <option>Project Management</option>
                   <option>IT Networking</option>
                   <option>Cloud Computing</option>
                 </select>
               </div>
             </div>
           </div>
         
           <div class="text-center"><button type="submit">Send Message</button>

          </div>
          
         </form><br />
         <p className='text-center'>Create an account <span><Link to="/EmployeeRegistration">Signup</Link></span></p>
         <Routes>
      <Route  path='/EmployeeRegistration' element={< EmployeeRegistration />}></Route>
      </Routes>

   
      
 
       </section>

</div>

  )
}

export default EmployeeLogin
