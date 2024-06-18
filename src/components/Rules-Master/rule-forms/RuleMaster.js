import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Form, Input, Upload, message, Button } from 'antd';
import UilArrowLeft from '@iconscout/react-unicons/icons/uil-arrow-left';
import UilPaperclip from '@iconscout/react-unicons/icons/uil-paperclip';
import { JobApplicationWrap } from './Style';
import { PageHeader } from '../../page-headers/page-headers';
import { Cards } from '../../cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
// import { Button } from '../..buttons';

const PageRoutes = [
  {
    // path: 'index',
    breadcrumbName: 'Configuration',
  },
  {
    // path: 'app',
    breadcrumbName: 'Rule master',
  },
];

function RuleMaster() {
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <PageHeader
        className="ninjadash-page-header-main ninjadash-pageheader-with-back"
        title={
          <>
            <h4>Rule Master</h4>
            {/* <span className="back-link">
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  window.history.back();
                }}
                to="#"
              >
                <UilArrowLeft />
                Go back
              </Link>
            </span> */}
          </>
        }
        routes={PageRoutes}
      />
      <Main>
        <Row gutter={15}>
          <Col xxl={{ span: 12, offset: 6 }} xl={{ span: 16, offset: 4 }} lg={16} xs={24}>
            <JobApplicationWrap>
              <Cards headless>
                {/* <h2 className="ninjadash-application-title">Submit your application</h2> */}
                <BasicFormWrapper className="mb-25">
                  <Form name="ninjadash-vertical-form" layout="vertical">
                    <Form.Item name="name" label="Rule Name">
                      <Input size="large" placeholder="e.g. Rule 1" />
                    </Form.Item>
                    <Form.Item name="category" label="Select Category">
                      <Input size="large" placeholder="Select Category" />
                    </Form.Item>
                    <Form.Item name="category" label="Select Group">
                      <Input size="large" placeholder="Select Group" />
                    </Form.Item>
                    <Form.Item name="category" label="Select Sub-Group">
                      <Input size="large" placeholder="Select Sub-Group" />
                    </Form.Item>
                    <Form.Item name="category" label="Select Brand">
                      <Input size="large" placeholder="Select Brand" />
                    </Form.Item>

                    <div className="ninjadash-form-action">
                      <Button htmlType="submit" className="btn-signin" type="primary" size="large">
                        Create Rule
                      </Button>
                    </div>
                  </Form>
                </BasicFormWrapper>
              </Cards>
            </JobApplicationWrap>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default RuleMaster;
