import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Spin, Button, Modal } from 'antd';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import { TopToolBox } from './Style';
import { TableWrapper } from '../styled';
import { deleteTempRuleData } from '../../redux/reducers/configSlice';
import RuleModalForm from '../forms/overview/RuleModalForm';

function TempRuleTable({ mode }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editRule, setEditRule] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const tempData = useSelector((state) => state.config.tempRuleData);
  const loading = useSelector((state) => state.config.loading);
  const filters = useSelector((state) => state.config.ruleFilterData);

  const dispatch = useDispatch();

  const handleEdit = (index) => {
    setEditRule(tempData[index]);
    setEditIndex(index);
    setIsModalVisible(true);
  };

  const handleDelete = (index) => {
    dispatch(deleteTempRuleData(index));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditRule(null);
    setEditIndex(null);
  };

  // table-actions

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
          <ul className="ordered-amount-list">
            {selectedNames?.length > 0 ? (
              selectedNames?.map((name, index) => <li key={index}>{name},</li>)
            ) : (
              <li key="no-items">No items selected</li>
            )}
          </ul>
        ),
        action: (
          <div className="table-actions">
            <Button
              disabled={mode === 'view'}
              className="btn-icon edit"
              type="info"
              shape="circle"
              onClick={() => handleEdit(key)}
            >
              <UilEdit />
            </Button>
            <Button
              disabled={mode === 'view'}
              className="btn-icon delete"
              type="danger"
              shape="circle"
              onClick={() => handleDelete(key)}
            >
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
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '5%',
    },
  ];

  return (
    // <Cards titleless headless>
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
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              rowKey={(record) => record.key}
            />
          </TableWrapper>
          <Modal
            title={editRule ? 'Update Rule' : 'Add Rule'}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            destroyOnClose
            loading={loading}
          >
            <RuleModalForm handleCancel={handleCancel} editRule={editRule} editIndex={editIndex} />
          </Modal>
        </Col>
      </Row>
      {/* </Cards> */}
    </>
  );
}

TempRuleTable.propTypes = {
  mode: PropTypes.string,
};

export default TempRuleTable;
