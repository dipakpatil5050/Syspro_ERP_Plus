import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Spin, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import { TopToolBox } from './Style';
import { Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { getAllRules, getRuleDataById } from '../../Actions/Configuration/RuleAction';

function RuleCollection() {
  const ruleList = useSelector((state) => state.config.ruleCollection);
  const loading = useSelector((state) => state.config.loading);
  const singleRuleData = useSelector((state) => state.config.singleRuleData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
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

  // const handleRuleEdit = (ruleId) => {
  //   dispatch(getRuleDataById(ruleId));

  // window.open(`createrule?mode=edit&ruleId=${ruleId}`);
  // };

  const handleRuleEdit = (ruleId) => {
    dispatch(getRuleDataById(ruleId)).then(() => {
      navigate(`/admin/configuration/rulemaster/createrule/edit/${ruleId}`);
    });
  };

  const handleRuleView = (ruleId) => {
    dispatch(getRuleDataById(ruleId)).then(() => {
      navigate(`/admin/configuration/rulemaster/createrule/view/${ruleId}`);
    });
  };

  console.log('Single Rule data from API : ', singleRuleData);

  useEffect(() => {
    dispatch(getAllRules(state.currentPage - 1, state.pageSize));
  }, [dispatch, state.currentPage, state.pageSize]);

  // table-actions

  const dataSource = useMemo(
    () =>
      ruleList?.Rulelist?.map((item, key) => {
        const { rule_id, rule_name, entrydatetime, remark } = item;
        return {
          key: key + 1,
          rule: <span className="customer-name">{rule_name}</span>,
          date: <span className="ordered-date">{entrydatetime}</span>,
          remark: <span className="ordered-amount">{remark}</span>,
          action: (
            <div className="table-actions">
              <Button
                className="btn-icon view"
                onChange={() => handleRuleView(rule_id)}
                type="primary"
                to="#"
                shape="circle"
              >
                <UilEye />
              </Button>
              <Button
                className="btn-icon Edit update"
                onClick={() => handleRuleEdit(rule_id)}
                type="info"
                to="#"
                shape="circle"
              >
                <UilEdit />
              </Button>
            </div>
          ),
        };
      }) || [],
    [ruleList],
  );

  const columns = useMemo(
    () => [
      {
        title: 'Rule Name',
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
    ],
    [],
  );

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
