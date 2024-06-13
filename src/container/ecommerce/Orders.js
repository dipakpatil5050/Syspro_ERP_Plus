import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Spin } from 'antd';
import UilDocumentInfo from '@iconscout/react-unicons/icons/uil-document-info';
import { TopToolBox } from './Style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, TableWrapper } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { invoicePrint, orderHistory } from '../../Actions/Catalogue/OrderActions';

function Orders() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Orders',
    },
  ];

  const orderData = useSelector((state) => state.cart.orderHistory);

  const loading = useSelector((state) => state.cart.isLoading);

  const dispatch = useDispatch();

  //   const { searchData, orders } = useSelector((state) => {
  //     return {
  //       searchData: state.headerSearchData,
  //       orders: state.orders.data,
  //     };
  //   });

  const [state, setState] = useState({
    item: orderData,
    selectedRowKeys: [],
    currentPage: 1,
    pageSize: 10,
  });

  //   const { notData, item, selectedRowKeys } = state;
  //   const filterKey = ['Shipped', 'Awaiting Shipment', 'Canceled'];

  //   useEffect(() => {
  //     if (orders) {
  //       setState({
  //         item: orders,
  //         selectedRowKeys,
  //       });
  //     }
  //   }, [orders, selectedRowKeys]);

  //   const handleSearch = (searchText) => {
  //     const data = searchData.filter((value) => value.title.toUpperCase().startsWith(searchText.toUpperCase()));
  //     setState({
  //       ...state,
  //       notData: data,
  //     });
  //   };

  //   const handleChangeForFilter = (e) => {
  //     dispatch(orderFilter('status', e.target.value));
  //   };

  const handlePageChange = (current, size) => {
    setState((prevState) => ({
      ...prevState,
      currentPage: current,
      pageSize: size,
    }));
  };

  useEffect(() => {
    dispatch(orderHistory(state.currentPage - 1, state.pageSize));
  }, [dispatch, state.currentPage, state.pageSize]);

  const handleInvoiceDownload = (Indent_Id) => {
    dispatch(invoicePrint(Indent_Id));
  };
  // table-actions

  const dataSource =
    orderData?.products?.map((item, key) => {
      const { Indent_Id, Item_Name, Saleprice1 } = item;
      return {
        key: key + 1,
        id: <span className="order-id">{Indent_Id}</span>,
        item: <span className="customer-name">{Item_Name}</span>,
        amount: <span className="ordered-amount">{Saleprice1}</span>,
        date: <span className="ordered-date">08-06-2024</span>,
        document: (
          <div className="" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              title="Invoice PDF"
              onClick={() => handleInvoiceDownload(Indent_Id)}
              className="btn-icon"
              type="info"
              to="#"
              shape="circle"
            >
              <UilDocumentInfo color="black" />
              {/* <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/121px-PDF_file_icon.svg.png"
                alt="pdf"
              /> */}
            </Button>
          </div>
        ),
      };
    }) || [];

  // filters: [
  //   {
  //     text: 'Date',
  //     value: 'Date',
  //   },
  //   {
  //     text: 'Day',
  //     value: 'Day',
  //   },
  // ],
  const columns = [
    {
      title: 'Order Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    // },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Document ',
      dataIndex: 'document',
      key: 'document',
    },
  ];

  const onSelectChange = (selectedRowKeys) => {
    setState((prevState) => ({
      ...prevState,
      selectedRowKeys,
    }));
  };

  const rowSelection = {
    onChange: onSelectChange,
  };

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Orders" routes={PageRoutes} />
      <Main>
        <Cards headless>
          <Row gutter={15}>
            <Col xs={24}>
              <TopToolBox>
                <Row gutter={15} className="justify-content-center">
                  {/* <Col lg={6} xs={24}>
                    <div className="table-search-box">
                      <AutoComplete onSearch={handleSearch} dataSource={notData} width="100%" patterns />
                    </div>
                  </Col> */}
                  {/* <Col xxl={14} lg={16} xs={24}>
                    <div className="table-toolbox-menu">
                      <span className="toolbox-menu-title"> Status:</span>
                      <Radio.Group onChange={handleChangeForFilter} defaultValue="">
                        <Radio.Button value="">All</Radio.Button>
                        {item.length &&
                          [...new Set(filterKey)].map((value) => {
                            return (
                              <Radio.Button key={value} value={value}>
                                {value}
                              </Radio.Button>
                            );
                          })}
                      </Radio.Group>
                    </div>
                  </Col> */}
                  {/* <Col xxl={4} xs={24}>
                    <div className="table-toolbox-actions">
                      <Button size="small" type="secondary" transparented>
                        Export
                      </Button>
                      <Button size="small" type="primary">
                        <UilPlus /> Add Seller
                      </Button>
                    </div>
                  </Col> */}
                </Row>
              </TopToolBox>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col md={24}>
              <TableWrapper className="table-order table-responsive">
                {loading && (
                  <div
                    className="table-loading"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      zIndex: 99999,
                    }}
                  >
                    <Spin size="large" />
                  </div>
                )}
                <Table
                  // rowSelection={rowSelection}
                  // bordered
                  dataSource={dataSource}
                  columns={columns}
                  pagination={{
                    showSizeChanger: true,
                    current: state.currentPage,
                    pageSize: state.pageSize,
                    total: orderData?.TotalCount,
                    loading: loading,
                    onChange: handlePageChange,
                    onShowSizeChange: handlePageChange,
                  }}
                  // expandable={{
                  //   expandedRowRender: () => <p style={{ margin: 0 }}>{record.Item_Name}</p>,
                  // }}
                />
              </TableWrapper>
            </Col>
          </Row>
        </Cards>
      </Main>
    </>
  );
}

export default Orders;
