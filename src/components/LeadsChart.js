import React, { useState, useEffect ,useContext} from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import Context from "../context/Context";
const LeadsChart = (props) => {

    const { closed, setClosed,pending, setPending,notConnected, setNotConnected,lost, setLost } = useContext(Context);
  const [series, setSeries] = useState([0, 0, 0, 0]);

  const [options] = useState({
    chart: {
      type: 'donut',
    },
    height: 400,
    labels: [" Not connected", "Closed", "Pending", "Lost"],
    dataLabels: {
      enabled: true
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: "100%"
        },
        legend: {
          show: true,
          position: 'bottom'
        },
        height: "auto",
      }
    }]
    

  });

  useEffect(() => {
    const userLoggedIn = async () => {
      const token = localStorage.getItem("usersdatatoken");

      if (token) {
        try {
          // Send a request to the backend to validate the token
          const response = await axios.post(
            `${process.env.REACT_APP_URL}/validateToken`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            // Token is valid, navigate to the dashboard
            navigate("/dashboard");
          } else {
            // Handle unexpected response status codes
            console.error("Unexpected response status:", response.status);
          }
        } catch (error) {
          // Handle errors in a more specific way
          if (axios.isCancel(error)) {
            // Request was canceled
            console.error("Request was canceled:", error);
          } else if (error.response) {
            // Server responded with an error status code
            if (error.response.status === 401) {
              // Unauthorized, token is invalid
              console.error("Token is invalid");
            } else {
              console.error("Server error:", error.response.data);
            }
          } else if (error.request) {
            // Request was made but no response was received
            console.error("No response received:", error.request);
          } else {
            // Something else went wrong
            console.error("Unknown error occurred:", error);
          }
        }
      }
    };

    userLoggedIn();
    const getCount = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/count`);
  
        setClosed(response.data.data.closed);
        setPending(response.data.data.pending);
        setNotConnected(response.data.data.not_connected);
        setLost(response.data.data.lost);
        
        setSeries([response.data.data.not_connected, response.data.data.closed, response.data.data.pending, response.data.data.lost]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    getCount();
  }, []);
  


  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={series}
            type="donut"
            width="100%"
            height={options.height}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadsChart;
