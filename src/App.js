import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import EmployeeRegistration from "./components/EmployeeRegistration";
import EmployeeLogin from "./components/EmployeeLogin";
import TableData from "./components/Table";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AddData from "./components/AddData";
import NotFound from "./components/NotFound"; // Import your 404 page component
import "./App.css";
import Schedule from "./components/Schedule";
import ScheduleForm from "./components/ScheduleForm";
import EmailBox from "./components/EmailBox";
import EmailVerification from "./components/EmailVerification";

function App() {
  const location = useLocation();

  // Check if the current route is EmployeeRegistration or EmployeeLogin
  const isEmployeeRoute =
    location.pathname.includes("/EmployeeRegistration") ||
    location.pathname.includes("/EmployeeLogin") ||
    location.pathname === "/";

  // Check if the current route is the EmailVerification component
  const isEmailVerificationRoute = location.pathname.includes("/verify-email");

  // Determine whether to show the sidebar based on the current route
  const showSidebar = !(isEmployeeRoute || isEmailVerificationRoute || location.pathname === "/dashboard");

  // Determine whether to show the 404 page based on the current route
  const showNotFound = !(
    isEmployeeRoute ||
    isEmailVerificationRoute ||
    location.pathname === "/" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/table" ||
    location.pathname === "/schedule" ||
    location.pathname === "/scheduleform" ||
    location.pathname === "/email"
  );

  console.log("Location:", location.pathname);
  console.log("Is Employee Route:", isEmployeeRoute);
  console.log("Is Email Verification Route:", isEmailVerificationRoute);
  console.log("Show Sidebar:", showSidebar);
  console.log("Show Not Found:", showNotFound);

  return (
    <div style={{ display: "flex" }} className="App">
      {showSidebar && <Sidebar />} {/* Render Sidebar conditionally */}
      <Routes>
        <Route path="/" element={<EmployeeLogin />} />
        <Route
          path="/EmployeeRegistration"
          element={<EmployeeRegistration />}
        />
        <Route path="/EmployeeLogin" element={<EmployeeLogin />} />
        <Route path="/table" element={<TableData />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<AddData />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/scheduleform" element={<ScheduleForm />} />
        <Route path="/email" element={<EmailBox />} />
        <Route path="/verify-email/:token" element={<EmailVerification />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </div>
  );
}

export default App;
