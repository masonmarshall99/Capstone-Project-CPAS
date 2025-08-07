import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dash from "./Pages/Dash";
import Account from "./Pages/Account";
import Disease from "./Pages/Disease";
import Historical from "./Pages/Historical";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dash" replace />} />
        <Route path="/dash" element={<Dash />} />
        <Route path="/historical" element={<Historical />} />
        <Route path="/disease" element={<Disease />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;
