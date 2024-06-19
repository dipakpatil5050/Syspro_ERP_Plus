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

function RuleCollection() {
  const orderData = useSelector((state) => state.cart.orderHistory);
  const loading = useSelector((state) => state.cart.isLoading);
  const cartId = useSelector((state) => state.cart.cartId);

  const dispatch = useDispatch();

  const currentPage = 0;
  const pageSize = 10;
  useEffect(() => {
    dispatch(orderHistory(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

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
            <Button title="Invoice PDF" className="btn-icon" type="info" to="#" shape="circle">
              Delete
            </Button>
          </div>
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
      <Main>
        <Cards title="Rule Collection">
          <Row gutter={15}>
            <Col xs={24}>
              <TopToolBox>
                <Row gutter={15} className="justify-content-center" />
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
                <Table bordered dataSource={dataSource} columns={columns} />
              </TableWrapper>
            </Col>
          </Row>
        </Cards>
      </Main>
    </>
  );
}

export default RuleCollection;
