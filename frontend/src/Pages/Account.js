import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styling/CSS/AuthPages.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  

  const handleCreateAccountClick = () => {
  navigate('/create-account');
};


  const handleLoginClick = () => {
    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }

    navigate('/dash');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h1 className="auth-title">Sign In</h1>

        <form>
          <label>Username</label>
          <input
            type="text"
            className="input-field"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="text-link">
            <a href="#">Forgot your password?</a>
          </div>

          <button type="button" className="button-primary" onClick={handleLoginClick}>
            Login
          </button>

          <button type="button" className="button-secondary mt-2" onClick={handleCreateAccountClick}>
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
