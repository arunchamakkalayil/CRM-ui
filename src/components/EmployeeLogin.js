// eslint-disable-next-line
import React, { useEffect } from "react";
// eslint-disable-next-line
import "./form.css";
// eslint-disable-next-line
import { Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line
import { useState } from "react";
import axios from "axios";
import 'lord-icon-element'; 
function EmployeeLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userLoggedIn = async () => {
      const token = localStorage.getItem("usersdatatoken");

      if (token) {
        try {
          // Send a request to the backend to validate the token
          const response = await axios.post(
            "http://localhost:5000/validateToken",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            // Token is valid, navigate to the dashboard
            navigate("/dashboard");
          } else {
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
        }
      }
    };

    userLoggedIn();
  }, [navigate]);

  const validateForm = () => {
    let isValid = true;

    // Email validation using a regular expression
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailPattern)) {
      setErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setErrorMessage("");
    }

    return isValid;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }


    try {
      const response = await axios.post("http://localhost:5000/EmployeeLogin", {
        email,
        password,
      });

      console.log(response.data.result);
      if (response.status === 201) {
        setErrorMessage("");
        localStorage.setItem("usersdatatoken", response.data.result.token);

    
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Invalid password");
      } else if (error.response && error.response.status === 501) {
        // Other errors

        setErrorMessage("User not found");
      } else {
        console.error("Error:", error);
        setErrorMessage("Something went wrong");
      }
    }
  };

  return (
   <div className="m-4 w-100 d-flex justify-content-center align-items-center ">
   <div className="container col-md-5 col-lg-6 col-xl-3 col-sm-8 m-auto d-flex justify-content-center align-items-center  p-4 rounded">
  <div className="logo">
  <lord-icon
    src="https://cdn.lordicon.com/lhwyshcs.json"
    trigger="loop"
    delay="2000"

    state="hover-jump"
    colors="primary:#30c9e8,secondary:#0d6efd"
    style={{ width: '90px', height: '90px' }}
  >
  </lord-icon>
  </div>
  
    <h2 className="text-center">Login</h2>
    {errorMessage && (
      <div className="text-center error-message">{errorMessage}</div>
    )}
    <form name="form" className="form" onSubmit={handleSubmit}>
      <div className="input-box">
        <input
          type="email"
          className="form-control"
          name="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email "
          required
        ></input>
      </div>

      <div className="input-box">
        <input
          type="password"
          className="form-control "
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          required
        ></input>
      </div>

      <div className="text-center">
        <button type="submit" className="btn btn-primary fontstyle"><span className="fontstyle">Login</span></button>
      </div>
    </form>
    <br />
    <p className="text-center fontstyle">
      Create an account{" "}
      <span >
        <Link  to="/EmployeeRegistration">Signup</Link>
      </span>
    </p>

</div>
  
</div>
  
  
  );
}

export default EmployeeLogin;
