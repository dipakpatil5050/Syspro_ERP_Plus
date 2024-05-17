import React, { useState } from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { VerticalFormStyleWrap } from './Style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../styled';
import { setLoading } from '../../../redux/reducers/authReducer';

function InquiryForm() {
  const dispatch = useDispatch();
  const userFormData = new FormData();
  const userMpinData = useSelector((state) => state.auth.userMpinData);
  const userData = useSelector((state) => state.auth.userData);

  const loading = useSelector((state) => state.auth.loading);

  const ServerBaseUrl = userMpinData?.Data?.ServerBaseUrl;
  const mPin = userMpinData?.Data?.mPin;
  const SlugUrl = userMpinData?.Data?.SlugUrl;

  const userheaderdata = userData?.Data;
  const Companyid = userheaderdata?.CompanyID;
  const YearMasterid = userheaderdata?.YearMasterID;
  const Premiseid = userheaderdata?.PremiseID;
  const Departmentid = userheaderdata?.DepartmentID;
  const Userid = userheaderdata?.UserID;
  const CompanyName = userheaderdata?.CompanyName;

  const selectedItems = useSelector((state) => state.auth.selectedItems);
  const itemIDs = selectedItems.join(',');
  console.log(itemIDs);

  const [formData, setFormData] = useState({
    firstname: '',
    email: '',
    telephone: '',
    remarks: '',
  });

  const handleChange = (event) => {
    // formData.append([event.target.name],event.target.value );
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleInquirySubmit = async (e) => {
    userFormData.append('CompanyName', CompanyName);
    userFormData.append('itemids', itemIDs);
    userFormData.append('firstname', formData.firstname);
    userFormData.append('email', formData.email);
    userFormData.append('telephone', formData.telephone);
    userFormData.append('remarks', formData.remarks);
    e.preventDefault();
    const EmailInquiryAPI = `${ServerBaseUrl}api/CommonAPI/productinquiry`;

    const headers = {
      'Content-Type': 'multipart/form-data',
      CompanyID: Companyid,
      YearMasterID: YearMasterid,
      PremiseID: Premiseid,
      DepartmentID: Departmentid,
      UserID: Userid,
      client: SlugUrl,
      'x-api-key': mPin,
    };
    try {
      dispatch(setLoading(true));
      const response = await axios.post(EmailInquiryAPI, userFormData, { headers });
      const EmailInquiryAPIResponse = response?.data?.Data;
      console.log(EmailInquiryAPIResponse);
      toast.success('Product inquiry Sent successfully....!');
      dispatch(setLoading(false));
      console.log(formData);
    } catch (error) {
      console.error('Error in data fetching:', error);
      toast.error('Error to fetch API.');
    } finally {
      dispatch(setLoading(false));
    }
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
              <Form.Item name="firstname" label="Name">
                <Input
                  placeholder="Name"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item name="email" label="Email Address">
                <Input
                  placeholder="Enter Email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item name="telephone" label="Phone Number">
                <Input
                  placeholder="Enter Phone Number"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item name="remarks" label="Remarks">
                <Input
                  placeholder="write something for description"
                  id="remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
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
