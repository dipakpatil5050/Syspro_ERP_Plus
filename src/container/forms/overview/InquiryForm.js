import React, { useState } from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { VerticalFormStyleWrap } from './Style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../styled';
import { sendInquiry } from '../../../Actions/Catalogue/CartAction';

function InquiryForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [gst, setGst] = useState('');
  const [remark, setRemark] = useState('');

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const cartId = useSelector((state) => state.cart.cartId);

  const handleInquirySubmit = () => {
    dispatch(sendInquiry(cartId));
  };

  return (
    <>
      {loading && (
        <>
          <Spin
            size="large"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              zIndex: 99999,
              padding: '10px',
            }}
          />
        </>
      )}
      <BasicFormWrapper>
        <VerticalFormStyleWrap>
          <Cards title="Inquiry Form">
            <Form onSubmit={handleInquirySubmit} name="ninjadash-vertical-form" layout="vertical">
              <Form.Item name="firstname" label="Name" rules={[{ message: 'Please enter your name', required: true }]}>
                <Input
                  placeholder="Name"
                  id="firstname"
                  name="firstname"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email Address"
                rules={[{ message: 'Please enter your email', required: true }]}
              >
                <Input
                  placeholder="Enter Email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="telephone"
                label="Mobile Number"
                rules={[{ message: 'Please enter your mobile number', required: true }]}
              >
                <Input
                  placeholder="Enter Mobile Number"
                  id="telephone"
                  name="telephone"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ message: 'Please enter your address', required: true }]}
              >
                <textarea
                  placeholder="Please Enter your address "
                  name="txtDescEd"
                  cols="63"
                  rows="3"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="gst" label="GST Number">
                <Input
                  placeholder="Enter GST Number"
                  id="gst"
                  name="gst"
                  value={gst}
                  onChange={(e) => setGst(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="remarks" label="Remarks">
                <Input
                  placeholder="write something for description"
                  id="remarks"
                  name="remarks"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                />
              </Form.Item>
              <div className="ninjadash-form-action">
                <Button
                  loading={loading}
                  htmlType="submit"
                  className="btn-signin"
                  type="primary"
                  onClick={handleInquirySubmit}
                  size="large"
                >
                  {loading ? 'Inquiry Sending...' : 'Submit'}
                </Button>
              </div>
            </Form>
          </Cards>
        </VerticalFormStyleWrap>
      </BasicFormWrapper>
    </>
  );
}

export { InquiryForm };
