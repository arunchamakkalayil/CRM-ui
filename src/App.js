import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import EmployeeRegistration from "./components/EmployeeRegistration";
import EmployeeLogin from "./components/EmployeeLogin";
import TableData from "./components/Table";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AddData from "./components/AddData";
import "./App.css";
import Schedule from "./components/Schedule";
import ScheduleForm from "./components/ScheduleForm";
function App() {
  const location = useLocation();

  // Check if the current route is EmployeeRegistration or EmployeeLogin
  const isEmployeeRoute =
    location.pathname.includes("/EmployeeRegistration") ||
    location.pathname.includes("/EmployeeLogin") ||
    location.pathname === "/";

  return (
    <div style={{ display: "flex" }} className="App">
      {!isEmployeeRoute && <Sidebar />}{" "}
      {/* Render Sidebar if not on Employee routes */}
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
      </Routes>
    </div>
  );
}

export default App;
