import React, { useEffect ,useContext } from "react";
import Navbar from "./Navbar";
import { useNavigate , Link} from 'react-router-dom'
import Context from '../context/Context';
import Table from "./Table";

function Dashboard() {
  const navigate = useNavigate();
  const {delMessage, setDelMessage,delStatus, setDelStatus}=useContext(Context);

  

  const dashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    
    if(!token) navigate('/EmployeeLogin')
   
  };


  
  useEffect(() => {
    dashboardValid();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
   
      }}
    ><Navbar />
      <div style={{
         marginTop:"100px"
   
      }}>
               {delMessage && (
  <div className="alert alert-success" role="alert">
    {delStatus}
  </div>
)}
        <Link to="/create" className="btn btn-success">Add Data</Link>


        <Table />
       
      </div>
    </div>
  );
}

export default Dashboard;
