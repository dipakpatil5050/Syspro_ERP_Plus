import React, { lazy, Suspense, useEffect } from 'react';
import { Row, Col, Spin, Skeleton } from 'antd';
import { Route, Routes, NavLink } from 'react-router-dom';
import UilApps from '@iconscout/react-unicons/icons/uil-apps';
import UilListUl from '@iconscout/react-unicons/icons/uil-list-ul';
import { useSelector, useDispatch } from 'react-redux';
import { Main } from '../../styled';
// import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { TopToolBox } from '../Style';
// import { sorting } from '../../../redux/product/actionCreator';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../components/page-headers/page-headers';
import useDocumentTitle from '../../../components/dynamic-Page-Title/useDocumentTitle';
// import { getCartItem } from '../../../Actions/Catalogue/CartAction';

// const { getCartItem } = lazy(() => import('../../../Actions/Catalogue/CartAction'));

const Filters = lazy(() => import('./overview/Filters'));
const Grid = lazy(() => import('./overview/Grid'));
const List = lazy(() => import('./overview/List'));

const Product = React.memo(() => {
  useDocumentTitle('Catalogue');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const { catalogueData } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (getCartItem) {
  //     dispatch(getCartItem());
  //   }
  // }, [dispatch]);

  const PageRoutes = [
    {
      //   path: '/admin',
      breadcrumbName: 'E-Commerce',
    },
    {
      path: '',
      breadcrumbName: 'Catalogue',
    },
  ];
  const path = '.';

  return (
    <>
      {loading && (
        <>
          <Spin
            size="large"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              zIndex: 99999,
              backgroundColor: 'white',
              borderRadius: '50%',
              padding: '10px',
            }}
          />
        </>
      )}
      <PageHeader className="ninjadash-page-header-main" routes={PageRoutes} />
      <Main>
        <Row gutter={30}>
          {/* filter side bars */}
          <Col className="product-sidebar-col" xxl={5} xl={7} lg={7} md={10} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton paragraph={{ rows: 22 }} active />
                </Cards>
              }
            >
              <Filters />
            </Suspense>
          </Col>
          <Col className="product-content-col" xxl={19} lg={17} md={14} xs={24}>
            <TopToolBox>
              <Row gutter={0}>
                <Col xxl={7} lg={12} xs={24}>
                  {/*
                    // search bar on the top of the screen                  
                    <AutoComplete
                      // onSearch={handleSearch}
                      // dataSource={notData}
                      placeholder="Search"
                      width="100%"
                      patterns
                      1–100 of 
                    />                   
                    */}
                </Col>
                {/* {catalogueData.length > 0 && (
                  <Col xxl={7} lg={12} xs={24}>
                    <p className="search-result">Showing {catalogueData[0]?.FilterTotalCount} results</p>
                  </Col>
                )} */}
                <Col xxl={10} xs={24} align="end">
                  <div className="product-list-action d-flex justify-content-between align-items-center">
                    {/* {(window.innerWidth <= 991 && window.innerWidth >= 768) ||
                        (window.innerWidth > 575 && (
                          <div className="product-list-action__viewmode">
                            <NavLink to={`${path}/grid`}>
                              <UilApps />
                            </NavLink>
                            <NavLink to={`${path}/list`}>
                              <UilListUl />
                            </NavLink>
                          </div>
                        ))} */}
                    <div className="product-list-action__viewmode">
                      <NavLink to={`${path}/grid`}>
                        <UilApps />
                      </NavLink>
                      <NavLink to={`${path}/list`}>
                        <UilListUl />
                      </NavLink>
                    </div>
                  </div>
                </Col>
              </Row>
            </TopToolBox>

            <Suspense
              fallback={
                <div className="spin d-flex align-center-v">
                  <Spin />
                </div>
              }
            >
              <Routes>
                <Route index element={<Grid />} />
                <Route path="grid" element={<Grid />} />
                <Route path="list" element={<List />} />
              </Routes>
            </Suspense>
          </Col>
        </Row>
      </Main>
    </>
  );
});

export default Product;
