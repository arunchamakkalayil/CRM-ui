import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './form.css'; // Import the common styles
import axios from 'axios';
import { Alert } from 'react-bootstrap';
export default function ScheduleForm() {

  const [interviewerName, setInterviewerName] = useState('');
  const [interviewerEmail, setInterviewerEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [meetLink, setMeetLink] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [successAlert, setSuccessAlert] = useState(false);
  const [failureAlert, setFailureAlert] = useState(false);
  const navigate = useNavigate();
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
            navigate("/scheduleform");
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
      }else{
        navigate("/");
         }
    };

    userLoggedIn();
    // Add any necessary initialization logic here
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/scheduleform`, {
        interviewerName,
        interviewerEmail,
        recipientName,
        recipientEmail,
        meetLink,
        scheduledTime: scheduledTime,
      });

      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
      }, 5000);

      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error during form submission:', error);
      setFailureAlert(true);
      setTimeout(() => {
        setFailureAlert(false);
      }, 5000);
    } finally {
      // Reset the form fields after submission
      setInterviewerName('');
      setInterviewerEmail('');
      setRecipientName('');
      setRecipientEmail('');
      setMeetLink('');
      setScheduledTime('');
    }
  };

  return (
    <div className="container mt-5">
    <h2 className="text-center">Schedule Meetings</h2>
    <form onSubmit={handleSubmit} className="form" method='post'>
    <div className="message-container">
    {successAlert && (
          <Alert variant="success" onClose={() => setSuccessAlert(false)} >
            Scheduled successfully!
          </Alert>
        )}</div>
         <div className="message-container">
        {failureAlert && (
          <Alert variant="danger" onClose={() => setFailureAlert(false)} >
            Failed to Schedule Meeting
          </Alert>
        )}</div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Interviewer Name:</label>
            <input
              type="text"
              name="interviewerName"
              value={interviewerName}
              onChange={(e) => setInterviewerName(e.target.value)}
              className="form-control"
              required
              placeholder="Interviewer Name"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Interviewer Email:</label>
            <input
              type="email"
              name="interviewerEmail"
              value={interviewerEmail}
              onChange={(e) => setInterviewerEmail(e.target.value)}
              className="form-control"
              required
              placeholder="Interviewer Email"
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Recipient Name:</label>
            <input
              type="text"
              name="recipientName"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="form-control"
              required
              placeholder="Recipient Name"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Recipient Email:</label>
            <input
              type="email"
              name="recipientEmail"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="form-control"
              required
              placeholder="Recipient Email"
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Meet Link:</label>
            <input
              type="text"
              name="meetLink"
              value={meetLink}
              onChange={(e) => setMeetLink(e.target.value)}
              className="form-control"
              required
              placeholder="Meeting Link"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Scheduled Time:</label>
            <input
              type="datetime-local"
              name="scheduledTime"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="form-control"
              required
              placeholder="Schedule Time"
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
  

