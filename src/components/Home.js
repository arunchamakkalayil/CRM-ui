import React from 'react'
import { Route, Link, Routes } from 'react-router-dom';

import './style.css'
import AdminLogin from './AdminLogin';
import EmployeeLogin from './EmployeeLogin';


function Home() {
  return (
    <>
  
    <div className='mt-5'>
    <li><Link to="/AdminLogin">Admin Login</Link></li>
<li><Link to="/EmployeeLogin">Employee Login</Link></li>

   
      <Routes>

        <Route path="/AdminLogin" element={< AdminLogin />}>
   
        </Route>
     
        <Route path="/EmployeeLogin" element={< EmployeeLogin />}>
   
   </Route>
      </Routes>
 
   
    </div>
    
    </>
  )
}

export default Home
