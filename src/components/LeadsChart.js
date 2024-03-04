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
    labels: ["Pending", "Closed", "Not connected", "Lost"],
    dataLabels: {
      enabled: false
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
    
  const getCount = async () => {
    try {
      const response = await axios.get("http://localhost:5000/count");

      setClosed(response.data.data.closed);
      setPending(response.data.data.pending);
      setNotConnected(response.data.data.not_connected);
      
      setLost(response.data.data.lost);

      setSeries([pending, closed, notConnected,lost]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
    getCount();
  }, );


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
