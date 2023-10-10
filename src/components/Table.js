import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Context from "../context/Context";

function Table() {
  const { delMessage, setDelMessage, delStatus, setDelStatus } = useContext(Context);
  const [data, setData] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedItem, setEditedItem] = useState({ name: "", email: "", phone: "" });

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
      setEditedItem({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = (itemId) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");

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

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th className="px-5" scope="col">
              Name
            </th>
            <th className="px-5" scope="col">
              Email
            </th>
            <th className="px-5" scope="col">
              Phone
            </th>
            <th className="px-5" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td className="px-5">
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
              <td className="px-5">
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
              <td className="px-5">
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
              <td className="px-5">
                {editingItemId === item._id ? (
                  <>
                    <button
                      style={{ marginRight: "10px" }}
                      className="btn btn-success"
                      onClick={handleUpdate}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      style={{ marginRight: "10px" }}
                      className="btn btn-success"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
