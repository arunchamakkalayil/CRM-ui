import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
// import EmployeeRegistration from "./components/EmployeeRegistration";
import EmployeeLogin from "./components/EmployeeLogin";
import TableData from "./components/Table";
import Navbar from "./components/Navbar";
import AddData from "./components/AddData";
import NotFound from "./components/NotFound"; // Import your 404 page component
import "./App.css";
import Contact from "./components/Contact";
import ContactForm from "./components/ContactForm";
import EmailVerification from "./components/EmailVerification";
import ResetPassword from "./components/ResetPassword";
import NewPassword from "./components/NewPassword";
import Viewer from "./components/viewer/Viewer"
import Camps from "./components/Camps"
import AddCamp from "./components/AddCamp"

function App() {
  const location = useLocation();



  const RouteWrapper =
  location.pathname === "/email" ||
    location.pathname==="/contactform" ||
    location.pathname==="/contact" ||
    location.pathname==="/create" ||
    location.pathname==="/table" ||
    location.pathname==="/camps" ||
    location.pathname==="/addcamp"

  return (
    <div className="App">
      {RouteWrapper && <Navbar />}{" "}
      {/* Render Sidebar conditionally */}
      <Routes>
        <Route path="/" element={<Viewer />} />
        {/* <Route
          path="/EmployeeRegistration"
          element={<EmployeeRegistration />}
        /> */}
        <Route path="/EmployeeLogin" element={<EmployeeLogin />} />
        <Route path="/table" element={<TableData />} />
        <Route path="/create" element={<AddData />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contactform" element={<ContactForm />} />
        <Route path="/verify-email/:token" element={<EmailVerification />} />
        <Route path="/reset-password/:token" element={<NewPassword />} />
        <Route path="/camps" element={<Camps />} />
        <Route path="/addcamp" element={<AddCamp />} />
        <Route path="/forgotpassword" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
