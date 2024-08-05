import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Context from "../context/Context";
import { Link } from "react-router-dom";
import "./css/table.css";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import Loader from "./Loader";
function Table(props) {
  const {
    setDelMessage,
    setDelStatus,
    seterrVisible,
    setError,
    delMessage,
    delStatus,
    error,
    errVisible,
  } = useContext(Context);
  const [data, setData] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [editedItem, setEditedItem] = useState({
    place: "",
    quantity: null,
    phone: "",
    status: "",
    item: "",
  });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const handleEdit = (item) => {
    setEditingItemId(item._id);
    setEditedItem(item);
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setEditedItem({
      place: "",
      item: "",
      phone: "",
      status: "",
      quantity: null,
    });
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true); // Show loader
      const response = await axios.put(
        `${process.env.REACT_APP_URL}/userdata/${editingItemId}`,
        editedItem
      );

      // Update the data in the data array.
      setData((prevData) =>
        prevData.map((item) =>
          item._id === editingItemId ? response.data : item
        )
      );

      setEditingItemId(null);
      setEditedItem({
        place: "",
        quantity: null,
        phone: "",
        status: "",
        item: "",
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Access the error message from the response data
        seterrVisible(true);
        setError(error.response.data.error);
        // Automatically hide the alert after 4 seconds (4000 milliseconds)
        setTimeout(() => {
          seterrVisible(false);
        }, 4000);
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  const handleDelete = (itemId) => {
    setItemIdToDelete(itemId); // Set the ID of the item to delete
    setShowConfirmationModal(true); // Show the confirmation modal
  };

  const confirmDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_URL}/userdata/${itemIdToDelete}`)
      .then((response) => {
        setDelMessage(true);
        setDelStatus("Deleted Successfully");
        // Automatically hide the alert after 4 seconds (4000 milliseconds)
        setTimeout(() => {
          setDelMessage(false);
        }, 4000);

        getData();
        props.getCount();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });

    setShowConfirmationModal(false);
  };

  const getData = async () => {
    try {
      setIsLoading(true); // Show loader
      const response = await axios.get(`${process.env.REACT_APP_URL}/userdata`);

      // Ensure response.data.data is an array
      if (Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        console.error("API response data is not an array:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  useEffect(() => {
    const userLoggedIn = async () => {
      const token = localStorage.getItem("usersdatatoken");
      if (token) {
        try {
          setIsLoading(true); // Show loader
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
            navigate("/table");
          } else {
            navigate("/");
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
        } finally {
          setIsLoading(false); // Hide loader
        }
      } else {
        navigate("/");
      }
    };
    

    userLoggedIn();
    getData();
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/camps`);
        setPlaces(response.data || []);
      } catch (error) {
        console.error("Error fetching camps:", error);
      }
    };
  
    fetchPlaces();
  }, [navigate]);

  const filteredData = data.filter((item) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      (item.item && item.item.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (item.place && item.place.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (item.phone && item.phone.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (item.status && item.status.toLowerCase().includes(lowerCaseSearchTerm))
    );
  });
  const exportToExcel = () => {
    const filename = "table_data.xlsx";
    const formattedData = filteredData.map((item) => ({
      Item: item.item,
      Quantity: item.quantity,
      Place: item.place,
      Phone: item.phone,
      Status: item.status,
    }));
    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, filename);
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className="d-flex flex-column"
          style={{
            margin: "auto",
            borderRadius: "10px",
            backgroundColor: "#fff",
            height: "95vh",
          }}
        >
          <Link
            to="/create"
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
          <DeleteConfirmationModal
            show={showConfirmationModal}
            handleClose={() => setShowConfirmationModal(false)}
            handleDelete={confirmDelete}
          />
          
          {delMessage && (
            <div
              className="alert alert-success"
              role="alert"
              style={{ position: "fixed", top: 20, right: 20 }}
            >
              <i class="bi bi-check2-circle"> </i>
              {delStatus}
            </div>
          )}
          {errVisible && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className=" pt-3" style={{ overflowX: "auto" }}>
            <div className="table-responsive px-3 h-100">
              <div className="mb-5">
                <input
                  type="text"
                  id="form-control"
                  className="form-control"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-primary m-2" onClick={exportToExcel}>
                  Export
                </button>
              </div>
              <table
                id="dtBasicExample"
                className="table table-sm table-border-3"
                cellSpacing="0"
                width="100%"
              >
                <thead className="sticky-header">
                  <tr>
                    <th className="px-1 th-sm text-center py-3" scope="col">
                      <i class="bi bi-bag-dash text-primary"> </i> Item
                    </th>
                    <th className="px-1 th-sm text-center py-3" scope="col">
                      <i class="bi bi-box2 text-primary"> </i>Quantity
                    </th>
                    <th className="px-1 th-sm text-center py-3" scope="col">
                      <i class="bi bi-geo-alt text-primary"> </i>Place
                    </th>
                    <th className="px-1 th-sm text-center py-3" scope="col">
                      <i class="bi bi-telephone text-primary"> </i>Receiver 
                    </th>
                    <th className="px-1 th-sm text-center py-3" scope="col">
                      <i class="bi bi-bookmark text-primary"> </i>Status
                    </th>
                    <th className="px-1 th-s text-center py-3" scope="col">
                      <i class="bi bi-gear-fill text-primary"> </i>Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item._id}>
                      <td className="text-center">
                        {editingItemId === item._id ? (
                          <input
                            type="text"
                            value={editedItem.item}
                            onChange={(e) =>
                              setEditedItem({
                                ...editedItem,
                                item: e.target.value,
                              })
                            }
                          />
                        ) : (
                          item.item
                        )}
                      </td>
                      <td className="text-center">
                        {editingItemId === item._id ? (
                          <input
                            type="number"
                            value={editedItem.quantity}
                            onChange={(e) =>
                              setEditedItem({
                                ...editedItem,
                                quantity: e.target.value,
                              })
                            }
                          />
                        ) : (
                          item.quantity
                        )}
                      </td>
                      <td className="text-center">
  {editingItemId === item._id ? (
    <select
      value={editedItem.place}
      onChange={(e) =>
        setEditedItem({
          ...editedItem,
          place: e.target.value,
        })
      }
    >
      <option value="">Select a place</option>
      {places.map((place) => (
        <option key={place._id} value={place.name}>
          {place.name}
        </option>
      ))}
    </select>
  ) : (
    item.place
  )}
</td>
                      <td className="text-center">
                        {editingItemId === item._id ? (
                          <input
                            type="text"
                            value={editedItem.phone}
                            onChange={(e) =>
                              setEditedItem({
                                ...editedItem,
                                phone: e.target.value,
                              })
                            }
                          />
                        ) : (
                          item.phone
                        )}
                      </td>
                      <td className="text-center">
                        {editingItemId === item._id ? (
                          <select
                            value={editedItem.status}
                            onChange={(e) =>
                              setEditedItem({
                                ...editedItem,
                                status: e.target.value,
                              })
                            }
                          >
                            <option value="received">Received</option>
                            <option value="picked">Picked</option>
                            <option value="not_picked">Not Picked</option>
                          </select>
                        ) : (
                          item.status
                        )}
                      </td>
                      <td className="text-center">
                        {editingItemId === item._id ? (
                          <>
                            <i
                              className="bi bi-upload text-primary p-2"
                              onClick={handleUpdate}
                            ></i>

                            <i
                              className="bi bi-x-lg text-danger p-2"
                              onClick={handleCancelEdit}
                            ></i>
                          </>
                        ) : (
                          <>
                            <i
                              className="bi bi-pencil-square text-primary p-2"
                              onClick={() => handleEdit(item)}
                            ></i>

                            <i
                              className="bi bi-trash-fill text-danger p-2"
                              onClick={() => handleDelete(item._id)}
                            ></i>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <br></br>
        </div>
      )}
    </>
  );
}

export default Table;
