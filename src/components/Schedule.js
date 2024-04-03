import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate ,Link} from "react-router-dom";

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
  const navigate = useNavigate();

  const handleUpdate = async () => {
    try {
      setIsLoading(true); // Show loader while updating
      await axios.put(`${process.env.REACT_APP_URL}/schedule/${editData._id}`, formData);
      getData();
      setIsEditing(false);
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
      scheduledTime: item.scheduledTime ,
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
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
    const dashboardValid = async () => {
      let token = localStorage.getItem("usersdatatoken");
      if (!token) navigate("/EmployeeLogin");
    };
    dashboardValid();
    getData();
  }, [navigate]);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  return (
    

    <div className="dashboard-content w-100" style={{ overflowY: "auto" }}>
    <div className=" container-fluid" >
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
      <div className="row" >
        <div className="col-md-12" >
        <div className="table-container"  style={{ maxHeight: "400px", overflowY: "auto" }}>
       
        <table className="table mx-auto"  >
        <colgroup>
      <col style={{ width: "10%" }} /> {/* Adjust the width as needed */}
      <col style={{ width: "10%" }} />
      <col style={{ width: "10%" }} />
      <col style={{ width: "10%" }} />
      <col style={{ width: "10%" }} />
      <col style={{ width: "10%" }} />
      <col style={{ width: "10%" }} /> {/* Adjust the width as needed */}
    </colgroup>
  <thead>
    <tr>
      <th className="th-sm">Interviewer</th>
      <th >Interviewer Email</th>
      <th >Recipient </th>
      <th >Recipient Email</th>
      <th >Meet Link</th>
      <th >Time</th>
      <th >Actions</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item) => (
      <tr key={item._id}>
        <td >
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
        <td>
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
        <td style={{ padding: '10px' }}>
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
        <td style={{ padding: '10px' }}>
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
        <td style={{ padding: '10px' }}>
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
        <td style={{ padding: '10px' }}>
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
        <td style={{ padding: '10px' }}>
          {isEditing && editData === item ? (
            <>
              <button
                style={{ marginRight: "10px" }}
                className="btn btn-danger"
                onClick={handleCancel}
              >
                <i className="bi bi-x-lg"></i> 
              </button>
              <button className="btn btn-success" onClick={handleUpdate}>
                <i className="bi bi-upload"></i> 
              </button>
            </>
          ) : (
            <>
              <button
                style={{ marginRight: "10px" }}
                className="btn btn-primary"
                onClick={() => handleEdit(item)}
              >
                <i className="bi bi-pencil-square"></i>
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>
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

          {isLoading && (
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
  
}

export default Schedule;

