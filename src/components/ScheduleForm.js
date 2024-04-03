import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

import './form.css'; // Import the common styles
import axios from 'axios';

export default function ScheduleForm() {
  // const location = useLocation();
  // const [editData, setEditData] = useState(location.state?.editData || {});
  const [interviewerName, setInterviewerName] = useState('');
  const [interviewerEmail, setInterviewerEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [meetLink, setMeetLink] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  useEffect(() => {
    // Add any necessary initialization logic here
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   // Format the scheduledTime before sending it to the server
    //   const formattedScheduledTime = new Date(scheduledTime).toLocaleString('en-US', {
    //     month: 'numeric',
    //     day: 'numeric',
    //     year: 'numeric',
    //     hour: 'numeric',
    //     minute: 'numeric',
    //     second: 'numeric',
    //     hour12: true,
    //   });

      const response = await axios.post(`${process.env.REACT_APP_URL}/scheduleform`, {
        interviewerName,
        interviewerEmail,
        recipientName,
        recipientEmail,
        meetLink,
        scheduledTime: scheduledTime,
      });

      // Handle the response if needed
      alert('Saved successfully');
      console.log('Form submitted successfully:', response.data);
    // } catch (error) {
    //   // Handle errors
    //   console.error('Error during form submission:', error);
    // }

    // Reset the form fields after submission
    setInterviewerName('');
    setInterviewerEmail('');
    setRecipientName('');
    setRecipientEmail('');
    setMeetLink('');
    setScheduledTime('');
  };

  return (
    <div className="container mt-5">
    <h2 className="text-center">Schedule Meetings</h2>
    <form onSubmit={handleSubmit} className="form" method='post'>
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
  

