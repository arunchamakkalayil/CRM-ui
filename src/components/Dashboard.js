import React, { useEffect } from "react";
import Navbar from "./Navbar";

import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate();
  const dashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    
    if(!token) navigate('/EmployeeLogin')
   
  };
  
  
  useEffect(() => {
    dashboardValid();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <Navbar />
        <div className="" style={{ width: "18rem" }}>
          <img className="card-img-top" src="employee.png" alt="profile" />
          <div className=" pt-3 card-body text-center">
            <h5 className="card-title">Welcome</h5>
            <p className="card-text">User</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
