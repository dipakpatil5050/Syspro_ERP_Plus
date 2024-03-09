/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Row, Col, Form, Input, DatePicker, Select } from 'antd';

import { HorizontalFormStyleWrap } from './Style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../styled';

function InputForm() {
  return (
    <BasicFormWrapper>
      <HorizontalFormStyleWrap className="sDash_input-form">
        <Cards title="Ledger Report Form">
          <Form name="input-form" layout="horizontal">
            <Row align="middle">
              <Col md={6} xs={24}>
                <label htmlFor="fromdate">From Date</label>
              </Col>
              <Col md={18} xs={24}>
                <Form.Item name="fromdate">
                  <DatePicker />
                </Form.Item>
              </Col>
            </Row>
            <Row align="middle">
              <Col md={6} xs={24}>
                <label htmlFor="todate">To Date</label>
              </Col>
              <Col md={18} xs={24}>
                <Form.Item name="todate">
                  <DatePicker />
                </Form.Item>
              </Col>
            </Row>
            <Row align="middle">
              <Col md={6} xs={24}>
                <label htmlFor="report-type">Report Type</label>
              </Col>
              <Col md={18} xs={24}>
                <Form.Item name="report-type">
                  <Select placeholder="Select Report type" />
                </Form.Item>
              </Col>
            </Row>
            <Row align="middle">
              <Col md={6} xs={24}>
                <label htmlFor="party">Party</label>
              </Col>
              <Col md={18} xs={24}>
                <Form.Item name="party">
                  <Input placeholder="Select your party" />
                </Form.Item>
              </Col>
            </Row>
            <Row align="middle">
              <Col md={6} xs={24}>
                <label htmlFor="account-group">Account Group</label>
              </Col>
              <Col md={18} xs={24}>
                <Form.Item name="account-group">
                  <Input placeholder="Select your account group " />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Cards>
      </HorizontalFormStyleWrap>
    </BasicFormWrapper>
  );
}

export { InputForm };
