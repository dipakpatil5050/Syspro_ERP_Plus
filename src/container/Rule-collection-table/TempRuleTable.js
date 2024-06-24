import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Spin, Button } from 'antd';
import { Link } from 'react-router-dom';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import { TopToolBox } from './Style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { orderHistory } from '../../Actions/Catalogue/OrderActions';

function TempRuleTable() {
  const orderData = useSelector((state) => state.cart.orderHistory);
  const loading = useSelector((state) => state.config.loading);

  const dispatch = useDispatch();

  const currentPage = 0;
  const pageSize = 10;
  useEffect(() => {
    dispatch(orderHistory(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  // table-actions

  const dataSource =
    orderData?.products?.map((item, key) => {
      const { Indent_Id, Account_Name, Indent_Dt, Amount, Qty } = item;
      return {
        key: key + 1,
        id: <span className="order-id">{Indent_Id}</span>,
        rule: <span className="customer-name">{Account_Name}</span>,
        quantity: <span className="ordered-amount">{Qty}</span>,
        amount: <span className="ordered-amount">{Amount}</span>,
        date: <span className="ordered-date">{Indent_Dt}</span>,
        action: (
          <div className="table-actions">
            <Button className="btn-icon" type="info" to="#" shape="circle">
              <UilEdit />
            </Button>
            <Button className="btn-icon" type="danger" to="#" shape="circle">
              <UilTrashAlt />
            </Button>
          </div>
        ),
      };
    }) || [];

  const columns = [
    {
      title: 'Row Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Rule Type',
      dataIndex: 'ruletype',
      key: 'ruletype',
    },
    {
      title: 'Rule Value',
      dataIndex: 'rulevalue',
      key: 'rulevalue',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  return (
    <>
      <Main>
        <Cards titleless headless>
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
                <Table bordered dataSource={dataSource} columns={columns} pagination={false} />
              </TableWrapper>
            </Col>
          </Row>
        </Cards>
      </Main>
    </>
  );
}

export default TempRuleTable;
