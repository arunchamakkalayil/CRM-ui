import React, { useState } from "react";
import axios from "axios";
import { read, utils } from "xlsx";
import "./form.css";

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const Data = utils.sheet_to_json(sheet, { header: 1 });
      // Filter out empty arrays
  const filteredData = Data.filter(row => row.length > 0);

  console.log(filteredData);
  setParsedData(filteredData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postData = {
        name,
        email,
        phone,
        month,
        status,
      };
      console.log(postData);
      const response = await axios.post(`${process.env.REACT_APP_URL}/addData`, postData);

      console.log(response);
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
        console.error(error);
      }
    }
  };

  const excelSubmit = async (e) => {
    e.preventDefault();

    try {
          // Filter out empty rows
    const filteredData = parsedData.filter(row => row.length > 0);

      const excelData = { data: filteredData };
console.log(excelData)
      const response = await axios.post(`${process.env.REACT_APP_URL}/excelData`, excelData);

      console.log(response);
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
        console.error(error);
      }
    }
  };

  // Function to handle change in selected month
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className="col-lg-6 m-auto mt-5">
      <section className="container pt-5" id="enroll">
        <h2 className="text-center">Add Data</h2>
        {isVisible && (
          <div className="alert alert-success" role="alert">
            Data saved successfully
          </div>
        )}
        {errVisible && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
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
            <button type="submit" className="btn btn-primary fontstyle">
              Add
            </button>
          </div>
        </form>
        <br />
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-box">
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="form-control"
              placeholder="Upload Excel File"
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary fontstyle" onClick={excelSubmit}>
              Submit Excel Data
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default AddData;
