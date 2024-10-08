import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card'; // Import the Card component

const Requirements = () => {
  const [data, setData] = useState([]);
const status = "not_picked"
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
      <h3>Requirements</h3><br></br>
      <div className="card-container d-flex flex-wrap">
        {data.map((item) => (
          <Card key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Requirements;
