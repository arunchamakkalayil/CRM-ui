import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './Modal.css'

const MyVerticallyCenteredModal = ({ show, onHide, place }) => {
  const [contactNumbers, setContactNumbers] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    if (show) {
      const fetchContactNumbers = async () => {
        try {
          setLoading(true); // Start loading
          const response = await axios.get(`${process.env.REACT_APP_URL}/contact-numbers`, {
            params: { place },
          });
          setContactNumbers(response.data.contactDetails || []);
        } catch (error) {
          console.error('Error fetching contact numbers:', error);
        } finally {
          setLoading(false);//  // End loading
        }
      };

      fetchContactNumbers();
    }
  }, [show, place]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className='d-flex justify-content-center align-center'>
        <Modal.Title id="contained-modal-title-vcenter">
        <i class="bi bi-house-heart d-flex justify-content-center"></i>
          <p style={{ fontSize: '15px' }}>{place}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className='p-2'>Volunteers</h4>
        {loading ? ( // Show loader when loading
          <div className="loading" />
        ) : contactNumbers.length > 0 ? (
          <div className='px-4'>
            {contactNumbers.map((item, index) => (
              <div key={index} className='d-flex align-center'>
                <div className='d-flex align-center p-2'>{index + 1}.</div>
                <div className='m-2'>
                <label>Name : </label>
                <span> {item.name}</span><br />
                <label>Phone : </label>
                <span> {item.phone}</span><br /><br />
                </div>
 
              </div>
            ))}
          </div>
        ) : (
          <p>No contact numbers available.</p>
        )}
      </Modal.Body>
<Modal.Footer>
<Button onClick={onHide}>Close</Button>
</Modal.Footer>
      
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
