import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const FormLayouts = lazy(() => import('../../container/forms/FormLayout'));
// const FormElements = lazy(() => import('../../container/forms/FormElements'));
const FormComponents = lazy(() => import('../../container/forms/FormComponents'));
const FormValidation = lazy(() => import('../../container/forms/FormValidation'));
const LegderReport = lazy(() => import('../../components/Reports/LedgerReport'));
const SaleReport = lazy(() => import('../../components/sale-module/SaleReport'));
const SaleReturnReport = lazy(() => import('../../components/sale-module/SaleReturnReport'));
const PurchaseOutstandingReport = lazy(() => import('../../components/Purchase-Module/PurchaseOutstandingReport'));
const StockReport = lazy(() => import('../../components/Purchase-Module/StockReport'));
const NotFound = lazy(() => import('../../container/pages/404'));

function FeaturesRoute() {
  return (
    <Routes>
      <Route path="form-layout" element={<FormLayouts />} />
      <Route path="ledger-report" element={<LegderReport />} />
      <Route path="sale-report" element={<SaleReport />} />
      <Route path="sale-return-report" element={<SaleReturnReport />} />
      <Route path="purchase-outstanding-report" element={<PurchaseOutstandingReport />} />
      <Route path="stock-report" element={<StockReport />} />

      <Route path="form-components" element={<FormComponents />} />
      <Route path="form-validation" element={<FormValidation />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default FeaturesRoute;
