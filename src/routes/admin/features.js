import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import LedgerReport from '../../components/Reports/LedgerReport';

const FormLayouts = lazy(() => import('../../container/forms/FormLayout'));
// const FormElements = lazy(() => import('../../container/forms/FormElements'));
const FormComponents = lazy(() => import('../../container/forms/FormComponents'));
const FormValidation = lazy(() => import('../../container/forms/FormValidation'));
const NotFound = lazy(() => import('../../container/pages/404'));

function FeaturesRoute() {
  return (
    <Routes>
      <Route path="form-layout" element={<FormLayouts />} />
      <Route path="ledger-report" element={<LedgerReport />} />
      <Route path="form-components" element={<FormComponents />} />
      <Route path="form-validation" element={<FormValidation />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default FeaturesRoute;
