// eslint-disable-next-line
import React, { useState } from 'react';
// eslint-disable-next-line
import './form.css';
import axios from 'axios';
// eslint-disable-next-line
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap'; // Import Bootstrap Alert component
function EmployeeRegistration() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [empid, setEmpid] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Name is required';
    }

    if (!empid.trim()) {
      errors.empid = 'Employee ID is required';
    } else if (!/^[A-Za-z0-9]+$/.test(empid)) {
      errors.empid = 'Employee ID must be alphanumeric';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (!phone.trim()) {
      errors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = 'Phone must be a 10-digit number';
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/EmployeeRegistration`, {
          name,
          empid,
          email,
          password,
          phone,
        });

        if (response.status === 201) {
          setErrorMessage('Registration Successful');
          navigate('/EmployeeLogin');
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrorMessage('User with this email already exists');
        } else {
          console.log('Error:', error);
          setErrorMessage('Error during registration');
        }
      }
    }
  };

  return (
    <div className="m-4 w-100 d-flex justify-content-center align-items-center">
      <section className="container col-md-5 col-lg-6 col-xl-3 col-sm-8 m-auto d-flex justify-content-center align-items-center  p-4 rounded" id="enroll">
      <lord-icon
    src="https://cdn.lordicon.com/lhwyshcs.json"
    trigger="loop"
    delay="2000"

    state="hover-jump"
    colors="primary:#30c9e8,secondary:#0d6efd"
    style={{ width: '90px', height: '90px' }}
  >
  </lord-icon>
        <h2 className="text-center">Signup</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form name="form" className="form" onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              name="empid"
              value={empid}
              onChange={(e) => setEmpid(e.target.value)}
              className={`form-control ${validationErrors.empid ? 'is-invalid' : ''}`}
              placeholder="Employee ID"
              required
            />
            {validationErrors.empid && <div className="invalid-feedback">{validationErrors.empid}</div>}
          </div>
          <div className="input-box">
            <input
              type="text"
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`}
              placeholder="Full Name"
              required
            />
            {validationErrors.name && <div className="invalid-feedback">{validationErrors.name}</div>}
          </div>
          <div className="input-box">
            <input
              type="email"
              className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="Email"
              placeholder="Email Address"
              required
            />
            {validationErrors.email && <div className="invalid-feedback">{validationErrors.email}</div>}
          </div>
          
            <div className="input-box">
              <input
                type="text"
                value={phone}
                className={`form-control ${validationErrors.phone ? 'is-invalid' : ''}`}
                onChange={(e) => setPhone(e.target.value)}
                name="Phone"
                placeholder="Phone"
                required
              />
              {validationErrors.phone && <div className="invalid-feedback">{validationErrors.phone}</div>}
            </div>
        
          <div className="input-box">
            <input
              type="password"
              className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="Password"
              placeholder="Password"
              required
            />
            {validationErrors.password && <div className="invalid-feedback">{validationErrors.password}</div>}
          </div>
          
          <div className="text-center">
          <button type="submit" className="btn btn-primary fontstyle"><span className="fontstyle">Signup</span></button>
          </div>
        </form>
        <br />
        <p className="text-center fontstyle">
          Already have an account? <span><Link to="/EmployeeLogin">Login</Link></span>
        </p>
      </section>
    </div>
  );
}

export default EmployeeRegistration;
