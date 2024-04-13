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



  const RouteWrapper =
  location.pathname === "/email" ||
    location.pathname==="/scheduleform" ||
    location.pathname==="/schedule" ||
    location.pathname==="/create" ||
    location.pathname==="/dashboard" ||
    location.pathname==="/table"




  return (
    <div style={{ display: "flex" }} className="App">
      {RouteWrapper && <Sidebar />}{" "}
      {/* Render Sidebar conditionally */}
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
