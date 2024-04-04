import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function EmailBox() {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    body: ''
  });
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadsEmails, setLeadsEmails] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const statuses = ['Closed', 'Not_Connected', 'Pending', 'Lost'];
  const navigate = useNavigate();
  useEffect(() => {
    const userLoggedIn = async () => {
      const token = localStorage.getItem("usersdatatoken");
      if (!token) navigate("/EmployeeLogin");
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
            navigate("/email");
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
    const fetchLeadsEmails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/userdata`); // Adjust the endpoint URL
        const leads = response.data.data;
        // const emails = leads.map(lead => lead.email);
        setLeadsEmails(leads);
      } catch (error) {
        console.error('Error fetching leads:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeadsEmails();
  }, [navigate]);

  const handleInputChange = (e, field) => {
    setEmailData({
      ...emailData,
      [field]: e.target.value
    });
  };

  const handleSendEmail = async () => {
    try {
      // Perform email sending logic here using Axios or any other method
      console.log('Email data:', emailData);
      // Example: Send email using Axios
      await axios.post(`${process.env.REACT_APP_URL}/email`, {
        ...emailData,
        to: emailData.to.split(','),
      });
      // Reset form after sending
      setEmailData({
        to: '',
        subject: '',
        body: ''
      });
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    }
  };

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setSelectedMonth(selectedMonth);
    filterData(selectedMonth, selectedStatus);
  };

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setSelectedStatus(selectedStatus);
    filterData(selectedMonth, selectedStatus); // Call filterData to update emailData.to
  };

  const filterData = (month, status) => {
    console.log('Filtering data');
  console.log('Selected Month:', month);
  console.log('Selected Status:', status);
    let filteredLeads = leadsEmails;
   
    if (month) {
      filteredLeads = filteredLeads.filter(lead => lead.month === month);
    }
    if (status) {
      filteredLeads = filteredLeads.filter(lead => lead.status.toLowerCase() === status.toLowerCase());
    }
  
    console.log('Filtered Leads:', filteredLeads);
  
    const emailList = filteredLeads.map(lead => lead.email).join(',');
    setEmailData({
      ...emailData,
      to: emailList
    });
  
    console.log('Filtered Email List:', emailList);
  
    
  };
  return (
    <div className="container" >
      <div className="row" style={{ width: '80%' }}>
        <div className="col-md-12" >
          <div className="form-group" >
            <label htmlFor="to">To:</label>
            <input
              type="text"
              id="to"
              className="form-control"
              value={emailData.to}
              style={{ width: '100%', minHeight: '50px' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              className="form-control"
              value={emailData.subject}
              onChange={(e) => handleInputChange(e, 'subject')}
              style={{ width: '100%', minHeight: '60px' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">Body:</label>
            <textarea
              id="body"
              className="form-control"
              value={emailData.body}
              onChange={(e) => handleInputChange(e, 'body')}
              style={{ width: '100%', minHeight: '150px' }}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="month">Select Month:</label>
            <select
              id="month"
              className="form-control"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              <option value="">All Months</option>
              {months.map((month, index) => (
                <option key={index} value={month}>{month}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="status">Select Status:</label>
            <select
              id="status"
              className="form-control"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <option value="">All Statuses</option>
              {statuses.map((status, index) => (
                <option key={index} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <button className="btn btn-primary px-5 mt-5" style={{}} onClick={handleSendEmail}>Send</button>
          {isLoading && <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
}

export default EmailBox;
