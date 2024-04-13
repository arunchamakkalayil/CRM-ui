import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import "./form.css";

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
  const [successAlert, setSuccessAlert] = useState(false);
  const [failureAlert, setFailureAlert] = useState(false);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const statuses = ['Closed', 'Not_Connected', 'Pending', 'Lost'];
  const navigate = useNavigate();

  useEffect(() => {
    const userLoggedIn = async () => {
      const token = localStorage.getItem("usersdatatoken");
     
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
            navigate("/email");
          } else {
            console.error("Unexpected response status:", response.status);
          }
        } catch (error) {
          console.error("Error occurred:", error);
        }
      } else {
        navigate("/");
      }
    };

    userLoggedIn();
    const fetchLeadsEmails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/userdata`);
        const leads = response.data.data;
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
      setIsLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_URL}/email`, {
        ...emailData,
        to: emailData.to.split(','),
      });
  
      setEmailData({
        to: '',
        subject: '',
        body: ''
      });
  
      if (response.status === 200) {
        setSuccessAlert(true);
        setTimeout(() => {
          setSuccessAlert(false);
        }, 5000);
      } else {
        setFailureAlert(true);
        setTimeout(() => {
          setFailureAlert(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setFailureAlert(true);
      setTimeout(() => {
        setFailureAlert(false);
      }, 5000);
    } finally {
      setIsLoading(false);
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
    filterData(selectedMonth, selectedStatus);
  };

  const filterData = (month, status) => {
    let filteredLeads = leadsEmails;
   
    if (month) {
      filteredLeads = filteredLeads.filter(lead => lead.month === month);
    }
    if (status) {
      filteredLeads = filteredLeads.filter(lead => lead.status.toLowerCase() === status.toLowerCase());
    }
  
    const emailList = filteredLeads.map(lead => lead.email).join(',');
    setEmailData({
      ...emailData,
      to: emailList
    });
  };

  return (
   <>
   {isLoading ?  
   <div className='spinner'>  
      <Spinner
        as="span"
        animation="grow"
        size="lg"
        role="status"
        aria-hidden="true"
        className='spinner text-primary'
      />
    </div> 
    :
    <div className="container" >
      <div className="row" style={{ width: '80%' }}>
        <div className="col-md-12 " >
          <div className="form-group" >
            <label htmlFor="to">To:</label>
            <input
              type="text"
              id="to"
              className="form-control"
              value={emailData.to}
              style={{ width: '100%', minHeight: '50px' }}
              required
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
              required
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
              required
            ></textarea>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6 col-lg-6">
              <label htmlFor="month">Select Month:</label>
              <select
                id="month"
                className="form-control"
                style={{width:"90%"}}
                value={selectedMonth}
                onChange={handleMonthChange}
              >
                <option value="">All Months</option>
                {months.map((month, index) => (
                  <option key={index} value={month}>{month}</option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-6 col-lg-6">
              <label htmlFor="status">Select Status:</label>
              <select
                id="status"
                className="form-control w-90"
                value={selectedStatus}
                style={{width:"90%"}}
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
      </div>
      <div className="message-container">
      {successAlert && (
        <Alert variant="success" onClose={() => setSuccessAlert(false)} >
          Email sent successfully!
        </Alert>
      )}</div>
       <div className="message-container">
      {failureAlert && (
        <Alert variant="danger" onClose={() => setFailureAlert(false)} >
          Failed to send email. Please try again.
        </Alert>
      )}</div>
      <button className="btn btn-primary px-5 mt-5" style={{}} onClick={handleSendEmail}>Send</button>
    </div>
   }
   </> 
    
  );
}

export default EmailBox;
