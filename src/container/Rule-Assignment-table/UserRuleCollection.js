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
  getListofUserRule,
  getRuleDataById,
  getRuleFilters,
} from '../../Actions/Configuration/RuleAction';

function UserRuleCollection() {
  const ruleList = useSelector((state) => state.config.ruleCollection);

  const userRuleList = useSelector((state) => state.config.userRuleCollection);
  const loading = useSelector((state) => state.config.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    currentPage: 1,
    pageSize: 10,
  });

  useEffect(() => {
    dispatch(getRuleFilters());
  }, []);

  const handlePageChange = (current, size) => {
    setState((prevState) => ({
      ...prevState,
      currentPage: current,
      pageSize: size,
    }));
  };

  const handleRuleEdit = (ruleId) => {
    // dispatch(getRuleDataById(ruleId)).then(() => {
    //   navigate(`/admin/configuration/rulemaster/createrule/edit/${ruleId}`);
    // });
  };

  const handleRuleView = (ruleId) => {
    // dispatch(getRuleDataById(ruleId)).then(() => {
    //   navigate(`/admin/configuration/rulemaster/createrule/view/${ruleId}`);
    // });
  };

  useEffect(() => {
    dispatch(getListofUserRule());
  }, [dispatch]);

  const dataSource = useMemo(
    () =>
      userRuleList?.map((item, key) => {
        const { UserName, Rule_Key } = item;

        // , UserID
        return {
          key: key + 1,
          user: <span className="customer-name">{UserName}</span>,
          rule: <span className="customer-name">{Rule_Key}</span>,
          //   remark: <span className="ordered-amount">{remark}</span>,
          action: (
            <div className="table-actions">
              {/* <Button
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
              </Button> */}
            </div>
          ),
        };
      }) || [],
    [userRuleList],
  );

  const columns = useMemo(
    () => [
      {
        title: 'User Name',
        dataIndex: 'user',
        key: 'user',
      },
      {
        title: 'Rule Name',
        dataIndex: 'rule',
        key: 'rule',
      },
      //   {
      //     title: 'Remark',
      //     dataIndex: 'remark',
      //     key: 'remark',
      //   },
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

export default UserRuleCollection;
