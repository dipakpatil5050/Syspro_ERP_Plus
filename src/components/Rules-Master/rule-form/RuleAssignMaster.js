import React from 'react';
import { PageHeader } from '../../page-headers/page-headers';
import { Main } from '../../styled';
import UserRuleCollection from '../../../container/Rule-Assignment-table/UserRuleCollection';

const PageRoutes = [
  {
    breadcrumbName: 'Configuration',
  },
  {
    breadcrumbName: 'Rule Assignment',
  },
  {
    breadcrumbName: 'User Rule Collection',
  },
];

function RuleAssignMaster() {
  return (
    <>
      <PageHeader
        className="ninjadash-page-header-main ninjadash-pageheader-with-back"
        routes={PageRoutes}
        title={
          <>
            <h4>User Rule Collection</h4>
          </>
        }
      />
      <Main>
        <UserRuleCollection />
      </Main>
    </>
  );
}

export default RuleAssignMaster;
