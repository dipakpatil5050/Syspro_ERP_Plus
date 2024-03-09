/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Row, Col } from 'antd';
// import { Link } from 'react-router-dom';
// import { GridForm } from './overview/GridForm';
// import { SizedForm } from './overview/SizedForm';
// import { InputForm } from './overview/InputForm';
import { InputForm } from '../../container/forms/overview/InputForm';
// import { CheckListWrap } from './overview/Style';
// import { Main } from '../styled';
import { Main } from '../../container/styled';
// import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../page-headers/page-headers';

function LedgerReport() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Ledger Report',
    },
  ];

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Ledger Report" routes={PageRoutes} />
      <div className="">
        <Main>
          <Row gutter={25}>
            <Col lg={12} xs={24}>
              <InputForm />
            </Col>
          </Row>
        </Main>
      </div>
    </>
  );
}

export default LedgerReport;
