import { Spin } from 'antd';
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './dashboard';
import Features from './features';
import Ecommerce from './ecommerce';
import Pages from './pages';
import withAdminLayout from '../../layout/withAdminLayout';

const Components = lazy(() => import('./components'));
const Configuration = lazy(() => import('./configuration'));

const NotFound = lazy(() => import('../../container/pages/404'));

const Admin = React.memo(() => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route index path="/*" element={<Dashboard />} />
        <Route path="pages/*" element={<Pages />} />
        <Route path="components/*" element={<Components />} />
        <Route path="configuration/*" element={<Configuration />} />

        <Route path="features/*" element={<Features />} />
        <Route path="ecommerce/*" element={<Ecommerce />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
});

export default withAdminLayout(Admin);
