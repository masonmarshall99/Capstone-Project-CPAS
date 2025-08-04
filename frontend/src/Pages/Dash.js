import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dash() {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/account');
  }
  
  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={handleClick}>
        Sign In
      </button>
    </>
  );
}

export default Dash;
