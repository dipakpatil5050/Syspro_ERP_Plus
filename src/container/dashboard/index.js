import React, { lazy, Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import useDocumentTitle from '../../components/dynamic-Page-Title/useDocumentTitle';

const OverviewDataList = lazy(() => import('./overview/index/OverviewDataList'));
const SalesReport = lazy(() => import('./overview/index/SalesReport'));
const SalesGrowth = lazy(() => import('./overview/index/SalesGrowth'));

// const SalesByLocation = lazy(() => import('./overview/index/SalesByLocation'));
// const TopSellingProduct = lazy(() => import('./overview/index/TopSellingProducts'));
// const BrowserState = lazy(() => import('./overview/index/BrowserState'));

function Dashboard() {
  useDocumentTitle('Dashboard');
  const PageRoutes = [
    {
      // path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Dashboard Overview',
    },
  ];
  return (
    <>
      <PageHeader className="ninjadash-page-header-main" routes={PageRoutes} />

      <Main>
        <Row gutter={25}>
          <Col style={{ width: '100%' }}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <OverviewDataList />
            </Suspense>
          </Col>
          <Col style={{ width: '100%' }}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <SalesGrowth />
            </Suspense>
          </Col>
          <Col style={{ width: '100%' }}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <SalesReport />
            </Suspense>
          </Col>
          <Col xxl={16} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              {/* <SalesByLocation /> */}
            </Suspense>
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xl={12} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              {/* <TopSellingProduct /> */}
            </Suspense>
          </Col>
          <Col xl={12} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              {/* <BrowserState /> */}
            </Suspense>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Dashboard;
