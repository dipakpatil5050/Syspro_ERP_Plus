import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Spin, Button } from 'antd';
import { Link } from 'react-router-dom';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import { TopToolBox } from './Style';
import { Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { getAllRules } from '../../Actions/Configuration/RuleAction';

function RuleCollection() {
  const ruleList = useSelector((state) => state.config.ruleCollection);

  const loading = useSelector((state) => state.config.loading);

  const dispatch = useDispatch();

  const [state, setState] = useState({
    item: ruleList,
    currentPage: 1,
    pageSize: 10,
  });

  const handlePageChange = (current, size) => {
    setState((prevState) => ({
      ...prevState,
      currentPage: current,
      pageSize: size,
    }));
  };

  useEffect(() => {
    dispatch(getAllRules(state.currentPage - 1, state.pageSize));
  }, [dispatch, state.currentPage, state.pageSize]);

  console.log('Rule data', ruleList);
  // table-actions

  const dataSource =
    ruleList?.Rulelist?.map((item, key) => {
      const { rule_name, entrydatetime, remark } = item;
      return {
        key: key + 1,
        rule: <span className="customer-name">{rule_name}</span>,
        date: <span className="ordered-date">{entrydatetime}</span>,
        remark: <span className="ordered-amount">{remark}</span>,
        action: (
          <div className="table-actions">
            <Button className="btn-icon" type="primary" to="#" shape="circle">
              <UilEye />
            </Button>
            <Button className="btn-icon" type="info" to="#" shape="circle">
              <UilEdit />
            </Button>
          </div>
        ),
      };
    }) || [];

  const columns = [
    {
      title: 'Rule Name ',
      dataIndex: 'rule',
      key: 'rule',
    },
    {
      title: 'Created Date',
      dataIndex: 'date',
      key: 'date',
      width: '10%',
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
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
          <div className="ninjadash-form-action">
            <Link to="createrule">
              <Button title="Click here to Create new rule" className="btn-signin" type="primary">
                + Create New Rule
              </Button>
            </Link>
          </div>
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
                  pagination={{
                    showSizeChanger: true,
                    current: state.currentPage,
                    pageSize: state.pageSize,
                    total: ruleList?.FilterTotalCount,
                    loading: loading,
                    onChange: handlePageChange,
                    onShowSizeChange: handlePageChange,
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

export default RuleCollection;
