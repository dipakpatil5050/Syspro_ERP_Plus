import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import RuleMaster from '../../components/Rules-Master/rule-form/RuleMaster';
import RuleAssignment from '../../components/Rules-Master/rule-form/RuleAssignment';
import CreateRule from '../../components/Rules-Master/rule-form/CreateRule';
import RuleAssignMaster from '../../components/Rules-Master/rule-form/RuleAssignMaster';
import useDocumentTitle from '../../components/dynamic-Page-Title/useDocumentTitle';

const DashboardBase = lazy(() => import('../../container/dashboard/DashboardBase'));
const NotFound = lazy(() => import('../../container/pages/404'));

function ConfigurationRoute() {
  useDocumentTitle('Configuration');
  return (
    <Routes>
      <Route exact path="base" element={<DashboardBase />} />
      <Route path="*" element={<NotFound />} />

      <Route path="/rulemaster" element={<RuleMaster />} />
      <Route path="/rulemaster/createrule" element={<CreateRule />} />
      <Route path="/rulemaster/createrule/:mode/:ruleId?" element={<CreateRule />} />

      <Route path="/ruleassign" element={<RuleAssignMaster />} />
      <Route path="/ruleassign/assign-new-rule" element={<RuleAssignment />} />
      <Route path="/ruleassign/assign-new-rule/:mode/:userId?" element={<RuleAssignment />} />
    </Routes>
  );
}

export default ConfigurationRoute;
