import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import RuleManagement from '../../components/Rules/RuleManagement';
import AssignRuleToUser from '../../components/Rules/AssignRuleToUser';

const DashboardBase = lazy(() => import('../../container/dashboard/DashboardBase'));
const NotFound = lazy(() => import('../../container/pages/404'));

function ComponentRoute() {
  return (
    <Routes>
      <Route exact path="base" element={<DashboardBase />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/rules" element={<RuleManagement />} />
      <Route path="/assigntouser" element={<AssignRuleToUser />} />
    </Routes>
  );
}

export default ComponentRoute;
