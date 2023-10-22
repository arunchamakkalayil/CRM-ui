// MyContextProvider.js

import React, { useState } from "react";
import Context from "./Context";

const ContextProvider = ({ children }) => {
 
  const [delMessage, setDelMessage] = useState(false);
  const [delStatus, setDelStatus] = useState("");
 




    // For debugging purposes, log the values
    console.log("delMessage:", delMessage);
    console.log("delStatus:", delStatus);
    
  return (
    <Context.Provider value={{ delMessage, setDelMessage,delStatus, setDelStatus }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
