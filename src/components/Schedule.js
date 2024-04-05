import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import "./form.css";
import Spinner from 'react-bootstrap/Spinner';

function Schedule() {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    interviewerName: "",
    interviewerEmail: "",
    recipientName: "",
    recipientEmail: "",
    meetLink: "",
    scheduledTime: ""
  });
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const navigate = useNavigate();

  const handleUpdate = async () => {
    try {
      setIsLoading(true); // Show loader while updating
      await axios.put(`${process.env.REACT_APP_URL}/schedule/${editData._id}`, formData);
      getData();
      setIsEditing(false);
      setEditData(null); // Reset editData after update
    } catch (error) {
      console.error("Error during form update:", error);
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  const handleEdit = (item) => {
    setEditData(item);
    setFormData({
      interviewerName: item.interviewerName,
      interviewerEmail: item.interviewerEmail,
      recipientName: item.recipientName,
      recipientEmail: item.recipientEmail,
      meetLink: item.meetLink,
      scheduledTime: item.scheduledTime,
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(null); // Reset editData when canceling
  };

  const handleInputChange = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value
    });
  };

  const handleDelete = async (itemId) => {
    try {
      setIsLoading(true); // Show loader while deleting
      await axios.delete(`${process.env.REACT_APP_URL}/schedule/${itemId}`);
      setData((prevData) => prevData.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error during delete:", error);
    } finally {
      setIsLoading(false); // Hide loader
      handleCloseDeleteModal();
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/schedule`);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
            navigate("/schedule");
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
      } else {
        navigate("/");
      }
    };

    userLoggedIn();
    getData();
  }, [navigate]);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const handleShowDeleteModal = (itemId) => {
    setItemToDelete(itemId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setItemToDelete(null);
    setShowDeleteModal(false);
  };

  return (
    
            <div className="dashboard-content w-100">
              
          <div className=" container-fluid">
          <Link
              to="/scheduleform"
              className="btn btn-success btn-floating"
              style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                padding: "10px 20px",
                borderRadius: "50%",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                fontSize: "24px",
                backgroundColor: "#28a745", // Green color
                border: "none",
                color: "white",
                zIndex: "1",
              }}
            >
              +
            </Link>
      {isLoading ? (
        <div className='spinner'>
          <Spinner
            as="span"
            animation="grow"
            size="lg"
            role="status"
            aria-hidden="true"
          />
        </div>
      ) : (
            <div className="row">
              <div className="col-md-12">
                <div className="table-container" style={{ overflowY: "auto", borderRadius: "15px", marginTop: "10px" }}>
                  <table className="table mx-auto">
                    <thead>
                      <tr>
                        <th className="font"><i class="bi bi-person text-primary px-1"></i>Interviewer</th>
                        <th className="font"><i class="bi bi-envelope-at text-primary px-1"></i>Interviewer</th>
                        <th className="font"><i class="bi bi-person-vcard text-primary px-1"></i>Recipient </th>
                        <th className="font"><i class="bi bi-envelope-at text-primary px-1"></i>Recipient</th>
                        <th className="font"><i class="bi bi-link-45deg text-primary px-1"></i>Meet Link</th>
                        <th className="font"><i class="bi bi-clock text-primary px-1"></i> Time </th>
                        <th className="font"><i class="bi bi-pin-map text-primary px-1"></i>Actions</th>
                      </tr>
                    </thead>
                    <tbody style={{}}>
                      {data.map((item) => (
                        <tr key={item._id}>
                          <td className="font">
                            {isEditing && editData === item ? (
                              <input
                                type="text"
                                style={{ width: "100%" }}
                                value={formData.interviewerName}
                                onChange={(e) => handleInputChange(e, "interviewerName")}
                              />
                            ) : (
                              <span>{truncateText(item.interviewerName, 20)}</span>
                            )}
                          </td>
                          <td className="font">
                            {isEditing && editData === item ? (
                              <input
                                type="email"
                                style={{ width: "100%" }}
                                value={formData.interviewerEmail}
                                onChange={(e) => handleInputChange(e, "interviewerEmail")}
                              />
                            ) : (
                              <span>{truncateText(item.interviewerEmail, 20)}</span>
                            )}
                          </td>
                          <td className="font">
                            {isEditing && editData === item ? (
                              <input
                                type="text"
                                style={{ width: "100%" }}
                                value={formData.recipientName}
                                onChange={(e) => handleInputChange(e, "recipientName")}
                              />
                            ) : (
                              <span>{truncateText(item.recipientName, 20)}</span>
                            )}
                          </td>
                          <td className="font">
                            {isEditing && editData === item ? (
                              <input
                                type="email"
                                style={{ width: "100%" }}
                                value={formData.recipientEmail}
                                onChange={(e) => handleInputChange(e, "recipientEmail")}
                              />
                            ) : (
                              <span>{truncateText(item.recipientEmail, 20)}</span>
                            )}
                          </td>
                          <td className="font">
                            {isEditing && editData === item ? (
                              <input
                                type="text"
                                style={{ width: "100%" }}
                                value={formData.meetLink}
                                onChange={(e) => handleInputChange(e, "meetLink")}
                              />
                            ) : (
                              <span>{truncateText(item.meetLink, 20)}</span>
                            )}
                          </td>
                          <td className="font">
                            {isEditing && editData === item ? (
                              <input
                                type="datetime-local"
                                style={{ width: "100%" }}
                                value={formData.scheduledTime}
                                onChange={(e) => handleInputChange(e, "scheduledTime")}
                              />
                            ) : (
                              <span>{truncateText(item.scheduledTime, 20)}</span>
                            )}
                          </td>
                          <td className="font">
                            {isEditing && editData === item ? (
                              <>
                                <i className="bi bi-x-lg text-danger p-2" onClick={handleCancel}></i>
                                <i className="bi bi-upload text-primary p-2" onClick={handleUpdate}></i>
                              </>
                            ) : (
                              <>
                                <i className="bi bi-pencil-square text-primary p-2" onClick={() => handleEdit(item)}></i>
                                <i className="bi bi-trash-fill text-danger p-2" onClick={() => handleShowDeleteModal(item._id)}></i>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                </div>
              </div>
            </div>
        
      
      )}
      
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(itemToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      </div>
  );

}

export default Schedule;
