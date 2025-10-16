import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Styling/CSS/Main.css";
import { SharedData } from "./Data";

// Account pages //
import Loading from "./Pages/Loading";
import Login from "./Pages/Login";
import CreateAccount from "./Pages/CreateAccount";
import Account from "./Pages/Account";

// Dash pages //
import Dash from "./Pages/Dash";
import Disease from "./Pages/Disease";
import Historical from "./Pages/Historical";
import Contact from "./Pages/Contact";
import Download from "./Pages/Download";


function App() {
  return (
    <SharedData>
      <Router>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/account" element={<Account />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dash" element={<Dash />} />
          <Route path="/historical" element={<Historical />} />
          <Route path="/disease" element={<Disease />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/download" element={<Download />} />
        </Routes>
      </Router>
    </SharedData>
  );
}

export default App;
