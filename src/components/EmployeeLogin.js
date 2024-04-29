// eslint-disable-next-line
import React, { useEffect, useState } from "react";
// eslint-disable-next-line
import "./form.css";
// eslint-disable-next-line
import { Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line
import axios from "axios";
import 'lord-icon-element'; 
import Loader from "../components/Loader.js";

function EmployeeLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Loader state

  useEffect(() => {
    const userLoggedIn = async () => {
      const token = localStorage.getItem("usersdatatoken");

      if (token) {
        try {
          setIsLoading(true)
          // Send a request to the backend to validate the token
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
            // Token is valid, navigate to the dashboard
            navigate("/dashboard");
          } else {
            // Handle unexpected response status codes
            console.error("Unexpected response status:", response.status);
          }
        } catch (error) {
          // Handle errors in a more specific way
          console.error("Error verifying token:", error);
        } finally {
          setIsLoading(false);
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
    setIsLoading(true); // Show loader

    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/EmployeeLogin`, {
        email,
        password,
      });
      console.log("Response status:", response.status);
      console.log(response.data.result);
      if (response.status === 200) {
        setErrorMessage("");
        console.log(response.data.result.token)
        localStorage.setItem("usersdatatoken", response.data.result.token);
        console.log("Navigating to dashboard"); 
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Invalid password");
      } else if (error.response && error.response.status === 404) {
        setErrorMessage("User not found");
      } else if (error.response && error.response.status === 403) {
        setErrorMessage("Email not verified. Check mail for Verification Link");
      } else {
        console.error("Error:", error);
        setErrorMessage("Something went wrong");
      }
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  return (
    <div className="m-4 w-100 d-flex justify-content-center align-items-center ">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container col-md-5 col-lg-6 col-xl-3 col-sm-8 m-auto d-flex justify-content-center align-items-center  p-4 rounded">
          <div className="logo">
            <lord-icon
              src="https://cdn.lordicon.com/lhwyshcs.json"
              trigger="loop"
              delay="2000"
              state="hover-jump"
              colors="primary:#30c9e8,secondary:#0d6efd"
              style={{ width: '90px', height: '90px' }}
            ></lord-icon>
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
                placeholder="Email"
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
              <button type="submit" className="btn btn-primary fontstyle">
                <span className="fontstyle">Login</span>
              </button>
            </div>
          </form>
          <br />
    
          <div className="text-center fontstyle">
            <Link to="/forgotpassword">Forgot Password?</Link>
          </div>
          <br />
          <p className="text-center fontstyle">
            Create an account{" "}
            <span>
              <Link to="/EmployeeRegistration">Signup</Link>
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default EmployeeLogin;
