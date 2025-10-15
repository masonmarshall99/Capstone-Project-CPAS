import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Styling/CSS/Main.css";
// import { SharedData } from "./Data";

// Authentication Check //
import { useAuth } from "./CheckAuth";

// Route Protection //
import ProtectRoutes from "./ProtectRoutes";

// Account pages //
import Loading from "./Pages/Loading";
import Login from "./Pages/Login";
import CreateAccount from "./Pages/CreateAccount";
import Account from "./Pages/Account";

// Dash pages //
import Dash from "./Pages/Dash";
import Disease from "./Pages/Disease";
import Historical from "./Pages/Historical";
import FAQ from "./Pages/Faq";
import Help from "./Pages/Help";
import Contact from "./Pages/Contact";
import FileUpload from "./Pages/FileUpload";


function App() {
  const { loading, user } = useAuth();

  if (loading) {
    return <div>Loading user session...</div>;
  }
  
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/account" element={<ProtectRoutes authOnly> <Account /> </ProtectRoutes>} />
          <Route path="/login" element={<ProtectRoutes guestOnly> <Login /> </ProtectRoutes>} />
          <Route path="/create-account" element={<ProtectRoutes guestOnly> <CreateAccount /> </ProtectRoutes>} />
          <Route path="/dash" element={<Dash />} />
          <Route path="/historical" element={<Historical />} />
          <Route path="/disease" element={<Disease />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/help" element={<Help />} />``
          <Route path="/Contact" element={<Contact />} />

          <Route path="/fileupload" element={<FileUpload />} />
        </Routes>
      </Router>
  );
}

export default App;
