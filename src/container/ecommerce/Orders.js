import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table } from 'antd';
import { TopToolBox } from './Style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';

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

  const cartData = useSelector((state) => state.cart.cartItems.CartItem);
  const dispatch = useDispatch();
  //   const { searchData, orders } = useSelector((state) => {
  //     return {
  //       searchData: state.headerSearchData,
  //       orders: state.orders.data,
  //     };
  //   });

  const [state, setState] = useState({
    item: cartData,
    selectedRowKeys: [],
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

  const dataSource = [];
  if (cartData?.length) {
    cartData.map((item, key) => {
      const { Id, Item_Id, Total, Item_Name } = item;

      return dataSource.push({
        key: key + 1,
        id: <span className="order-id">{Id}</span>,
        customer: <span className="customer-name">{Item_Name}</span>,
        status: (
          <span
          // className={`status ${
          //   status === 'Shipped' ? 'Success' : status === 'Awaiting Shipment' ? 'warning' : 'error'
          // }`}
          >
            {Item_Id}
          </span>
        ),
        amount: <span className="ordered-amount">{Total}</span>,
        date: <span className="ordered-date">08-06-2024</span>,
      });
    });
  }

  const columns = [
    {
      title: 'Order Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  const onSelectChange = (selectedRowKey) => {
    setState({ ...state, selectedRowKeys: selectedRowKey });
  };

  const rowSelection = {
    onChange: (selectRowKeys) => {
      onSelectChange(selectRowKeys);
    },
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
                <Table
                  rowSelection={rowSelection}
                  dataSource={dataSource}
                  columns={columns}
                  pagination={{ pageSize: 10, showSizeChanger: true, total: cartData?.length }}
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
