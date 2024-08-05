import React, { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap modal components
import './style.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State to control modal visibility

  // Function to handle logout with confirmation popup
  const handleLogout = () => {
    // Clear the user's token from local storage
    localStorage.removeItem("usersdatatoken");

    // Navigate to the login page
    navigate("/EmployeeLogin");
  };

  return (
    <div className='shad' style={{ }}>
      <CDBSidebar textColor="#fff" className='pro-sidebar-footer'>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: "#fff" }}>
            Lead Tracker
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content pro-sidebar-footer">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked ">
              <CDBSidebarMenuItem icon="columns" >Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/table" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Goods</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/contact" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table"> Delivery Hubs</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/email" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="inbox">Email</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div style={{ padding: '20px 5px' }}>

            <strong><i  onClick={() => setShowLogoutModal(true)} className="bi bi-power"></i></strong>
            <br></br><strong>CRM</strong> <span> V 1.0</span>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>

      {/* Bootstrap modal for logout confirmation */}
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
    </div>
  );
};

export default Sidebar;
