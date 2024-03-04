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
      await axios.put(`http://localhost:5000/schedule/${editData._id}`, formData);
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
      await axios.delete(`http://localhost:5000/schedule/${itemId}`);
      setData((prevData) => prevData.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error during delete:", error);
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/schedule");
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

  return (
    <div className="container" style={{ maxHeight: "90vh", overflowY: "auto" }}>
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
                }}
              >
                +
              </Link>
      <div className="row">
        {data.map((item) => (
          <div className="col-12 col-sm-12 col-md-6 col-lg-4 mb-4" key={item._id}>
            <div className="card">
        
              <div className="card-body">
                <h5 className="card-title">Interviewer Name:</h5>
                {isEditing && editData === item ? (
                  <input
                  style={{ width: "100%" }}
                    type="text"
                    value={formData.interviewerName}
                    onChange={(e) => handleInputChange(e, "interviewerName")}
                  />
                ) : (
                  <p className="card-text">{item.interviewerName}</p>
                )}

                <h5 className="card-title">Interviewer Email:</h5>
                {isEditing && editData === item ? (
                  <input
                    type="email"
                    style={{ width: "100%" }}
                    value={formData.interviewerEmail}
                    onChange={(e) => handleInputChange(e, "interviewerEmail")}
                  />
                ) : (
                  <p className="card-text">{item.interviewerEmail}</p>
                )}

                <h5 className="card-title">Recipient Name:</h5>
                {isEditing && editData === item ? (
                  <input
                    type="text"
                    style={{ width: "100%" }}
                    value={formData.recipientName}
                    onChange={(e) => handleInputChange(e, "recipientName")}
                  />
                ) : (
                  <p className="card-text">{item.recipientName}</p>
                )}

                <h5 className="card-title">Recipient Email:</h5>
                {isEditing && editData === item ? (
                  <input
                    type="email"
                    style={{ width: "100%" }}
                    value={formData.recipientEmail}
                    onChange={(e) => handleInputChange(e, "recipientEmail")}
                  />
                ) : (
                  <p className="card-text">{item.recipientEmail}</p>
                )}

                <h5 className="card-title">Meet Link:</h5>
                {isEditing && editData === item ? (
                  <input
                    type="text"
                    style={{ width: "100%" }}
                    value={formData.meetLink}
                    onChange={(e) => handleInputChange(e, "meetLink")}
                  />
                ) : (
                  <p className="card-text">{item.meetLink}</p>
                )}

                <h5 className="card-title">Scheduled Time:</h5>
                {isEditing && editData === item ? (
                  <input
                    type="datetime-local"
                    style={{ width: "100%" }}
                    value={formData.scheduledTime} // Set value to previous scheduled time}
                    onChange={(e) => handleInputChange(e, "scheduledTime")}
                  />
                ) : (
                  <p className="card-text">{item.scheduledTime}</p>
                )}

                <div className="text-center">
                  {isEditing && editData === item ? (
                    <><br></br>
                      <button
                        style={{ marginRight: "10px" }}
                        className="btn btn-danger"
                        onClick={handleCancel}
                      >
                        <i className="bi bi-x-lg"></i> Cancel
                      </button>
                      <button className="btn btn-success" onClick={handleUpdate}>
                        <i className="bi bi-upload"></i> Update
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        style={{ marginRight: "10px" }}
                        className="btn btn-primary"
                        onClick={() => handleEdit(item)}
                      >
                        <i className="bi bi-pencil-square"></i> Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>
                        Delete
                      </button>
                    </>
                  )}
                   
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isLoading && <div class="spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>}
    </div>
  );
}

export default Schedule;

