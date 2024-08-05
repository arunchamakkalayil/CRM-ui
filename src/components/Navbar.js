import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Navbar, Nav } from 'react-bootstrap';
import '../components/css/navbar.css';

const TopNavbar = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('usersdatatoken');
    navigate('/EmployeeLogin');
  };

  return (
    <>
<Navbar className="px-3" bg="dark" variant="dark" expand="lg">
  <Navbar.Brand>Admin-Pannel</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
      <NavLink exact to="/table" className="nav-link">
        Goods
      </NavLink>
      <NavLink exact to="/contact" className="nav-link">
        Volunteers
      </NavLink>
      <NavLink exact to="/camps" className="nav-link">
        Camps
      </NavLink>
    </Nav>
    <Nav className="ms-auto">
      <Nav.Link onClick={() => setShowLogoutModal(true)}>
        <i className="bi bi-power"></i>Logout
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>



      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TopNavbar;
