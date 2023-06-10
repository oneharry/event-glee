import React, { useEffect, useState } from "react";
import './display.css';
import { useAuth } from "../../context/context";


export default function Display() {

  const [isVisible, setIsVisible] = useState(true);

  const { errmsg, status, setDisplayMsg } = useAuth();

  useEffect(() => {
    
  }, [errmsg, status, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    setDisplayMsg("", "")
  };

  setTimeout(() => {
    handleClose()
  }, 5000)

  return (errmsg !== '') && (
    <>
      {isVisible && (
        <div className="display" style={ (status === 'failure') ? {backgroundColor: 'red'}: null} >
          <div className="disp-message">
            <p>{errmsg}</p>
            <button onClick={handleClose} style={{ marginLeft: '10px' }}>
              x
            </button>
          </div>
        </div>
      )}
    </>
  );
};