import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card'; // Import the Card component

const Received = () => {
  const [data, setData] = useState([]);
const status = "received"
  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/userdata`,{
        params: { status} // Pass the status as a query parameter
      });
      if (Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        console.error("API response data is not an array:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" mt-4">
      <h3>Received</h3><br />
      <div className="card-container d-flex flex-wrap">
        {data.map((item) => (
          <Card key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Received;
