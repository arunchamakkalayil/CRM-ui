import React, { useState } from 'react';
import './Card.css';
import MyVerticallyCenteredModal from '../viewer/Modal';

const Card = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDonateClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'not_picked':
        return 'status-not-picked';
      case 'picked':
        return 'status-picked';
      case 'received':
        return 'status-received';
      default:
        return '';
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).replace(/_/g, ' ');
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h5 className="card-title text-truncate">{item.place}</h5>
          <span className={`status-badge ${getStatusClass(item.status)}`}>
            {capitalizeFirstLetter(item.status)}
          </span>
        </div>
        <div className="card-body">
          <p className="card-text"><strong>Goods:</strong> {item.item}</p>
          <p className="card-text"><strong>Quantity:</strong> {item.quantity}</p>
          <p className="card-text"><strong>Contact:</strong> {item.phone}</p>
        </div>
        {item.status === 'not_picked' && (
          <div className="card-footer">
            <button className="btn btn-outline-primary" onClick={handleDonateClick}>Donate</button>
          </div>
        )}
      </div>
      <MyVerticallyCenteredModal
        show={isModalOpen}
        onHide={handleCloseModal}
        place={item.place}
      />
    </>
  );
};

export default Card;
