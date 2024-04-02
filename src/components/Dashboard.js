import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeadsMonthChart from "./LeadMonthChart";
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import LeadsChart from "./LeadsChart";
import Spinner from 'react-bootstrap/Spinner';
function Dashboard() {
  const [closed, setClosed] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loadingLost, setLoadingLost] = useState(true);
  const [pending, setPending] = useState(0);
  const [notConnected, setNotConnected] = useState(0);
  const [lost, setLost] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("March"); // Default to March
  const navigate = useNavigate();

  useEffect(() => {
    const dashboardValid = async () => {
      let token = localStorage.getItem("usersdatatoken");
  
      if (!token) navigate("/EmployeeLogin");
    };
    dashboardValid();
  
    getCount();
  }, [navigate, selectedMonth]);
  

  const getCount = async () => {
    
    try {
      setLoadingLost(true);
      
      const response = await axios.get(`${process.env.URL}/count`);
      const responseData = response.data.data;

      // Get the data for the selected month
      const selectedMonthData = responseData[selectedMonth] || [];

      // Calculate counts for each status based on filtered data
      const closedCount = await selectedMonthData.filter(item => item.status === "closed").length;
      const pendingCount = await selectedMonthData.filter(item => item.status === "pending").length;
      const notConnectedCount =await selectedMonthData.filter(item => item.status === "not_connected").length;
      const lostCount =await selectedMonthData.filter(item => item.status === "lost").length;
      
      // Calculate total count of leads
      const totalCount = closedCount + pendingCount + notConnectedCount + lostCount;

      // Update state with the counts
      setClosed(closedCount);
      setPending(pendingCount);
      setNotConnected(notConnectedCount);
      setLost(lostCount);

      // Update monthly data
      setMonthlyData(selectedMonthData);
      setLoadingLost(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoadingLost(false);
    }
  };

  const calculatePercentage = (count) => {
    const totalCount = closed + pending + notConnected + lost;
    return totalCount !== 0 ? ((count / totalCount) * 100).toFixed(2) + "%" : "0%";
  };

  const handleMonthChange = (selectedMonth) => {
    setSelectedMonth(selectedMonth);

  };
  return (
    
    <div className="dashboard-content w-100" style={{ overflowY: "auto" }}>
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
          }}
        >
          <div style={{ marginTop: "30px", position: "relative", width: "100%" }}>
            <div className="px-5">
              <div className="row">
                <div className="col-md-3">
                  <div className="card" style={{ backgroundColor: "#46c35f", border: "none" }}>
                    <div className="card-body">
                      <h6 className="text-white">Closed Leads</h6>
                      
                          <h2 className="text-end text-white">
                            <i className="bi bi-check2-circle float-start"></i>
                            {loadingLost ? (
                        <Spinner animation="border" variant="light" />
                      ) : (
                        <> <span>{closed}</span>  </>
                        )}
                          </h2>
                          <p className="m-b-0 text-white">
                            {selectedMonth}
                            <span className="float-end text-white">{calculatePercentage(closed)}</span>
                          </p>
                      
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card" style={{ backgroundColor: "#f9b115", border: "none" }}>
                    <div className="card-body">
                      <h6 className="text-white">Pending Leads</h6>
                      <h2 className="text-end text-white">
                        <i className="bi bi-arrow-left-right float-start"></i>
                        {loadingLost ? (
                        <Spinner animation="border" variant="light" />
                      ) : (
                        <> <span>{pending}</span>  </>
                        )}

                      </h2>
                      <p className="m-b-0 text-white">
                        {selectedMonth}
                        <span className="float-end text-white">{calculatePercentage(pending)}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card" style={{ backgroundColor: "#4099ff", border: "none" }}>
                    <div className="card-body">
                      <h6 className="text-white">Not Connected</h6>
                      <h2 className="text-end text-white">
                        <i className="bi bi-tag float-start"></i>
                        {loadingLost ? (
                        <Spinner animation="border" variant="light" />
                      ) : (
                        <> <span>{notConnected}</span>  </>
                        )}

                      </h2>
                      <p className="m-b-0 text-white">
                        {selectedMonth}
                        <span className="float-end text-white">{calculatePercentage(notConnected)}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card" style={{ backgroundColor: "#f96868", border: "none" }}>
                    <div className="card-body">
                      <h6 className="text-white">Lost Leads</h6>
                      <h2 className="text-end text-white">
                        <i className="bi bi-x-circle float-start"></i>
                        {loadingLost ? (
                        <Spinner animation="border" variant="light" />
                      ) : (
                        <> <span>{lost}</span>  </>
                        )}

                      </h2>
                      <p className="m-b-0 text-white">
                        {selectedMonth}
                        <span className="float-end text-white">{calculatePercentage(lost)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            

            <div className="shadow p-4 mt-3" style={{ width: "93%", margin: "auto",borderRadius:"10px",   backgroundColor:"#fff"
 }}>
            <DropdownButton id="dropdown-basic-button" title="Month" onSelect={handleMonthChange}>
                  <Dropdown.Item eventKey="January">January</Dropdown.Item>
                  <Dropdown.Item eventKey="February">February</Dropdown.Item>
                  <Dropdown.Item eventKey="March">March</Dropdown.Item>
                  <Dropdown.Item eventKey="April">April</Dropdown.Item>
                  <Dropdown.Item eventKey="May">May</Dropdown.Item>
                  <Dropdown.Item eventKey="June">June</Dropdown.Item>
                  <Dropdown.Item eventKey="July">July</Dropdown.Item>
                  <Dropdown.Item eventKey="August">August</Dropdown.Item>
                  <Dropdown.Item eventKey="September">September</Dropdown.Item>
                  <Dropdown.Item eventKey="October">October</Dropdown.Item>
                  <Dropdown.Item eventKey="November">November</Dropdown.Item>
                  <Dropdown.Item eventKey="December">December</Dropdown.Item>

                </DropdownButton>
    
              <LeadsMonthChart />
            </div>
          
            {/* <div className=" p-4 mt-5" style={{ width: "30rem", marginTop: "20px",margin: "auto",borderRadius:"10px",    boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
  }}>
                <LeadsChart data={monthlyData}
                 
                />
              </div> */}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
