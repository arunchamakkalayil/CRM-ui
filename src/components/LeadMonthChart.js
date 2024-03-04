import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const ApexChart = () => {
  const [chartState, setChartState] = useState({
    series: [
      {
        name: 'Desktops',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 200,0,0,0],
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
        text: 'Leads Trend By Month 2023',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec'],
      },
    },
  });

  return (
    <div id="chart" >
      <Chart options={chartState.options} series={chartState.series} type="line" height={420} />
    </div>
  );
};

export default ApexChart;
