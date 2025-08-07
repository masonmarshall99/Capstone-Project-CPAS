import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoadingPage from "./Pages/LoadingPage";
import LoginPage from "./Pages/LoginPage";
import CreateAccountPage from "./Pages/CreateAccountPage";

import Dash from "./Pages/Dash";
import Account from "./Pages/Account";
import Disease from "./Pages/Disease";
import Historical from "./Pages/Historical";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoadingPage/>} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
        
        <Route path="/dash" element={<Dash />} />
        <Route path="/historical" element={<Historical />} />
        <Route path="/disease" element={<Disease />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;
