import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
const MyVerticallyCenteredModal = ({ show, onHide, place }) => {
  const [contactNumbers, setContactNumbers] = useState([]);

  useEffect(() => {
    if (show) {
      const fetchContactNumbers = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_URL}/contact-numbers`, {
            params: { place }
          });
          setContactNumbers(response.data.contactDetails || []);
        } catch (error) {
          console.error('Error fetching contact numbers:', error);
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
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          Contact Numbers<br></br>
          <p style={{fontSize:"15px"}}>{place}</p>
        </Modal.Title>
        
      </Modal.Header>
      <Modal.Body>
        {contactNumbers.length > 0 ? (
          <ul>
 

            
            {contactNumbers.map((item, index) => (
                           <li key={index}>
<p>{item.name}</p>
<p>{item.phone}</p>
                </li>
                
            ))}
            
          </ul>
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
