import Home from "./components/Home";
import EmployeeRegistration from "./components/EmployeeRegistration";
import { Route, Routes } from "react-router-dom";
import EmployeeLogin from "./components/EmployeeLogin";
import AdminLogin from "./components/AdminLogin";
import Registration from "./components/AdminRegistration";

function App() {
  return (
    <div className="App">
    
      <Routes>
      <Route
          path="/"
          element={<Home />}
        />
        <Route path="/EmployeeRegistration" element={<EmployeeRegistration />}/>
        <Route path="/AdminLogin" element={<AdminLogin />}></Route>

        <Route path="/EmployeeLogin" element={<EmployeeLogin />}></Route>
        <Route path="/Registration" element={<Registration />}></Route>
 
      </Routes>
    </div>
  );
}

export default App;
