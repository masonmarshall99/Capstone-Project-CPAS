import React from 'react';
import { useNavigate } from 'react-router-dom';

function Account() {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/dash');
  }
  
  return (
    <>
      <h1>Account</h1>
      <button onClick={handleClick}>
        Back
      </button>
    </>
  );
}

export default Account;
