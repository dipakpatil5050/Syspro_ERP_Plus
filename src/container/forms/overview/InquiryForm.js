import React from 'react';
import { Form, Input, Button } from 'antd';
import { VerticalFormStyleWrap } from './Style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../styled';

function InquiryForm() {
  return (
    <BasicFormWrapper>
      <VerticalFormStyleWrap>
        <Cards
          title="Inquiry Form
"
        >
          <Form name="ninjadash-vertical-form" layout="vertical">
            <Form.Item name="name" label="Name">
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item name="email" label="Email Address">
              <Input placeholder="Enter Email" />
            </Form.Item>
            <Form.Item name="mobile" label="Mobile">
              <Input placeholder="Enter Mobile Number" />
            </Form.Item>
            <Form.Item name="remark" label="Remark">
              <Input placeholder="write something" />
            </Form.Item>
            <div className="ninjadash-form-action">
              <Button className="btn-signin" type="primary" size="large">
                Submit
              </Button>
            </div>
          </Form>
        </Cards>
      </VerticalFormStyleWrap>
    </BasicFormWrapper>
  );
}

export { InquiryForm };
