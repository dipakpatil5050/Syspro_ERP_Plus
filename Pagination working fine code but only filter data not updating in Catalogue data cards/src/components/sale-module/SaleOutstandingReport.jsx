/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Row, Col } from 'antd';
// import { Link } from 'react-router-dom';
// import { GridForm } from './overview/GridForm';
// import { SizedForm } from './overview/SizedForm';
// import { InputForm } from './overview/InputForm';
// import { CheckListWrap } from './overview/Style';
// import { Main } from '../styled';
import { Main } from '../../container/styled';
// import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../page-headers/page-headers';

import useDocumentTitle from '../dynamic-Page-Title/useDocumentTitle';

import { SaleOutstandingForm } from '../../container/forms/overview/SaleOutstandingForm';

function SaleOutstandingReport() {
  useDocumentTitle('Sale Outstanding Report');

  const PageRoutes = [
    {
      // path: 'index',
      breadcrumbName: 'Sale Modules',
    },
    {
      path: 'first',
      breadcrumbName: 'Sale Outstanding Report',
    },
  ];

  return (
    <>
      {/* title="Sale Report" */}
      <PageHeader className="ninjadash-page-header-main" routes={PageRoutes} />
      <div className="">
        <Main>
          <Row gutter={30}>
            <Col lg={24} xs={30}>
              <SaleOutstandingForm />
            </Col>
          </Row>
        </Main>
      </div>
    </>
  );
}

export default SaleOutstandingReport;
