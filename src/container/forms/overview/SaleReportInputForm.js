/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Form, DatePicker, Button, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import Select from 'react-select';
import moment from 'moment';
import './ledgerreport.css';

import { IoMdClose } from 'react-icons/io';
import { HorizontalFormStyleWrap } from './Style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { BasicFormWrapper, Main } from '../../styled';
import { setSaleReport } from '../../../redux/reducers/authReducer';

function SaleReportInputForm() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const saleReportData = useSelector((state) => state.auth.SaleReport);
  const userMpinData = useSelector((state) => state.auth.userMpinData);
  const userData = useSelector((state) => state.auth.userData);

  const ServerBaseUrl = userMpinData?.Data?.ServerBaseUrl;
  const mPin = userMpinData?.Data?.mPin;
  const SlugUrl = userMpinData?.Data?.SlugUrl;

  const userheaderdata = userData?.Data;
  const Companyid = userheaderdata?.CompanyID;
  const YearMasterid = userheaderdata?.YearMasterID;
  const Premiseid = userheaderdata?.PremiseID;
  const Departmentid = userheaderdata?.DepartmentID;
  const Userid = userheaderdata?.UserID;
  const AccessType = userheaderdata?.Access_Type;
  const AccessKey = userheaderdata?.Access_Key;

  const Companyname = userheaderdata?.CompanyName;
  const CompanyGSTcst = userheaderdata?.CompanyGSTCST;
  const Premisename = userheaderdata?.PremiseName;
  const CompanyContactno = userheaderdata?.CompanyContactNo;
  const Companyaddress1 = userheaderdata?.CompanyAddress1;
  const Companyaddress2 = userheaderdata?.CompanyAddress2;

  const currentDate = new Date();
  const defaultFromDate = moment(`${currentDate.getFullYear() - 1}-04-01`, 'YYYY-MM-DD');
  const defaultToDate = moment(`${currentDate.getFullYear()}-03-31`, 'YYYY-MM-DD');

  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    return `${formattedDay}-${formattedMonth}-${year}`;
  };

  // all variables
  const [fromDate, setFromDate] = useState(defaultFromDate);
  const [toDate, setToDate] = useState(defaultToDate);
  const [isCompany, setIsCompany] = useState(false);
  const [viewPdf, setViewPdf] = useState('');
  const selectedReportTypeOptionRef = useRef(null);
  const selectedPartyOptionRef = useRef(null);
  // const [defaultReportType, setDefaultReportType] = useState(null);
  // const [selectedReportType, setSelectedReportType] = useState(null);
  const [defaultValue, setDefaultValue] = useState(null);
  // const selectedAccountGroupOptionRef = useRef(null);

  const fetchSaleReport = async () => {
    const SaleReportAPI = `${ServerBaseUrl}api/ReportCommon/SaleReport`;
    const body = {
      CompanyID: Companyid,
      YearMasterID: YearMasterid,
      PremiseID: Premiseid,
      DepartmentID: Departmentid,
      UserID: Userid,
      SYSKey: 0,
      Access_Type: '',
      Access_Key: '',
      Access_From: '',
      CatalogueImageImportSyncDateTime: '',
    };

    const headers = {
      'Content-Type': 'application/json',
      CompanyID: Companyid,
      YearMasterID: YearMasterid,
      PremiseID: Premiseid,
      DepartmentID: Departmentid,
      UserID: Userid,
      client: SlugUrl,
      'x-api-key': mPin,
    };

    setLoading(true);
    try {
      const response = await axios.post(SaleReportAPI, body, { headers });
      const saleReportDatafromAPI = response?.data?.Data;
      dispatch(setSaleReport(saleReportDatafromAPI));
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error in Sale report data fetching:', error);
      toast.error('Error in fetching Sale report data from API Server.');
    } finally {
      setLoading(false);
    }
  };

  //    PDF API
  const fetchPDF = async () => {
    const formatedFromDate = formatDate(fromDate);
    const formatedToDate = formatDate(toDate);

    function convertBillDateFormat(dateString) {
      const parts = dateString.split('-');
      return parts[2] + parts[1] + parts[0];
    }
    const billFromDate = convertBillDateFormat(formatedFromDate);
    const billToDate = convertBillDateFormat(formatedToDate);

    const PDFAPI = `${ServerBaseUrl}api/ReportCommon/SaleReportPost`;

    let partyFilter = '';
    if (AccessType === 'Company') {
      partyFilter = selectedPartyOptionRef.current?.value
        ? ` And Bill_Dt Between '${billFromDate}' And '${billToDate}' AND Account_Id IN  (${selectedPartyOptionRef.current.value})`
        : '';
    } else {
      const accountId = AccessKey.match(/\((\d+)\)/)[1];
      partyFilter = `AND A.Account_ID IN (${accountId})`;
    }

    const body = {
      FromDate: formatedFromDate,
      ToDate: formatedToDate,
      AmountGtEq: 0,
      CustomFilter: partyFilter,
      ddlGroupByList: '01-Category',
      IntReportId: 0,
      ExcludeNoTransaction: 0,
      CompanyName: Companyname,
      CompanyGSTCST: CompanyGSTcst,
      PremiseName: Premisename,
      CompanyContactNo: CompanyContactno,
      CompanyAddress1: Companyaddress1,
      CompanyAddress2: Companyaddress2,
      type: 'pdf',
      ReportID: selectedReportTypeOptionRef.current.value,
      ReportName: selectedReportTypeOptionRef.current.label,
      SysKey: '0',
      DepartmentID: '1',
    };

    const headers = {
      'Content-Type': 'application/json',
      CompanyID: Companyid,
      YearMasterID: YearMasterid,
      PremiseID: Premiseid,
      DepartmentID: Departmentid,
      UserID: Userid,
      client: SlugUrl,
      'x-api-key': mPin,
    };
    try {
      const response = await axios.post(PDFAPI, body, { headers });
      const saleReportPDF = response?.data?.Data;
      const pdfurl = saleReportPDF?.ReportPath;
      setViewPdf(pdfurl);
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error in Sale report data fetching:', error);
      toast.error('Error in fetching Sale report data from API Server.');
      throw error;
    }
  };

  const handleSaleReportPDF = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await fetchPDF();
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error in Sale report data fetching:', error);
      toast.error('Error in fetching Sale report data from API Server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSaleReport();
    if (AccessType === 'Company') {
      setIsCompany(true);
    } else {
      setIsCompany(false);
    }
  }, []);

  const handleSelectReportTypeChange = (selectedOption) => {
    selectedReportTypeOptionRef.current = selectedOption;
  };

  const handleSelectPartyChange = (selectedOption) => {
    selectedPartyOptionRef.current = selectedOption;
  };

  // const handleSelectAccountGroupChange = (selectedOption) => {
  //   selectedAccountGroupOptionRef.current = selectedOption;
  // };

  const togglePdfViewer = () => {
    setViewPdf(!viewPdf);
  };

  useEffect(() => {
    if (saleReportData?.Table && saleReportData.Table.length > 0) {
      const defaultOption = {
        value: saleReportData.Table[0].Rep_Rpt,
        label: saleReportData.Table[0].Rep_Name,
      };
      // setSelectedReportType(defaultOption);
      // selectedReportTypeOptionRef.current = defaultOption.label;
      setDefaultValue(defaultOption);
      // console.log(selectedReportType);
    }
  }, [saleReportData]);

  return (
    <BasicFormWrapper>
      {loading && (
        <div>
          <div className="overlay" />
          <div className="loader-container">
            <Spin size="large" />
          </div>
        </div>
      )}
      <HorizontalFormStyleWrap className="sDash_input-form">
        {!viewPdf && (
          <Cards title="Sale Report" border>
            <Form name="input-form" layout="horizontal">
              <Row align="middle" gutter={40}>
                {/* From Date */}
                <Col md={4} xs={24}>
                  <label htmlFor="fromdate">From Date : </label>
                </Col>
                <Col md={8} xs={24}>
                  <Form.Item name="fromdate" rules={[{ required: true, message: 'Please select From Date' }]}>
                    <DatePicker
                      defaultValue={defaultFromDate}
                      // defaultValue={moment('01-04-2023', 'DD-MM-YYYY')}
                      onChange={(date) => {
                        setFromDate(date);
                      }}
                      id="from-date"
                      format="DD-MM-YYYY"
                      name="from-date"
                    />
                  </Form.Item>
                </Col>
                {/* To Date */}
                <Col md={4} xs={24}>
                  <label htmlFor="todate">To Date : </label>
                </Col>
                <Col md={8} xs={24}>
                  <Form.Item name="todate" rules={[{ required: true, message: 'Please select To Date' }]}>
                    <DatePicker
                      defaultValue={defaultToDate}
                      onChange={(date) => {
                        setToDate(date);
                      }}
                      id="to-date"
                      name="to-date"
                      format="DD-MM-YYYY"
                      minDate={fromDate}
                      maxDate={new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate())}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row align="middle" gutter={40}>
                <Col md={4} xs={24}>
                  <label htmlFor="report-type">Report Type :</label>
                </Col>
                <Col md={8} xs={24}>
                  <Form.Item name="report-type">
                    <Select
                      id="party"
                      name="party"
                      options={saleReportData?.Table.map((report) => ({
                        value: report.Rep_Rpt,
                        label: report.Rep_Name,
                      }))}
                      // defaultValue={selectedReportType}
                      defaultValue={defaultValue}
                      // value={selectedReportType}
                      placeholder="Select Sale Report Type"
                      onChange={handleSelectReportTypeChange}
                      allowClear
                      showSearch
                      isClearable
                    />
                  </Form.Item>
                </Col>

                {isCompany && (
                  <>
                    <Col md={4} xs={24}>
                      <label htmlFor="party">Party :</label>
                    </Col>
                    <Col md={8} xs={24}>
                      <Form.Item name="party">
                        <Select
                          id="party"
                          name="party"
                          options={saleReportData?.Table1.map((report) => ({
                            value: report.Account_ID,
                            label: report.Account_Name,
                          }))}
                          placeholder="Select Party"
                          onChange={handleSelectPartyChange}
                          allowClear
                          // isMulti
                          showSearch
                          isClearable
                        />
                      </Form.Item>
                    </Col>
                  </>
                )}
              </Row>

              {/* All extra input options */}
              {/* <div>
                <Row align="middle">
                  <Col md={6} xs={24}>
                    <label htmlFor="account-group">Book</label>
                  </Col>
                  <Col md={8} xs={24}>
                    <Form.Item name="account-group">
                      <Select
                        id="account-group"
                        name="account-group"
                        options={ledgerReportData?.Table2.map((report) => ({
                          value: report.AccountGroup_id,
                          label: report.AccountGroup_Name,
                        }))}
                        placeholder="Select Book"
                        // onChange={handleSelectAccountGroupChange}
                        allowClear
                        showSearch
                        isClearable
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row align="middle">
                  <Col md={6} xs={24}>
                    <label htmlFor="account-group">Brand</label>
                  </Col>
                  <Col md={8} xs={24}>
                    <Form.Item name="account-group">
                      <Select
                        id="account-group"
                        name="account-group"
                        options={ledgerReportData?.Table2.map((report) => ({
                          value: report.AccountGroup_id,
                          label: report.AccountGroup_Name,
                        }))}
                        placeholder="Select Brand"
                        // onChange={handleSelectAccountGroupChange}
                        allowClear
                        showSearch
                        isClearable
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row align="middle">
                  <Col md={6} xs={24}>
                    <label htmlFor="account-group">Category</label>
                  </Col>
                  <Col md={8} xs={24}>
                    <Form.Item name="account-group">
                      <Select
                        id="account-group"
                        name="account-group"
                        options={ledgerReportData?.Table2.map((report) => ({
                          value: report.AccountGroup_id,
                          label: report.AccountGroup_Name,
                        }))}
                        placeholder="Select Category"
                        // onChange={handleSelectAccountGroupChange}
                        allowClear
                        showSearch
                        isClearable
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row align="middle">
                  <Col md={6} xs={24}>
                    <label htmlFor="account-group">Group</label>
                  </Col>
                  <Col md={8} xs={24}>
                    <Form.Item name="account-group">
                      <Select
                        id="account-group"
                        name="account-group"
                        options={ledgerReportData?.Table2.map((report) => ({
                          value: report.AccountGroup_id,
                          label: report.AccountGroup_Name,
                        }))}
                        placeholder="Select Group"
                        // onChange={handleSelectAccountGroupChange}
                        allowClear
                        showSearch
                        isClearable
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row align="middle">
                  <Col md={6} xs={24}>
                    <label htmlFor="account-group">Sub-Group</label>
                  </Col>
                  <Col md={8} xs={24}>
                    <Form.Item name="account-group">
                      <Select
                        id="account-group"
                        name="account-group"
                        options={ledgerReportData?.Table2.map((report) => ({
                          value: report.AccountGroup_id,
                          label: report.AccountGroup_Name,
                        }))}
                        placeholder="Select Sub-Group"
                        // onChange={handleSelectAccountGroupChange}
                        allowClear
                        showSearch
                        isClearable
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row align="middle">
                  <Col md={6} xs={24}>
                    <label htmlFor="account-group">Design No.</label>
                  </Col>
                  <Col md={8} xs={24}>
                    <Form.Item name="account-group">
                      <Select
                        id="account-group"
                        name="account-group"
                        options={ledgerReportData?.Table2.map((report) => ({
                          value: report.AccountGroup_id,
                          label: report.AccountGroup_Name,
                        }))}
                        placeholder="Select Sub-Group"
                        // onChange={handleSelectAccountGroupChange}
                        allowClear
                        showSearch
                        isClearable
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row align="middle">
                  <Col md={6} xs={24}>
                    <label htmlFor="account-group">Product</label>
                  </Col>
                  <Col md={8} xs={24}>
                    <Form.Item name="account-group">
                      <Select
                        id="account-group"
                        name="account-group"
                        options={ledgerReportData?.Table2.map((report) => ({
                          value: report.AccountGroup_id,
                          label: report.AccountGroup_Name,
                        }))}
                        placeholder="Select Sub-Group"
                        // onChange={handleSelectAccountGroupChange}
                        allowClear
                        showSearch
                        isClearable
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row align="middle">
                  <Col md={6} xs={24}>
                    <label htmlFor="account-group">Broker</label>
                  </Col>
                  <Col md={8} xs={24}>
                    <Form.Item name="account-group">
                      <Select
                        id="account-group"
                        name="account-group"
                        options={ledgerReportData?.Table2.map((report) => ({
                          value: report.AccountGroup_id,
                          label: report.AccountGroup_Name,
                        }))}
                        placeholder="Select Sub-Group"
                        // onChange={handleSelectAccountGroupChange}
                        allowClear
                        showSearch
                        isClearable
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row align="middle">
                  <Col md={6} xs={24}>
                    <label htmlFor="account-group">Location</label>
                  </Col>
                  <Col md={8} xs={24}>
                    <Form.Item name="account-group">
                      <Select
                        id="account-group"
                        name="account-group"
                        options={ledgerReportData?.Table2.map((report) => ({
                          value: report.AccountGroup_id,
                          label: report.AccountGroup_Name,
                        }))}
                        placeholder="Select Sub-Group"
                        // onChange={handleSelectAccountGroupChange}
                        allowClear
                        showSearch
                        isClearable
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row align="middle">
                  <Col md={6} xs={24}>
                    <label htmlFor="account-group">City</label>
                  </Col>
                  <Col md={8} xs={24}>
                    <Form.Item name="account-group">
                      <Select
                        id="account-group"
                        name="account-group"
                        options={ledgerReportData?.Table2.map((report) => ({
                          value: report.AccountGroup_id,
                          label: report.AccountGroup_Name,
                        }))}
                        placeholder="Select Sub-Group"
                        // onChange={handleSelectAccountGroupChange}
                        allowClear
                        showSearch
                        isClearable
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row align="middle">
                  <Col md={6} xs={24}>
                    <label htmlFor="account-group">Transaction Filter</label>
                  </Col>
                  <Col md={8} xs={24}>
                    <Form.Item name="account-group">
                      <Select
                        id="account-group"
                        name="account-group"
                        options={ledgerReportData?.Table2.map((report) => ({
                          value: report.AccountGroup_id,
                          label: report.AccountGroup_Name,
                        }))}
                        placeholder="Select Sub-Group"
                        // onChange={handleSelectAccountGroupChange}
                        allowClear
                        showSearch
                        isClearable
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row align="middle">
                  <Col md={6} xs={24}>
                    <label htmlFor="account-group">Group by</label>
                  </Col>
                  <Col md={8} xs={24}>
                    <Form.Item name="account-group">
                      <Select
                        id="account-group"
                        name="account-group"
                        options={ledgerReportData?.Table2.map((report) => ({
                          value: report.AccountGroup_id,
                          label: report.AccountGroup_Name,
                        }))}
                        placeholder="Select Sub-Group"
                        // onChange={handleSelectAccountGroupChange}
                        allowClear
                        showSearch
                        isClearable
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div> */}

              <Row justify="end">
                <Col>
                  <Button type="primary" onClick={handleSaleReportPDF}>
                    Generate
                  </Button>
                </Col>
              </Row>
            </Form>
          </Cards>
        )}

        {viewPdf && (
          <Main
            style={{ backgroundColor: 'white', borderRadius: '5px', padding: '10px', border: '1px solid #d9d9d9' }}
            title="Sale Report PDF Document"
          >
            <Row justify="end">
              <Col>
                <Button type="dashed" onClick={togglePdfViewer}>
                  {viewPdf ? <IoMdClose size={22} /> : 'View PDF'}
                </Button>
              </Col>
            </Row>
            {viewPdf && (
              <div className="pdf-container">
                <iframe src={viewPdf} title="Sale Report" width="100%" height="700px">
                  view PDF
                </iframe>
              </div>
            )}
          </Main>
        )}
      </HorizontalFormStyleWrap>
    </BasicFormWrapper>
  );
}

export { SaleReportInputForm };
