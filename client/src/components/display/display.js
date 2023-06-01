import React, { useState } from "react";
import './display.css';


export default function Display({message, status}) {

  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div>
      {isVisible && (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <span>{message}</span>
          <button onClick={handleClose} style={{ marginLeft: '10px' }}>
            x
          </button>
        </div>
      )}
    </div>
  );
};