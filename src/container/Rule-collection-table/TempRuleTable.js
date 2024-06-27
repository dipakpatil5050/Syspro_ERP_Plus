import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Spin, Button, Modal } from 'antd';
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
import { deleteTempRuleData } from '../../redux/reducers/configSlice';
import RuleModalForm from '../forms/overview/RuleModalForm';

function TempRuleTable() {
  const [filters, setFilters] = useState(data.filters);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editRule, setEditRule] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const tempData = useSelector((state) => state.config.tempRuleData);
  const loading = useSelector((state) => state.config.loading);

  console.log('Temp Data in redux Store : ', tempData);

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
    return values.map((valueId) => {
      const filter = filters[type].find((filter) => filter.Id === valueId);
      return filter ? filter.Name : valueId;
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
            {selectedNames.length > 0 ? (
              selectedNames.map((name, index) => <li key={index}>{name},</li>)
            ) : (
              <li key="no-items">No items selected</li>
            )}
          </ul>
        ),
        action: (
          <div className="table-actions">
            <Button className="btn-icon edit" type="info" shape="circle" onClick={() => handleEdit(key)}>
              <UilEdit />
            </Button>
            <Button className="btn-icon delete" type="danger" shape="circle" onClick={() => handleDelete(key)}>
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
              pagination={false}
              loading={loading}
              rowKey={(record) => record.key}
            />
          </TableWrapper>
          <Modal
            title={editRule ? 'Update Rule' : 'Add Rule'}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            destroyOnClose
          >
            <RuleModalForm handleCancel={handleCancel} editRule={editRule} editIndex={editIndex} />
          </Modal>
        </Col>
      </Row>
      {/* </Cards> */}
    </>
  );
}

export default TempRuleTable;
