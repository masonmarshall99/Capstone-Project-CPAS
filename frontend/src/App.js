import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./Styling/CSS/Main.css";
import { SharedData } from "./Data";

// Account pages //
import Loading from "./Pages/Loading";
import Account from "./Pages/Account";
import CreateAccount from "./Pages/CreateAccount";

// Dash pages //
import Dash from "./Pages/Dash";
import Disease from "./Pages/Disease";
import Historical from "./Pages/Historical";
import Contact from "./Pages/Contact";
import APITest from "./Pages/APITest";


function App() {
  return (
    <SharedData>
      <Router>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/account" element={<Account />} />
          <Route path="/create-account" element={<CreateAccount />} />

          <Route path="/dash" element={<Dash />} />
          <Route path="/historical" element={<Historical />} />
          <Route path="/disease" element={<Disease />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/apitest" element={<APITest />} />
        </Routes>
      </Router>
    </SharedData>
  );
}

export default App;
