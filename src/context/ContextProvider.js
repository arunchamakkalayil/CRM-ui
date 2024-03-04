// MyContextProvider.js

import React, { useState } from "react";
import  Context  from "./Context";

const ContextProvider = ({ children }) => {
 
  const [delMessage, setDelMessage] = useState(false);
  const [delStatus, setDelStatus] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [errVisible, seterrVisible] = useState(false);
  const [error, setError] = useState("");
  const [closed, setClosed] = useState(0);
 
  const [pending, setPending] = useState(0);
  const [notConnected, setNotConnected] = useState(0);
  const [lost, setLost] = useState(0);


    // For debugging purposes, log the values
    console.log("delMessage:", delMessage);
    console.log("delStatus:", delStatus);
    
  return (
    <Context.Provider value={{ delMessage, setDelMessage,delStatus, setDelStatus,isVisible, setIsVisible,errVisible, seterrVisible,error, setError,closed, setClosed,pending, setPending,notConnected, setNotConnected,lost, setLost }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
