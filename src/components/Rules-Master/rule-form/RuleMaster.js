import React from 'react';
import { PageHeader } from '../../page-headers/page-headers';
import { Main } from '../../styled';
import RuleCollection from '../../../container/Rule-collection-table/RuleCollection';

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
