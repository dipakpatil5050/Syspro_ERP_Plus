import React from 'react';
import { Row, Col, Table, Spin, Button, Modal } from 'antd';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import PropTypes from 'prop-types';
import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import { TopToolBox } from '../Rule-collection-table/Style';
import { TableWrapper } from '../styled';

function DraftRuleAssignTable({ draftRules }) {
  const handleView = () => {};

  const dataSource =
    draftRules?.map((item, key) => {
      return {
        key: key + 1,
        id: <span className="order-id">{key + 1}</span>,
        rule: <span className="customer-name">{item.Rule_Name}</span>,
        remark: <span className="ordered-amount-list">{item.Remark}</span>,
        action: (
          <div className="table-actions">
            <Button className="btn-icon edit" type="info" shape="circle" onClick={() => handleView(key)}>
              {/* <UilEdit /> */}

              <UilEye />
            </Button>
            {/* <Button className="btn-icon delete" type="danger" shape="circle" onClick={() => handleDelete(key)}>
              <UilTrashAlt />
            </Button> */}
          </div>
        ),
      };
    }) || [];

  const columns = [
    {
      title: 'Sr. No.',
      dataIndex: 'id',
      key: 'id',
      wdith: '5%',
    },
    {
      title: 'Rule Name',
      dataIndex: 'rule',
      key: 'rule',
      width: '20%',
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
      width: '70%',
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
            <Table
              bordered
              title={() => <h1>Rules Review : </h1>}
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              rowKey={(record) => record.key}
            />
          </TableWrapper>
        </Col>
      </Row>
    </>
  );
}

DraftRuleAssignTable.propTypes = {
  draftRules: PropTypes.arrayOf(
    PropTypes.shape({
      Rule_id: PropTypes.number.isRequired,
      Rule_Name: PropTypes.string.isRequired,
      Remark: PropTypes.string,
    }),
  ).isRequired,
};

export default DraftRuleAssignTable;
