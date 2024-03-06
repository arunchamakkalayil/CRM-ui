import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Context from "../context/Context";
import {  Link } from "react-router-dom";
import "./css/table.css";

function Table(props) {
  console.log(props)

  const { setDelMessage, setDelStatus,seterrVisible,setError,delMessage, delStatus, error, errVisible  } = useContext(Context);
  const [data, setData] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editedItem, setEditedItem] = useState({
    name: "",
    email: "",
    phone: "",
    status:"",
  });

  const handleEdit = (item) => {
    setEditingItemId(item._id);
    setEditedItem(item);
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setEditedItem({ name: "", email: "", phone: "" });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/userdata/${editingItemId}`,
        editedItem
      );

      // Update the data in the data array.
      setData((prevData) =>
        prevData.map((item) =>
          item._id === editingItemId ? response.data : item
        )
        
      );
    
      setEditingItemId(null);
      setEditedItem({ name: "", email: "", phone: "", status: "" });

     
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
    }
  };

  const handleDelete = (itemId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmed) {
      axios
        .delete(`http://localhost:5000/userdata/${itemId}`)
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
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/userdata");

      // Ensure response.data.data is an array
      if (Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        console.error("API response data is not an array:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  const filteredData = data.filter((item) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.email.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.phone.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.status.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });


  return (

<div className="d-flex flex-column shadow" style={{width:"75%",margin:"auto",borderRadius:"10px"}}>
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
                }}
              >
                +
              </Link>
              {delMessage && (
            <div className="alert alert-success" role="alert" style={{ position: 'fixed', top: 20, right: 20 }}><i class="bi bi-check2-circle"> </i>
                  {delStatus}
                </div>
              )}
              {errVisible && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

      <div className="table-container pt-5 ">
      <div className="table-responsive  px-5">
      <div className="mb-5">
        <input
          type="text"
          id="form-control"
          className="form-control"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table
        id="dtBasicExample"
        className="table table-sm table-border-3"
        cellSpacing="0"
        width="100%"
        
      >
       <thead className="sticky-header">
       <tr>
  <th className="px-1 th-sm text-left py-3" scope="col">
    Name
  </th>
  <th className="px-1 th-sm text-left py-3" scope="col">
    Email
  </th>
  <th className="px-1 th-sm text-left py-3" scope="col">
    Phone
  </th>
  <th className="px-1 th-sm text-left py-3" scope="col">
    Month
  </th>
  <th className="px-1 th-sm text-left py-3" scope="col">
    Status
  </th>
  <th className="px-1 th-s text-left py-3" scope="col">
    Actions
  </th>
</tr>

        </thead>
        <tbody >
        {filteredData.map((item) => (
            <tr key={item._id}>
              <td className="">
                {editingItemId === item._id ? (
                  <input 
                    type="text"
                  
                    value={editedItem.name}
                    onChange={(e) =>
                      setEditedItem({ ...editedItem, name: e.target.value })
                    }
                  />
                ) : (
                  item.name
                )}
              </td>
              <td className="">
                {editingItemId === item._id ? (
                  <input
                    type="text"
                    value={editedItem.email}
                    onChange={(e) =>
                      setEditedItem({ ...editedItem, email: e.target.value })
                    }
                  />
                ) : (
                  item.email
                )}
              </td>
              <td className="">
                {editingItemId === item._id ? (
                  <input
                    type="text"
                    value={editedItem.phone}
                    onChange={(e) =>
                      setEditedItem({ ...editedItem, phone: e.target.value })
                    }
                  />
                ) : (
                  item.phone
                )}
              </td>
              <td className="">
                {editingItemId === item._id ? (
                  <input
                    type="text"
                    value={editedItem.month}
                    onChange={(e) =>
                      setEditedItem({ ...editedItem, month: e.target.value })
                    }
                  />
                ) : (
                  item.month
                )}
              </td>
              <td className="">
                {editingItemId === item._id ? (
                  <select
                    value={editedItem.status}
                    onChange={(e) =>
                      setEditedItem({ ...editedItem, status: e.target.value })
                    }
                  >
                    <option value="closed">Closed</option>
                    <option value="pending">Pending</option>
                    <option value="lost">Lost</option>
                    <option value="not_connected">Not Connected</option>
          
                  </select>
                ) : (
                  item.status
                )}
              </td>
              <td className="">
                {editingItemId === item._id ? (
                  <>
                    <button
                      style={{ marginRight: "10px" }}
                      className="btn btn-primary"
                      onClick={handleUpdate}
                    >
                      <i className="bi bi-upload"></i>
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={handleCancelEdit}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      style={{ marginRight: "10px" }}
                      className="btn btn-success"
                      onClick={() => handleEdit(item)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>

      
      </table>

              
    
    </div>
    </div><br></br>
    </div>


  
  );
}

export default Table;
