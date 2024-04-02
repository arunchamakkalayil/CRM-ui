import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmailBox() {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    body: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [leadsEmails, setLeadsEmails] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    const fetchLeadsEmails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.URL}/userdata`); // Adjust the endpoint URL
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
  }, []);

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
      await axios.post(`${process.env.URL}/email`, {
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
    const filteredLeads = selectedMonth ? leadsEmails.filter(lead => lead.month === selectedMonth) : leadsEmails;
    const emailList = filteredLeads.map(lead => lead.email).join(',');
    setEmailData({
      ...emailData,
      to: emailList
    });
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
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <button className="btn btn-primary" onClick={handleSendEmail}>Send</button>
          {isLoading && <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
}

export default EmailBox;
