import React from 'react';
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
import './style.css'

const Sidebar = () => {
  const navigate = useNavigate();

  
   // Function to handle logout
   const handleLogout = () => {
    // Clear the user's token from local storage
    localStorage.removeItem("usersdatatoken");

    // Navigate to the login page
    navigate("/EmployeeLogin");
  };
  return (
    <div className='shadow' style={{ display: 'flex',minHeight:"100vh" ,overflow: 'scroll initial'}}>
      <CDBSidebar textColor="#fff" backgroundColor="#fff">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: "rgb(116, 116, 116)" }}>
            Lead Tracker
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked ">
              <CDBSidebarMenuItem icon="columns" >Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/table" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Leads</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/schedule" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Meetings</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/email" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="inbox">Email</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
            </NavLink>
        
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>

         
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            <div onClick={handleLogout}><strong><i class="bi bi-box-arrow-right"></i></strong>
</div>
            
            CRM
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
