import React from 'react';
import { useNavigate } from 'react-router-dom';

function Verify() {
  const navigate = useNavigate();

  return (
    <div className="verify">
      <div className="spinner"></div>
      <p>Processing payment... please wait</p>
      <button onClick={() => navigate("/myorders")}>
        Go to Orders
      </button>
    </div>
  );
}

export default Verify;