import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const ApexChart = () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Leads',
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Leads Trend By Month',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: months,
      },
    },
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
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/monthCount`);
      const responseData = response.data;
console.log(responseData)
const leadCounts = months.map(month => {
  return responseData.data[month] || 0;
});


      setChartData(prevState => ({
        ...prevState,
        series: [{ data: leadCounts }],
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div id="chart">
      <Chart options={chartData.options} series={chartData.series} type="line" height={420} />
    </div>
  );
};

export default ApexChart;
