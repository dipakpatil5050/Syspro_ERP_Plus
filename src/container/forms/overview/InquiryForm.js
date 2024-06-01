import React, { useState } from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { VerticalFormStyleWrap } from './Style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../styled';
import { sendInquiry } from '../../../Actions/Catalogue/CartAction';

function InquiryForm() {
  const [form] = Form.useForm();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [gst, setGst] = useState('');
  const [remark, setRemark] = useState('');

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const cartId = useSelector((state) => state.cart.cartId);
  const CartItem = useSelector((state) => state.cart.cartItems.CartItem);
  const orderPdf = useSelector((state) => state.cart.orderPdf);

  const handleInquirySubmit = () => {
    dispatch(sendInquiry(name, email, mobile, address, gst, remark, cartId, CartItem));

    setTimeout(() => {
      // window.location.reload();
      window.open(orderPdf, '_blank');
    }, 500);
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
            <Form form={form} onSubmit={handleInquirySubmit} name="inquiry-form" layout="vertical">
              <Form.Item name="name" label="Name" rules={[{ message: 'Please enter your name', required: true }]}>
                <Input
                  placeholder="Name"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { message: 'Please enter your email', required: true },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
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
                name="mobile"
                label="Mobile Number"
                rules={[{ message: 'Please enter your mobile number', required: true }]}
              >
                <Input
                  placeholder="Enter Mobile Number"
                  id="mobile"
                  name="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ message: 'Please enter your address', required: true }]}
              >
                <Input.TextArea
                  placeholder="Please enter your address"
                  rows={3}
                  name="address"
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
              <Form.Item name="remark" label="Remarks">
                <Input
                  placeholder="write something for description"
                  id="remark"
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
