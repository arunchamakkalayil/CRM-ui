import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import './form.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [phone, setPhone] = useState('');
  const [successAlert, setSuccessAlert] = useState(false);
  const [failureAlert, setFailureAlert] = useState(false);
  const [camps, setCamps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userLoggedIn = async () => {
      const token = localStorage.getItem('usersdatatoken');
      if (token) {
        try {
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
            navigate('/contactform');
          } else {
            console.error('Unexpected response status:', response.status);
          }
        } catch (error) {
          if (axios.isCancel(error)) {
            console.error('Request was canceled:', error);
          } else if (error.response) {
            if (error.response.status === 401) {
              console.error('Token is invalid');
            } else {
              console.error('Server error:', error.response.data);
            }
          } else if (error.request) {
            console.error('No response received:', error.request);
          } else {
            console.error('Unknown error occurred:', error);
          }
        }
      } else {
        navigate('/');
      }
    };

    const fetchCamps = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/camps`);
        setCamps(response.data || []);
      } catch (error) {
        console.error('Error fetching camps:', error);
      }
    };

    userLoggedIn();
    fetchCamps();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await axios.post(`${process.env.REACT_APP_URL}/contactform`, {
        name,
        place,
        phone,
      });

      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
      }, 5000);
    } catch (error) {
      console.error('Error during form submission:', error);
      setFailureAlert(true);
      setTimeout(() => {
        setFailureAlert(false);
      }, 5000);
    } finally {
      setName('');
      setPlace('');
      setPhone('');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Volunteer</h2>
      <form onSubmit={handleSubmit} className="form" method="post">
        <div className="message-container">
          {successAlert && (
            <Alert variant="success" onClose={() => setSuccessAlert(false)} dismissible>
              Added successfully!
            </Alert>
          )}
        </div>
        <div className="message-container">
          {failureAlert && (
            <Alert variant="danger" onClose={() => setFailureAlert(false)} dismissible>
              Failed to Add!
            </Alert>
          )}
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                required
                placeholder="Full Name"
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label>Place:</label>
              <select
                name="place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select Camp</option>
                {camps.map((camp) => (
                  <option key={camp._id} value={camp.name}>
                    {camp.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                required
                placeholder="Phone number"
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
