import React from 'react'
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();

   // Function to handle logout
   const handleLogout = () => {
    // Clear the user's token from local storage
    localStorage.removeItem("usersdatatoken");

    // Navigate to the login page
    navigate("/EmployeeLogin");
  };
  return (
    <div>
      <nav className="navbar bg-body-tertiary fixed-top">
  <div className="container-fluid">
    <a className="navbar-brand" >Dashboard</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" >Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" >Link</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item">Action</a></li>
              <li><a className="dropdown-item" >Another action</a></li>
              <li>
       
              </li>
              <li><a className="dropdown-item" >Something else here</a></li>
            </ul>
          </li>
        </ul>
        <form className="d-flex mt-3" role="search">
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
        </form>
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar

