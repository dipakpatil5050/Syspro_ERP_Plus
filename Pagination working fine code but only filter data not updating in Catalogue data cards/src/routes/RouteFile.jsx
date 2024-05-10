import React, { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from '../container/pages/404';

const Login = lazy(() => import('../container/profile/authentication/overview/ClientMpin'));
// import ClientAuth from '../Client Auth/ClientAuth';
// import ClientLogin from '../Client Login/ClientLogin';
// import Home from '../Home Page/Home';
// import NoPage from '../nopage/NoPage';
function RouteFile() {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Login />} />
          {/* <Route path="/" exact element={<ClientAuth />} /> */}
          {/* <Route path="/login" element={<ClientLogin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<NoPage />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default RouteFile;
