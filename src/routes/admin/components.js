import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const DashboardBase = lazy(() => import('../../container/dashboard/DashboardBase'));
const NotFound = lazy(() => import('../../container/pages/404'));

function ComponentRoute() {
  return (
    <Routes>
      <Route exact path="base" element={<DashboardBase />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default ComponentRoute;
