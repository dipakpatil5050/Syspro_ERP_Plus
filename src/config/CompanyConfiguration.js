import React from 'react';
import PropTypes from 'prop-types';
import CompnayConfigurationForm from '../container/forms/overview/CompnayConfigurationForm';

function CompanyConfiguration({ handleCancel }) {
  return (
    <>
      <CompnayConfigurationForm handleCancel={handleCancel} />
    </>
  );
}

CompanyConfiguration.propTypes = {
  handleCancel: PropTypes.func,
};

export default CompanyConfiguration;
