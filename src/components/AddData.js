import React, { useState, useEffect } from "react";
import axios from "axios";
import { read, utils } from "xlsx";
import "./form.css";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function AddData() {
  const [name, setName] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [errVisible, setErrVisible] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [month, setMonth] = useState("");
  const [status, setStatus] = useState("");
  const [parsedData, setParsedData] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Loader state

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

    userLoggedIn();
  }, [navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = utils.sheet_to_json(ws, { header: 1 });
      setParsedData(data);
    };
  
    reader.readAsBinaryString(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!name || !email || !phone || !month || !status) {
      setErrVisible(true);
      setError("All fields are required");
      return;
    }

    try {
      setIsLoading(true);
      const postData = {
        name,
        email,
        phone,
        month,
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

  const excelSubmit = async (e) => {
    e.preventDefault();
  
    // Validate parsed data
    // if (parsedData.length === 0) {
    //   setErrVisible(true);
    //   setError("Please upload a valid Excel file");
    //   setTimeout(() => {
    //     setErrVisible(false);
    //   }, 4000);
    //   return;
    // }
  
    try {
      setIsLoading(true);
      const filteredData = parsedData.filter(row => row.length > 0);
      const excelData = { data: filteredData };
  
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/excelData`,
        excelData
      );
  console.log(filteredData)
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
  
  // Function to handle change in selected month
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
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
            )}</div>
            <div className="message-container">
              {errVisible && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}</div>
            <form name="form" className="form" onSubmit={handleSubmit}>
              <div className="input-box">
                <input
                  type="text"
                  name="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  placeholder="Enter Full Name"
                  required
                />
              </div>
              <div className="input-box">
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="Email"
                  placeholder="Enter Email Address"
                  required
                />
              </div>
              <div className="input-box">
                <select
                  required
                  className="form-select"
                  value={month}
                  onChange={handleMonthChange}
                >
                  <option value="" disabled>
                    Select Month
                  </option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>
              <div className="column">
                <div className="input-box">
                  <input
                    type="tel"
                    value={phone}
                    className="form-control"
                    onChange={(e) => setPhone(e.target.value)}
                    name="Phone"
                    placeholder="Phone"
                    required
                  />
                </div>
              </div>
              <div className="column">
                <div className="input-box">
                  <select
                    value={status}
                    className="form-control"
                    onChange={(e) => setStatus(e.target.value)}
                    name="Status"
                    required
                  >
                    <option value="" disabled>
                      Select a Status
                    </option>
                    <option value="closed">Closed</option>
                    <option value="pending">Pending</option>
                    <option value="not_connected">Not Connected</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary fontstyle"
                >
                  Add
                </button>
              </div>
            </form>
            <br />
            <form
              className="form"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="input-box">
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                  className="form-control"
                  placeholder="Upload Excel File"
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary fontstyle"
                  onClick={excelSubmit}
                >
                  Submit Excel Data
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
