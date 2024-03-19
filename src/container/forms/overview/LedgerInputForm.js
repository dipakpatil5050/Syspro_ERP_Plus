/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, DatePicker, Select, Button, Spin, Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import { HorizontalFormStyleWrap } from './Style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../styled';
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

  const Companyname = userheaderdata?.CompanyName;
  const CompanyGSTcst = userheaderdata?.CompanyGSTCST;
  const Premisename = userheaderdata?.PremiseName;
  const CompanyContactno = userheaderdata?.CompanyContactNo;
  const Companyaddress1 = userheaderdata?.CompanyAddress1;
  const Companyaddress2 = userheaderdata?.CompanyAddress2;

  const currentDate = new Date();
  const defaultFromDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
  const defaultToDate = new Date();

  //   const formatDate = (date) => {
  //     const day = date.getDate();
  //     const month = date.getMonth() + 1;
  //     const year = date.getFullYear();
  //     return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
  //   };

  const [fromDate, setFromDate] = useState(defaultFromDate);
  const [toDate, setToDate] = useState(defaultToDate);
  const [viewPdf, setViewPdf] = useState('');

  const [selectedOption, setSelectedOption] = useState(null);

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
      console.error('Error in Ledger report data fetching:', error);
      toast.error('Error in fetching Ledger report data from API Server.');
    } finally {
      setLoading(false);
    }
  };

  //    PDF API
  const fetchPDF = async () => {
    const PDFAPI = `${ServerBaseUrl}/api/CommonFas/LedgerReportPost`;
    const body = {
      FromDate: formatDate(fromDate),
      ToDate: formatDate(toDate),
      AmountGtEq: 0,
      CustomFilter: '',
      IntReportId: 0,
      ExcludeNoTransaction: 1,
      CompanyName: Companyname,
      CompanyGSTCST: CompanyGSTcst,
      PremiseName: Premisename,
      CompanyContactNo: CompanyContactno,
      CompanyAddress1: Companyaddress1,
      CompanyAddress2: Companyaddress2,
      type: 'pdf',
      ReportID: selectedOption.value,
      ReportName: selectedOption.label,
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
    const response = await axios.post(PDFAPI, body, { headers });
    try {
      const ledgerReportPDF = response?.data?.Data;
      const pdfurl = ledgerReportPDF?.ReportPath;
      setViewPdf(pdfurl);
      console.log(pdfurl);
      dispatch(setLedgerReport(ledgerReportData));
    } catch (error) {
      console.error('Error in Ledger report data fetching:', error);
      //   toast.error('Error in fetching Ledger report data from API Server.');
    }
  };

  const handleLedgerReportPDF = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await fetchPDF();
    } catch (error) {
      console.error('Error in Ledger report data fetching:', error);
      toast.error('Error in fetching Ledger report data from API Server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLedgerReport();
  }, []);

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

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
                  <DatePicker
                    selected={fromDate}
                    onChange={(date) => setFromDate(date)}
                    id="from-date"
                    format="DD-MM-YYYY"
                    name="from-date"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row align="middle">
              <Col md={6} xs={24}>
                <label htmlFor="todate">To Date</label>
              </Col>
              <Col md={18} xs={24}>
                <Form.Item name="todate">
                  <DatePicker
                    selected={toDate}
                    onChange={(date) => setToDate(date)}
                    id="to-date"
                    name="to-date"
                    format="DD-MM-YYYY"
                    minDate={fromDate}
                    maxDate={new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate())}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row align="middle">
              <Col md={6} xs={24}>
                <label htmlFor="report-type">Report Type</label>
              </Col>
              <Col md={18} xs={24}>
                <Form.Item name="report-type">
                  {/* <Input placeholder="Select report type" /> */}
                  <Select
                    id="party"
                    name="party"
                    options={ledgerReportData?.Table.map((report) => ({
                      value: report.Rep_Rpt,
                      label: report.Rep_Name,
                    }))}
                    placeholder="Select Report Type"
                    onChange={handleSelectChange}
                    allowClear
                    showSearch
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row align="middle">
              <Col md={6} xs={24}>
                <label htmlFor="party">Party</label>
              </Col>
              <Col md={18} xs={24}>
                <Form.Item name="party">
                  <Select
                    id="party"
                    name="party"
                    options={ledgerReportData?.Table3.map((report) => ({
                      value: report.Account_ID,
                      label: report.Account_Name,
                    }))}
                    placeholder="Select Party"
                    allowClear
                    showSearch
                    optionFilterProp="children"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row align="middle">
              <Col md={6} xs={24}>
                <label htmlFor="account-group">Account Group</label>
              </Col>
              <Col md={18} xs={24}>
                <Form.Item name="account-group">
                  {/* <Input placeholder="Select your account group " /> */}
                  <Select
                    id="account-group"
                    name="account-group"
                    options={ledgerReportData?.Table2.map((report) => ({
                      value: report.AccountGroup_id,
                      label: report.AccountGroup_Name,
                    }))}
                    placeholder="Select Account Group"
                    allowClear
                    showSearch
                    notFoundContent={loading ? <Spin size="small" /> : null}
                  />
                </Form.Item>
              </Col>
            </Row>
            {/* onClick={handleLedgerReportPDF} */}
            <Button type="primary" loading={loading} onClick={handleLedgerReportPDF}>
              Apply
            </Button>
          </Form>
          <Card>
            {viewPdf && (
              <div className="pdf-container border-2 z-50 absolute">
                {/* <button className="flex items-center justify-end w-full pr-14" onClick={() => setViewPdf(null)}>
                Close
            </button> */}
                <Button type="primary" onClick={() => setViewPdf(null)}>
                  Close
                </Button>
                <iframe className="w-screen h-screen" src={viewPdf} title="Ledger Reports">
                  Presss me: <a href={viewPdf}>Download PDF</a>
                </iframe>
              </div>
            )}
          </Card>
        </Cards>
      </HorizontalFormStyleWrap>
    </BasicFormWrapper>
  );
}

export { LedgerInputForm };
