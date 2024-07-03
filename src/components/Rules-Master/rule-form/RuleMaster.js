import React, { useState } from 'react';
import { Col, Row, Form, Input, Button, Select } from 'antd';
import toast from 'react-hot-toast';
import data from './data.json';
import { PageHeader } from '../../page-headers/page-headers';
import { Cards } from '../../cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import RuleCollection from '../../../container/Rule-collection-table/RuleCollection';

const { Option } = Select;

const PageRoutes = [
  {
    breadcrumbName: 'Configuration',
  },
  {
    breadcrumbName: 'Rule master',
  },
  {
    breadcrumbName: 'Rule Collection',
  },
];

function RuleMaster() {
  return (
    <>
      <PageHeader className="ninjadash-page-header-main ninjadash-pageheader-with-back" routes={PageRoutes} />
      <Main>
        <RuleCollection />
      </Main>
    </>
  );
}

export default RuleMaster;
