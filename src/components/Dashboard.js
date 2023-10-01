import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Axios from "axios";

function Dashboard() {
  const dashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    console.log(token);
  
    try {
      const response = await Axios.get("http://localhost:5000/dashboard", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data)

      if (response.status === 200) {
        // User is valid, you can set some state or context variable here
        console.log("User is valid");
      } else {
        // User is not valid, handle accordingly
        console.log("User is not valid");
      }
    } catch (error) {
      // Handle network errors or other errors here
      console.error(error);
    }
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
