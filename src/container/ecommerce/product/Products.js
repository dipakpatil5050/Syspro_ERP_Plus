import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Spin, Skeleton } from 'antd';
import { Route, Routes, NavLink } from 'react-router-dom';
import UilApps from '@iconscout/react-unicons/icons/uil-apps';
import UilListUl from '@iconscout/react-unicons/icons/uil-list-ul';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setCatalogueData, setLoading } from '../../../redux/reducers/authReducer';

import { Main } from '../../styled';
// import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { TopToolBox } from '../Style';
// import { sorting } from '../../../redux/product/actionCreator';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../components/page-headers/page-headers';
import useDocumentTitle from '../../../components/dynamic-Page-Title/useDocumentTitle';

const Filters = lazy(() => import('./overview/Filters'));
const Grid = lazy(() => import('./overview/Grid'));
const List = lazy(() => import('./overview/List'));

function Product() {
  useDocumentTitle('Catalogue');

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

  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  //   const dispatch = useDispatch();
  //   const searchData = useSelector((state) => state.headerSearchData);

  //   const [state, setState] = useState({
  //     notData: searchData,
  //     active: 'active',
  //   });

  //   const { notData } = state;

  //   const handleSearch = (searchText) => {
  //     const data = searchData.filter((item) => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
  //     setState({
  //       ...state,
  //       notData: data,
  //     });
  //   };

  //   const onSorting = (e) => {
  //     dispatch(sorting(e.target.value));

  //   };

  // Catalogue API variables

  const dispatch = useDispatch();
  const userMpinData = useSelector((state) => state.auth.userMpinData);
  const userData = useSelector((state) => state.auth.userData);
  // const loading = useSelector((state) => state.auth.loading);

  const ServerBaseUrl = userMpinData?.Data?.ServerBaseUrl;
  const mPin = userMpinData?.Data?.mPin;
  const SlugUrl = userMpinData?.Data?.SlugUrl;

  const userheaderdata = userData?.Data;
  const Companyid = userheaderdata?.CompanyID;
  const YearMasterid = userheaderdata?.YearMasterID;
  const Premiseid = userheaderdata?.PremiseID;
  const Departmentid = userheaderdata?.DepartmentID;
  const Userid = userheaderdata?.UserID;

  // Catalogue API Calling :

  const fetchCatalogueData = async () => {
    const isDataFresh = (data) => {
      const expiryTime = 1000 * 60 * 60;
      return Date.now() - data.fetchedAt < expiryTime;
    };

    const cachedData = JSON.parse(localStorage.getItem('catalogueData'));
    if (cachedData && isDataFresh(cachedData)) {
      dispatch(setCatalogueData(cachedData));
      return;
    }

    const CatalogueAPI = `${ServerBaseUrl}api/CommonAPI/FilterProducts`;
    const body = {
      ReportId: 0,
      FromDate: '',
      UptoDate: '',
      FilterString: '',
      OffsetValue: 0,
      PageSize: 100000000,
      OrderByColumn: 'i.Item_id Desc',
      LinkId: 0,
    };

    const headers = {
      'Content-Type': 'application/json',
      CompanyID: Companyid,
      YearMasterID: YearMasterid,
      PremiseID: Premiseid,
      DepartmentID: Departmentid,
      UserID: Userid,
      client: SlugUrl,
      'x-api-key': mPin,
    };

    // setLoading(true);
    try {
      dispatch(setLoading(true));
      const response = await axios.post(CatalogueAPI, body, { headers });
      const CatalogueDatafromAPI = response?.data?.Data;
      dispatch(setCatalogueData(CatalogueDatafromAPI));
      dispatch(setLoading(false));
    } catch (error) {
      console.error('Error in Catalogue data fetching:', error);
      toast.error('Error in fetching catalogue report data from API Server.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCatalogueData();
  }, []);

  return (
    <>
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
              <Filters onFilterChange={handleFilterChange} />
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
                  />                   
                  */}
                </Col>
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
                <Route index element={<Grid filters={filters} />} />
                <Route path="grid" element={<Grid filters={filters} />} />
                <Route path="list" element={<List />} />
              </Routes>
            </Suspense>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Product;
