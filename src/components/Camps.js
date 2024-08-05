import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import "./form.css";
import Spinner from 'react-bootstrap/Spinner';

function Camps() {
  const [data, setData] = useState([]); // Initialize data as an empty array
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async (itemId) => {
    try {
      setIsLoading(true); // Show loader while deleting
      await axios.delete(`${process.env.REACT_APP_URL}/camps/${itemId}`);
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
      const response = await axios.get(`${process.env.REACT_APP_URL}/camps`);
      console.log("Response from server:", response.data); // Log the response
      setData(response.data || []); // Ensure data is an array
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
            navigate("/camps");
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

  const handleShowDeleteModal = (itemId) => {
    setItemToDelete(itemId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setItemToDelete(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="dashboard-content m-auto" style={{maxWidth:"700px"}}>
      <div className="container-fluid">
        <Link
          to="/addcamp"
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
                      <th className="font"><i className="bi bi-person text-primary px-1"></i>Camps</th>
                      <th className="font"><i className="bi bi-pin-map text-primary px-1"></i>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      data.map((item) => (
                        <tr key={item._id}>
                          <td className="font">
                            <span>{item.name}</span>
                          </td>
                          <td className="font">
                            <i className="bi bi-trash-fill text-danger p-2" onClick={() => handleShowDeleteModal(item._id)}></i>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="font text-center">No data available</td>
                      </tr>
                    )}
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

export default Camps;
