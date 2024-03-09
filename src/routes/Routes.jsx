import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientAuth from '../components/Client mpin auth/ClientAuth';
// import ClientAuth from '../Client Auth/ClientAuth';
// import ClientLogin from '../Client Login/ClientLogin';
// import Home from '../Home Page/Home';
// import NoPage from '../nopage/NoPage';
function RouteFile() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<ClientAuth />} />
          {/* <Route path="/login" element={<ClientLogin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<NoPage />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default RouteFile;
