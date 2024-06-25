import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Spin, Button } from 'antd';
import { Link } from 'react-router-dom';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import { TopToolBox } from './Style';
import './table.css';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, TableWrapper } from '../styled';
import data from '../forms/overview/data.json';
import { Cards } from '../../components/cards/frame/cards-frame';
import { orderHistory } from '../../Actions/Catalogue/OrderActions';

function TempRuleTable() {
  const orderData = useSelector((state) => state.cart.orderHistory);
  const [filters, setFilters] = useState(data.filters);
  const tempData = useSelector((state) => state.config.tempRuleData);
  const loading = useSelector((state) => state.config.loading);

  console.log('Temp Data in redux Store : ', tempData);

  const dispatch = useDispatch();

  const currentPage = 0;
  const pageSize = 10;

  // table-actions

  const getSelectedValueNames = (type, values) => {
    return values.map((valueId) => {
      const filter = filters[type].find((filter) => filter.Id === valueId);
      return filter ? filter.Name : valueId;
    });
  };

  const dataSource =
    tempData?.map((item, key) => {
      const { selectedType, selectedValues } = item;
      console.log('selectedType : ', selectedType);
      console.log('selectedValues : ', selectedValues);
      return {
        key: key + 1,
        id: <span className="order-id">{key + 1}</span>,
        ruleon: <span className="customer-name">{item.selectedType}</span>,
        description: (
          <span className="ordered-amount">
            {getSelectedValueNames(item.selectedType, item.selectedValues).join(', ').split()}
          </span>
        ),
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
      wdith: '5%',
    },
    {
      title: 'Rule on',
      dataIndex: 'ruleon',
      key: 'ruleon',
      width: '20%',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '70%',
      className: 'wrap-text',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '5%',
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
