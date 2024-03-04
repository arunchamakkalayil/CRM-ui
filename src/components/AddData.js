import React, { useState } from "react";
import axios from "axios";
import "./form.css";

function AddData() {

  const [name, setName] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [errVisible, seterrVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [month, setMonth] = useState("");
  const [status, setStatus] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/create", {
        name,
        email,
        phone,
        month,
        status,
      });

      console.log(response);
      if (response.status === 201) {
        setIsVisible(true);
        setMessage("Data saved successfully");

        setTimeout(() => {
          setIsVisible(false);
          setName("")
          setMessage("")
          setEmail("")
          setPhone("")
          setStatus("")
        }, 4000);
      } 
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Access the error message from the response data
        seterrVisible(true);
        setError(error.response.data.error);
        // Automatically hide the alert after 4 seconds (4000 milliseconds)
        setTimeout(() => {
          seterrVisible(false);
          setName("")
          setMessage("")
          setEmail("")
          setPhone("")
          setStatus("")
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
  <div className="alert alert-success" role="alert" style={{ position: 'fixed', top: 20, right: 20 }}><i class="bi bi-check2-circle"> </i>
    {message}
  </div>
)}

{errVisible && (
  <div className="alert alert-danger" role="alert" style={{ position: 'fixed', top: 20, right: 20 }}><i class="bi bi-exclamation-diamond"> </i>
    {error}
  </div>
)}


        <form name="form" className="form" onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              name="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="form-control"
              placeholder="Enter Full Name"
    
            ></input>
          </div>
          <div className="input-box">
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              name="Email"
              placeholder="Enter Email Address"
           
            ></input>
          </div>
          <div className="input-box">
          <select required
        className="form-select"
        value={month}
        onChange={handleMonthChange}
      >
        <option value="" disabled>Select Month</option>
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
                type="phone"
                value={phone}
                className="form-control"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                name="Phone"
                placeholder="Phone"
                required
              ></input>
            </div>
          </div>

          <div className="column">
  <div className="input-box">
    <select
      value={status}
      className="form-control"
      onChange={(e) => {
        setStatus(e.target.value);
      }}
      name="Status"
      required
    >
      <option value="" disabled>Select a Status</option>
      <option value="closed">Closed</option>
      <option value="pending">Pending</option>
      <option value="not_connected">Not Connected</option>
      <option value="lost">Lost</option>
   
    </select>
  </div>
</div>


          <div className="text-center">
            <button type="submit">Submit</button>
          </div>
        </form>
        <br />
      </section>
    </div>
  );
}

export default AddData;
