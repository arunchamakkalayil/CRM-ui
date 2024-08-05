import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './form.css';
import axios from 'axios';
import { Alert } from 'react-bootstrap';

export default function AddCamp() {
  const [name, setName] = useState('');
  const [successAlert, setSuccessAlert] = useState(false);
  const [failureAlert, setFailureAlert] = useState(false);
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
            navigate('/addcamp');
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

    userLoggedIn();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       await axios.post(`${process.env.REACT_APP_URL}/addcamp`, {
        name,
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
    }
  };

  return (
    <div className="container align-center m-auto" style={{maxWidth:"700px"}}>
      <h2 className="text-center">Add a camp</h2>
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
              <label>Place</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                required
                placeholder="Enter camp name"
              />
            </div>
          </div>


        </div>
        <div className="text-center w-25 m-auto">
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
