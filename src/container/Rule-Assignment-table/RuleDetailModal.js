import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Spin, Button } from 'antd';

import { TopToolBox } from '../Rule-collection-table/Style';
import { TableWrapper } from '../styled';

function RuleDetailModal() {
  const tempData = useSelector((state) => state.config.tempRuleData);
  const singleRuleData = useSelector((state) => state.config.singleRuleData);
  const loading = useSelector((state) => state.config.loading);
  const filters = useSelector((state) => state.config.ruleFilterData);

  const dispatch = useDispatch();

  const getSelectedValueNames = (type, values) => {
    return values?.map((valueId) => {
      const filter1 = filters[type]?.find((filter) => filter.Id === valueId);
      return filter1 ? filter1.Name : valueId;
    });
  };

  const dataSource =
    tempData?.map((item, key) => {
      const { selectedType, selectedValues } = item;
      const selectedNames = getSelectedValueNames(selectedType, selectedValues);

      return {
        key: key + 1,
        id: <span className="order-id">{key + 1}</span>,
        ruleon: <span className="customer-name">{selectedType}</span>,
        description: (
          <ul style={{ textAlign: 'end' }} className="ordered-amount-list">
            {selectedNames?.length > 0 ? (
              selectedNames?.map((name, index) => <li key={index}>{name},</li>)
            ) : (
              <li key="no-items">No items selected</li>
            )}
          </ul>
        ),
      };
    }) || [];

  const columns = [
    {
      title: 'Row Id',
      dataIndex: 'id',
      key: 'id',
      //   wdith: '5%',
    },
    {
      title: 'Rule on',
      dataIndex: 'ruleon',
      key: 'ruleon',
      //   width: '20%',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      style: { textAlign: 'center', color: 'red' },
      //   width: '75%',
    },
  ];

  return (
    <>
      {/* <Row gutter={15}>
        <Col xs={24}>
          <TopToolBox>
            <Row gutter={15} className="justify-content-center" />
            {loading ? (
              'Rule Name : Loading ..'
            ) : (
              <>
                <strong> Rule Name :</strong> {singleRuleData?.Table[0]?.Rule_Name}
              </>
            )}
          </TopToolBox>
        </Col>
      </Row> */}
      <Row gutter={15}>
        <Col md={24}>
          <TableWrapper className="table-order table-responsive">
            <Table
              loading={loading}
              bordered
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

export default RuleDetailModal;
