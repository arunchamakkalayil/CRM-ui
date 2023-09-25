import React from 'react'
import {  Link} from 'react-router-dom';

import './style.css'



function Home() {
  return (
    <>
  
    <div classNameName='mt-5'>
    <li><Link to="/AdminLogin">Admin Login</Link></li>
<li><Link to="/EmployeeLogin">Employee Login</Link></li>

   
    
 
   
    </div>
    
    </>
  )
}

export default Home
