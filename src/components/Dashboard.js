import React, { useEffect, useContext, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, Link } from "react-router-dom";
import Context from "../context/Context";
import Table from "./Table";
import axios from "axios";


function Dashboard() {

  const [closed, setClosed] = useState('0');
  const [total, setTotal] = useState('0');
  const [pending, setPending] = useState('0');
  const [notConnected, setNotConnected] = useState('0');

  const navigate = useNavigate();
  const { delMessage, delStatus } = useContext(Context);
  
  
  useEffect(() => {
    const dashboardValid = async () => {
      let token = localStorage.getItem("usersdatatoken");

      if (!token) navigate("/EmployeeLogin");
    };
    dashboardValid();

    getCount();
  }, [navigate]);

  const getCount = async () => {
    try {
      const response = await axios.get("http://localhost:5000/count");
     
      setClosed(response.data.data.closed)
      setPending(response.data.data.pending)
      setNotConnected(response.data.data.not_connected)
      setTotal(response.data.data.total)

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };




  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Navbar />
      <div
        style={{
          marginTop: "100px",
          position: "relative", // To allow positioning the floating button
        }}
      >
        <Link
          to="/create"
          className="btn btn-success btn-floating"
          style={{
            position: "fixed",
            bottom: "20px", // Adjust these values for the desired position
            right: "20px", // Adjust these values for the desired position
            padding: "10px 20px",
            borderRadius: "50%",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            fontSize: "24px",
          }}
        >
          +
        </Link>
        <div className="px-5 ">
          <div className="row">
            <div className="col-md-3">
              <div className="card bg-primary">
                <div className="card-body">
                  <h5 className="card-title text-white">{total}</h5>
                  <p className="card-text text-white">Total Leads</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-success">
                <div className="card-body">
                  <h5 className="card-title text-white">{closed}</h5>
                  <p className="card-text text-white">Closed Leads</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-warning">
                <div className="card-body">
                  <h5 className="card-title text-white">{pending}</h5>
                  <p className="card-text text-white">Pending Leads</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-danger">
                <div className="card-body">
                  <h5 className="card-title text-white">{notConnected}</h5>
                  <p className="card-text text-white">Not connected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {delMessage && (
          <div className="alert alert-success" role="alert">
            {delStatus}
          </div>
        )}
        <div>
          <Table onClick={getCount} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
