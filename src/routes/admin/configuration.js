import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
// import RuleManagement from '../../components/Rules-Master/RuleManagement';
import AssignRuleToUser from '../../components/Rules-Master/AssignRuleToUser';
import RuleMaster from '../../components/Rules-Master/rule-form/RuleMaster';
import RuleAssignment from '../../components/Rules-Master/rule-form/RuleAssignment';
import CreateRule from '../../components/Rules-Master/rule-form/CreateRule';

const DashboardBase = lazy(() => import('../../container/dashboard/DashboardBase'));
const NotFound = lazy(() => import('../../container/pages/404'));

function ConfigurationRoute() {
  return (
    <Routes>
      <Route exact path="base" element={<DashboardBase />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/rulemaster" element={<RuleMaster />} />
      <Route path="/rulemaster/createrule" element={<CreateRule />} />
      <Route path="/rulemaster/createrule/:mode/:ruleId?" element={<CreateRule />} />
      <Route path="/ruleassign" element={<RuleAssignment />} />
      <Route path="/assigntouser" element={<AssignRuleToUser />} />
    </Routes>
  );
}

export default ConfigurationRoute;
