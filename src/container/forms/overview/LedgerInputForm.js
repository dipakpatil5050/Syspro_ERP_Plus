/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Form, DatePicker, Button, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import Select from 'react-select';
import moment from 'moment';
import './ledgerreport.css';
import { Link } from 'react-router-dom';
import { HorizontalFormStyleWrap } from './Style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { BasicFormWrapper, Main } from '../../styled';
import { setLedgerReport } from '../../../redux/reducers/authReducer';

function LedgerInputForm() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const ledgerReportData = useSelector((state) => state.auth.LedgerReport);
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
  // const [partyFiltervar, setPartyFiltervar] = useState(null);
  // const [isSupplier, setIsSupplier] = useState(false);
  const [viewPdf, setViewPdf] = useState('');
  const selectedReportTypeOptionRef = useRef(null);
  const selectedPartyOptionRef = useRef(null);
  // const [defaultReportType, setDefaultReportType] = useState(null);
  // const [selectedReportType, setSelectedReportType] = useState(null);
  const [defaultValue, setDefaultValue] = useState(null);
  // const selectedAccountGroupOptionRef = useRef(null);

  const fetchLedgerReport = async () => {
    const LedgerReportAPI = `${ServerBaseUrl}api/CommonFas/LedgerReport`;
    const body = {
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
      const response = await axios.post(LedgerReportAPI, body, { headers });
      const ledgerReportDatafromAPI = response?.data?.Data;
      dispatch(setLedgerReport(ledgerReportDatafromAPI));
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error in Ledger report data fetching:', error);
      toast.error('Error in fetching Ledger report data from API Server.');
    } finally {
      setLoading(false);
    }
  };
  //    PDF API
  const fetchPDF = async () => {
    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate);

    const PDFAPI = `${ServerBaseUrl}api/CommonFas/LedgerReportPost`;

    let partyFilter = '';
    if (AccessType === 'Company') {
      partyFilter = selectedPartyOptionRef.current?.value
        ? `AND A.Account_ID IN (${selectedPartyOptionRef.current.value})`
        : '';
    } else {
      const accountId = AccessKey.match(/\((\d+)\)/)[1];
      partyFilter = `AND A.Account_ID IN (${accountId})`;
    }

    const body = {
      FromDate: formattedFromDate,
      ToDate: formattedToDate,
      AmountGtEq: 0,
      IntReportId: 0,
      ExcludeNoTransaction: 1,
      CompanyName: Companyname,
      CompanyGSTCST: CompanyGSTcst,
      PremiseName: Premisename,
      CompanyContactNo: CompanyContactno,
      CompanyAddress1: Companyaddress1,
      CompanyAddress2: Companyaddress2,
      type: 'pdf',
      CustomFilter: partyFilter,
      AccountGroupList: '',
      ReportID: selectedReportTypeOptionRef.current.value,
      ReportName: selectedReportTypeOptionRef.current.label,
      SysKey: '1',
      CompanyID: Companyid,
      YearMasterID: YearMasterid,
      PremiseID: Premiseid,
      DepartmentID: Departmentid,
      UserID: Userid,
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
      const ledgerReportPDF = response?.data?.Data;
      const pdfurl = ledgerReportPDF?.ReportPath;
      window.open(pdfurl, '_blank');
      setViewPdf(pdfurl);
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error in Ledger report data fetching:', error);
      // toast.error('Error in fetching Ledger report data from API Server.');
      throw error;
    }
  };

  const handleLedgerReportPDF = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await fetchPDF();
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error in Ledger report data fetching:', error);
      toast.error('Error in fetching Ledger report data from API Server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLedgerReport();
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

  // const reporttypeoptions = ledgerReportData?.Table.map((report) => ({
  //   value: report.Rep_Rpt,
  //   label: report.Rep_Name,
  // }));

  // const reporttypedefaultValue = {
  //   value: ledgerReportData?.Table[0].Rep_Rpt,
  //   label: ledgerReportData?.Table[0].Rep_Name,
  // };
  useEffect(() => {
    if (ledgerReportData?.Table && ledgerReportData.Table.length > 0) {
      const defaultOption = {
        value: ledgerReportData.Table[0].Rep_Rpt,
        label: ledgerReportData.Table[0].Rep_Name,
      };
      // setSelectedReportType(defaultOption);
      // selectedReportTypeOptionRef.current = defaultOption.label;
      setDefaultValue(defaultOption);
      // console.log(selectedReportType);
    }
  }, [ledgerReportData]);

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
        <Cards border title="Ledger Report">
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
                    // defaultValue={moment('31-03-2024', 'DD-MM-YYYY')}
                    onChange={(date) => {
                      setToDate(date);
                    }}
                    id="to-date"
                    name="to-date"
                    format="DD-MM-YYYY"
                    minDate={fromDate}
                    maxDate={new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate())}
                    // style={{ width: '70%' }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row align="middle" gutter={40}>
              <Col md={4} xs={24}>
                <label htmlFor="report-type">Report Type :</label>
              </Col>
              <Col md={8} xs={24}>
                {/* {console.log('defaultReportType in report type form field: ', defaultReportType)} */}
                <Form.Item name="report-type">
                  <Select
                    id="party"
                    name="party"
                    options={ledgerReportData?.Table.map((report) => ({
                      value: report.Rep_Rpt,
                      label: report.Rep_Name,
                    }))}
                    // defaultValue={selectedReportType}
                    defaultValue={defaultValue}
                    // value={selectedReportType}
                    placeholder="Select Ledger Report Type"
                    onChange={handleSelectReportTypeChange}
                    // allowClear
                    showSearch
                    // isClearable
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
                        options={ledgerReportData?.Table3.map((report) => ({
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
            {/* <Row align="middle">
                
              </Row> */}
            {/* <Row align="middle" gutter={30}>
                <Col md={4} xs={24}>
                  <label htmlFor="account-group">Account Group :</label>
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
                      placeholder="Select Account Group"
                      onChange={handleSelectAccountGroupChange}
                      allowClear
                      showSearch
                      isClearable
                    />
                  </Form.Item>
                </Col>
              </Row> */}
            <Row justify="end">
              <Col>
                <Button type="primary" onClick={handleLedgerReportPDF}>
                  Apply
                </Button>
              </Col>
            </Row>
          </Form>
        </Cards>
      </HorizontalFormStyleWrap>
    </BasicFormWrapper>
  );
}

export { LedgerInputForm };
