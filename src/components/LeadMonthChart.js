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
 
    fetchData();
  }, []);

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
