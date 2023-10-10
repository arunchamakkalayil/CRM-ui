import Home from "./components/Home";
import EmployeeRegistration from "./components/EmployeeRegistration";
import { Route, Routes } from "react-router-dom";
import EmployeeLogin from "./components/EmployeeLogin";



import Dashboard from "./components/Dashboard";
import AddData from "./components/AddData";

function App() {
  return (
    <div className="App">
    
      <Routes>
      <Route
          path="/"
          element={<Home />}
        />
        <Route path="/EmployeeRegistration" element={<EmployeeRegistration />}/>


        <Route path="/EmployeeLogin" element={<EmployeeLogin />}></Route>

        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/create" element={<AddData />}></Route>
      </Routes>
    </div>
  );
}

export default App;
