import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Context from "../context/Context";
import ReactPaginate from "react-paginate"; // Import react-paginate
import "./css/table.css";

function Table() {
  const { setDelMessage, setDelStatus } = useContext(Context);
  const [data, setData] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedItem, setEditedItem] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [currentPage, setCurrentPage] = useState(0); // State to keep track of the current page
  const itemsPerPage = 10; // Number of items to display per page

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
      console.error("Error updating item:", error);
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

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected); // Update the current page
  };

  const visibleData = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="table-responsive px-5">
      <table
        id="dtBasicExample"
        className="table table-striped table-bordered table-sm"
        cellSpacing="0"
        width="100%"
      >
        <thead>
          <tr>
            <th className="px-5 th-sm" scope="col">
              Name
            </th>
            <th className="px-5 th-sm" scope="col">
              Email
            </th>
            <th className="px-5 th-sm" scope="col">
              Phone
            </th>
            <th className="px-5 th-sm" scope="col">
              Status
            </th>
            <th className="px-5 th-s" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {visibleData.map((item) => (
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
                  <select
                    value={editedItem.status}
                    onChange={(e) =>
                      setEditedItem({ ...editedItem, status: e.target.value })
                    }
                  >
                    <option value="closed">Closed</option>
                    <option value="pending">Pending</option>
                    <option value="not_connected">Not Connected</option>
                    {/* Add more options as needed */}
                  </select>
                ) : (
                  item.status
                )}
              </td>

              <td className="px-5">
                {editingItemId === item._id ? (
                  <>
                    <button
                      style={{ marginRight: "10px" }}
                      className="btn btn-primary"
                      onClick={handleUpdate}
                    >
                      <i class="bi bi-upload"></i>
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={handleCancelEdit}
                    >
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      style={{ marginRight: "10px" }}
                      className="btn btn-success"
                      onClick={() => handleEdit(item)}
                    >
                      <i class="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      <i class="bi bi-trash3"></i>
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination component */}
      <ReactPaginate
        pageCount={Math.ceil(data.length / itemsPerPage)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        previousLabel={<i className="bi bi-caret-left-fill"></i>}
        nextLabel={<i className="bi bi-caret-right-fill"></i>}
        breakLabel={"..."}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default Table;
