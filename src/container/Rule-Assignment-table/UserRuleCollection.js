import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Spin, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import { TopToolBox } from '../Rule-collection-table/Style';
import { Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import {
  getAllRules,
  getAllUsers,
  getListofUserRule,
  getRuleDataById,
  getRuleFilters,
  getRules,
  getUserDataById,
} from '../../Actions/Configuration/RuleAction';

function UserRuleCollection() {
  const allRules = useSelector((state) => state.config.allRules);

  const userRuleList = useSelector((state) => state.config.userRuleCollection);
  const loading = useSelector((state) => state.config.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    currentPage: 1,
    pageSize: 100,
  });

  // useEffect(() => {
  //   dispatch(getRuleFilters());
  //   dispatch(getRules());
  // }, []);

  const handlePageChange = (current, size) => {
    setState((prevState) => ({
      ...prevState,
      currentPage: current,
      pageSize: size,
    }));
  };

  const handleRuleEdit = (userId) => {
    dispatch(getUserDataById(userId)).then(() => {
      navigate(`/admin/configuration/ruleassign/assign-new-rule/edit/${userId}`);
    });
  };

  const handleRuleView = (userId) => {
    dispatch(getUserDataById(userId)).then(() => {
      navigate(`/admin/configuration/ruleassign/assign-new-rule/view/${userId}`);
    });
  };

  useEffect(() => {
    dispatch(getRuleFilters()); // fileRuleCollection
    dispatch(getRules());
    dispatch(getListofUserRule());
  }, [dispatch]);

  const ruleNameMap = useMemo(() => {
    const map = {};
    if (allRules) {
      allRules?.forEach((rule) => {
        map[rule.Rule_id] = rule.Rule_Name;
      });
    }
    return map;
  }, [allRules]);

  const dataSource = useMemo(
    () =>
      userRuleList?.map((item, key) => {
        const { UserName, Rule_Key, UserID } = item;

        const ruleKeyArray = Rule_Key.split(',');
        const ruleNames = ruleKeyArray.map((key1) => ruleNameMap[key1] || key1);

        return {
          key: key + 1,
          sr: <span className="customer-name">{key + 1}</span>,
          user: <span className="customer-name">{UserName}</span>,
          rule: (
            <ul className="rule-list">
              {ruleNames.map((ruleName) => (
                <li key={ruleName}>&#10687; {ruleName}</li>
              ))}
            </ul>
          ),

          // &#10687; for list Dot &#x2022
          // rule: <span className="customer-name">{Rule_Key}</span>,
          action: (
            <div className="table-actions">
              <Button
                className="btn-icon view"
                onClick={() => handleRuleView(UserID)}
                type="primary"
                to="#"
                shape="circle"
              >
                <UilEye />
              </Button>
              <Button
                className="btn-icon Edit update"
                onClick={() => handleRuleEdit(UserID)}
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
    [userRuleList],
  );

  const columns = useMemo(
    () => [
      {
        title: 'Sr. No.',
        dataIndex: 'sr',
        key: 'sr',
        width: '5%',
      },
      {
        title: 'User Name',
        dataIndex: 'user',
        key: 'user',
        width: '20%',
      },
      {
        title: 'Rule Name',
        dataIndex: 'rule',
        key: 'rule',
        width: '40%',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        width: '35%',
      },
    ],
    [],
  );

  return (
    <>
      <Main>
        <Cards titleless headless>
          <div className="ninjadash-form-action">
            <Link to="assign-new-rule">
              <Button title="Click here to Create new rule" className="btn-signin" type="primary">
                + Assign New Rule
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
                <Table
                  bordered
                  loading={loading}
                  dataSource={dataSource}
                  columns={columns}
                  // pagination={{
                  //   showSizeChanger: true,
                  //   current: state.currentPage,
                  //   pageSize: state.pageSize,
                  //   // total: ?.FilterTotalCount,
                  //   loading: loading,
                  //   onChange: handlePageChange,
                  //   onShowSizeChange: handlePageChange,
                  // }}
                  pagination={false}
                />
              </TableWrapper>
            </Col>
          </Row>
        </Cards>
      </Main>
    </>
  );
}

export default UserRuleCollection;
