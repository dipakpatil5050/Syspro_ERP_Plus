import React, { lazy, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AuthLayout from '../container/profile/authentication/Index';

const SignIn = lazy(() => import('../components/Authentication/SignIn'));

// const ForgotPass = lazy(() => import('../container/profile/authentication/overview/ForgotPassword'));

const ClientMpin = lazy(() => import('../components/Authentication/ClientMpin'));

const ClientLogin = lazy(() => import('../components/Authentication/ClientLogin'));

// const SignUp = lazy(() => import('../container/profile/authentication/overview/Signup'));
// const FbLogin = lazy(() => import('../container/profile/authentication/overview/FbSignIn'));
// const FbSignUp = lazy(() => import('../container/profile/authentication/overview/FbSignup'));
// const NotFound = lazy(() => import('../container/pages/404'));

const AuthRoot = () => {
  const navigate = useNavigate();

  useEffect(() => navigate('/'));
};

const FrontendRoutes = React.memo(() => {
  return (
    <Routes>
      <Route index element={<ClientMpin />} />
      <Route path="login" element={<ClientLogin />} />
      <Route path="signin" element={<SignIn />} />

      {/* <Route path="forgotPassword" element={<ForgotPass />} />
      <Route path="register" element={<SignUp />} />
      <Route path="fbRegister" element={<FbSignUp />} />
      <Route path="fbSignIn" element={<FbLogin />} /> */}
      {/* <Route path="*" element={<NotFound />} /> */}
      <Route path="*" element={<AuthRoot />} />
    </Routes>
  );
});

export default AuthLayout(FrontendRoutes);
