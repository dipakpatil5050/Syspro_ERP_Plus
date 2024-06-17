import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Spin } from 'antd';
import UilDocumentInfo from '@iconscout/react-unicons/icons/uil-document-info';
import { Link } from 'react-router-dom';
import { TopToolBox } from './Style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, TableWrapper } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { invoicePrint, orderHistory } from '../../Actions/Catalogue/OrderActions';
import { getCartItem } from '../../Actions/Catalogue/CartAction';

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
  const cartId = useSelector((state) => state.cart.cartId);

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

  // const expandedRowRender = () => {
  //   const expandableColumns = [
  //     { title: 'Date', dataIndex: 'date', key: 'date' },
  //     { title: 'Name', dataIndex: 'name', key: 'name' },
  //     {
  //       title: 'Status',
  //       dataIndex: 'status',
  //       key: 'state',
  //     },
  //     { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  //   ];

  //   const data = [];
  //   {
  //     data.push({
  //       key: 5,
  //       date: '2014-12-24 23:12:00',
  //       name: 'This is production name',
  //       upgradeNum: 'Upgraded: 56',
  //     });
  //   }
  //   return <Table columns={expandableColumns} dataSource={data} pagination={false} />;
  // };

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

  useEffect(() => {
    dispatch(getCartItem(cartId));
  }, [dispatch, cartId]);

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
      const { Indent_Id, Account_Name, Indent_Dt, Amount, Qty, Remark, cartItems } = item;
      return {
        key: key + 1,
        id: <span className="order-id">{Indent_Id}</span>,
        party: <span className="customer-name">{Account_Name}</span>,
        quantity: <span className="ordered-amount">{Qty}</span>,
        amount: <span className="ordered-amount">{Amount}</span>,
        date: <span className="ordered-date">{Indent_Dt}</span>,
        remark: <span className="ordered-date">{Remark}</span>,
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
              <UilDocumentInfo color="black" size="large" />
            </Button>
          </div>
        ),
        items: (
          <table style={{ border: '1px solid black', marginTop: '10px', padding: '20px' }}>
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th>Sr.No.</th>
                <th>Item Id</th>
                <th>Item Name</th>
                <th>Document Id</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
                <th>File Path</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((Data, index) => (
                <tr key={index} style={{ textAlign: 'center' }}>
                  <td>{index + 1}</td>
                  <td>{Data.Item_Id}</td>
                  <td>{Data.Item_Name}</td>
                  <td>{Data.Document_ID}</td>
                  <td>{Data.Qty}</td>
                  <td>{Data.Saleprice1}</td>
                  <td>{Data.Total}</td>
                  <td style={{ textAlign: 'end' }}>
                    <Link to={Data.Filepath} target="_blank">
                      Item Image
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ),
      };
    }) || [];

  const columns = [
    {
      title: 'Order Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Party Name ',
      dataIndex: 'party',
      key: 'party',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
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
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: 'Document ',
      dataIndex: 'document',
      key: 'document',
    },
  ];

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
                  bordered
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
                  expandable={{
                    expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.items}</p>,
                  }}
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
