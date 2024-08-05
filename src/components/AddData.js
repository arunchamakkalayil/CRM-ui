import React, { useState, useEffect } from "react";
import axios from "axios";
import "./form.css";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function AddData() {
  const [place, setPlace] = useState("");
  const [places, setPlaces] = useState([]); // State to hold fetched camps
  const [isVisible, setIsVisible] = useState(false);
  const [errVisible, setErrVisible] = useState(false);
  const [error, setError] = useState("");
  const [item, setItem] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const navigate = useNavigate();
  const status = "not_picked";

  useEffect(() => {
    // Function to validate token and navigate
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
            navigate("/create");
          } else {
            console.error("Unexpected response status:", response.status);
          }
        } catch (error) {
          console.error("Error occurred:", error);
        }
      } else {
        navigate("/");
      }
    };

    // Fetch camp data and validate token
    userLoggedIn();
    fetchCampData();
  }, [navigate]);

  const fetchCampData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/camps`);
      setPlaces(response.data || []); // Set fetched camps in state
    } catch (error) {
      console.error("Error fetching camps:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!place || !item || !phone || !quantity || !status) {
      setErrVisible(true);
      setError("All fields are required");
      return;
    }

    try {
      setIsLoading(true);
      const postData = {
        place,
        item,
        phone,
        quantity,
        status,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_URL}/addData`,
        postData
      );

      if (response.status === 201) {
        setIsVisible(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 4000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrVisible(true);
        setError(error.response.data.error);
        setTimeout(() => {
          setErrVisible(false);
        }, 4000);
      } else {
        console.error("Error occurred:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="col-lg-6 m-auto mt-5">
          <section className="container pt-5" id="enroll">
            <h2 className="text-center">Add Data</h2>
            <div className="message-container">
              {isVisible && (
                <div className="alert alert-success" role="alert">
                  Data saved successfully
                </div>
              )}
            </div>
            <div className="message-container">
              {errVisible && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
            </div>
            <form name="form" className="form" onSubmit={handleSubmit}>
              <div className="input-box">
                <select
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  className="form-control"
                  required
                >
                  <option value="">Select a camp</option>
                  {places.map((camp) => (
                    <option key={camp._id} value={camp.name}>
                      {camp.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  className="form-control"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  name="item"
                  placeholder="Item name"
                  required
                />
              </div>
              <div className="input-box">
                <input
                  type="number"
                  required
                  className="form-input"
                  value={quantity}
                  onChange={handleQuantityChange}
                  placeholder="Enter quantity"
                />
              </div>
              <div className="column">
                <div className="input-box">
                  <input
                    type="tel"
                    value={phone}
                    className="form-control"
                    onChange={(e) => setPhone(e.target.value)}
                    name="Phone"
                    placeholder="Receiver Contact No."
                    required
                  />
                </div>
              </div>
              <div className="column">
                <div className="input-box">
                  <input
                    type="text"
                    value={status}
                    className="form-control"
                    name="Status"
                    placeholder="Status"
                    required
                    disabled
                  />
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary fontstyle">
                  Add
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}

export default AddData;
