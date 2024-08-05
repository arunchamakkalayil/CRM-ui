import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Modal, Button, Spinner, Form } from 'react-bootstrap';
import "./form.css";

function Contact() {
  const [data, setData] = useState([]);
  const [camps, setCamps] = useState([]); // State for camps data
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    place: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const navigate = useNavigate();

  const fetchCamps = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/camps`);
      setCamps(response.data || []); // Populate camps data
    } catch (error) {
      console.error("Error fetching camps data:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true); // Show loader while updating
      await axios.put(`${process.env.REACT_APP_URL}/contact/${editData._id}`, formData);
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
      name: item.name,
      place: item.place,
      phone: item.phone,
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
      await axios.delete(`${process.env.REACT_APP_URL}/contact/${itemId}`);
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
      const response = await axios.get(`${process.env.REACT_APP_URL}/contact`);
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
            navigate("/contact");
          } else {
            console.error("Unexpected response status:", response.status);
          }
        } catch (error) {
          if (axios.isCancel(error)) {
            console.error("Request was canceled:", error);
          } else if (error.response) {
            if (error.response.status === 401) {
              console.error("Token is invalid");
            } else {
              console.error("Server error:", error.response.data);
            }
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Unknown error occurred:", error);
          }
        }
      } else {
        navigate("/");
      }
    };

    userLoggedIn();
    getData();
    fetchCamps(); // Fetch camps data when component mounts
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
      <div className="container-fluid">
        <Link
          to="/contactform"
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
                      <th className="font"><i className="bi bi-person text-primary px-1"></i>Name</th>
                      <th className="font"><i className="bi bi-envelope-at text-primary px-1"></i>Camp Name</th>
                      <th className="font"><i className="bi bi-person-vcard text-primary px-1"></i>Phone</th>
                      <th className="font"><i className="bi bi-pin-map text-primary px-1"></i>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item._id}>
                        <td className="font">
                          {isEditing && editData === item ? (
                            <input
                              type="text"
                              style={{ width: "100%" }}
                              value={formData.name}
                              onChange={(e) => handleInputChange(e, "name")}
                            />
                          ) : (
                            <span>{truncateText(item.name, 20)}</span>
                          )}
                        </td>
                        <td className="font">
                          {isEditing && editData === item ? (
                            <Form.Control
                              as="select"
                              style={{ width: "100%" }}
                              value={formData.place}
                              onChange={(e) => handleInputChange(e, "place")}
                            >
                              <option value="">Select a place</option>
                              {camps.map((camp) => (
                                <option key={camp._id} value={camp.name}>
                                  {camp.name}
                                </option>
                              ))}
                            </Form.Control>
                          ) : (
                            <span>{item.place}</span>
                          )}
                        </td>
                        <td className="font">
                          {isEditing && editData === item ? (
                            <input
                              type="number"
                              style={{ width: "100%" }}
                              value={formData.phone}
                              onChange={(e) => handleInputChange(e, "phone")}
                            />
                          ) : (
                            <span>{item.phone}</span>
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

export default Contact;
