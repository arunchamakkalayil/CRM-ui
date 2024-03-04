import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import LeadsMonthChart from "./LeadMonthChart";
import axios from "axios";

import "./style.css";
function Dashboard() {
  const [closed, setClosed] = useState("0");

  const [pending, setPending] = useState("0");
  const [notConnected, setNotConnected] = useState("0");
  const [lost, setLost] = useState("0");

  const navigate = useNavigate();

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

      setClosed(response.data.data.closed);
      setPending(response.data.data.pending);
      setNotConnected(response.data.data.not_connected);

      setLost(response.data.data.lost);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            margin: "0 auto",
            backgroundColor: "fff",
            zIndex: "-1",
          }}
        >
          <div
            style={{
              marginTop: "30px",
              position: "relative",
              width: "100%",
            }}
          >
            <div className="px-5">
              <div className="row">
              
                <div className="col-md-3">
                <div
                    className="card shadow"
                    style={{ backgroundColor: "#46c35f", border: "none" }}
                  >
                    <div class="card-body">
                      <h6 class="text-white">Closed Leads</h6>
                      <h2 class="text-end text-white">
                        <i class="bi bi-check2-circle float-start"></i>
                        <span>{closed}</span>
                      </h2>
                      <p class="m-b-0 text-white">
                      Percentage<span class="float-end text-white">33%</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                <div
                    className="card shadow"
                    style={{ backgroundColor: "#f9b115", border: "none" }}
                  >
                    <div class="card-body">
                      <h6 class="text-white">Pending Leads</h6>
                      <h2 class="text-end text-white">
                        <i class="bi bi-arrow-left-right float-start"></i>
                        <span>{pending}</span>
                      </h2>
                      <p class="m-b-0 text-white">
                      Percentage<span class="float-end text-white">42%</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                <div
                    className="card shadow"
                    style={{ backgroundColor: "#4099ff", border: "none" }}
                  >
                    <div class="card-body">
                      <h6 class="text-white">Not Connected</h6>
                      <h2 class="text-end text-white">
                        <i class="bi bi-tag float-start"></i>
                        <span>{notConnected}</span>
                      </h2>
                      <p class="m-b-0 text-white">
                      Percentage<span class="float-end text-white">2%</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div
                    className="card shadow"
                    style={{ backgroundColor: "#f96868", border: "none" }}
                  >
                    <div class="card-body">
                      <h6 class="text-white">Lost Leads</h6>
                      <h2 class="text-end text-white">
                        <i class="bi bi-x-circle float-start"></i>
                        <span>{lost}</span>
                      </h2>
                      <p class="m-b-0 text-white">
                        Percentage<span class="float-end text-white">12%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 
              <div style={{ width: "30rem", marginTop: "20px" }}>
                <LeadsChart
                  closed={closed}
                  pending={pending}
                  notConnected={notConnected}
                  lost={lost}
                />
              </div> */}

            <div className="shadow p-4 mt-5" style={{ width: "93%", margin: "auto",borderRadius:"10px" }}>
              <LeadsMonthChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
