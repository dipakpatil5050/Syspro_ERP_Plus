import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Form, Select, Upload, message, Progress } from 'antd';
import UilArrowLeft from '@iconscout/react-unicons/icons/uil-arrow-left';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UilCloudUpload from '@iconscout/react-unicons/icons/uil-cloud-upload';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { AddProductForm } from '../Style';
import Heading from '../../../components/heading/heading';
import { getItemList, uploadItem } from '../../../Actions/Catalogue/CartAction';

const { Option } = Select;
const { Dragger } = Upload;

function AddProduct() {
  const PageRoutes = [
    {
      breadcrumbName: 'Catalogue',
    },
    {
      path: '',
      breadcrumbName: 'Add Product',
    },
  ];

  const draggerRef = useRef();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [itemId, setItemId] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();
  const ItemNameList = useSelector((state) => state.auth.itemList);
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(getItemList());
  }, [dispatch]);

  const customRequest = async ({ file, onSuccess, onError, onProgress }) => {
    if (file.size / 1024 / 1024 > 2) {
      message.error('File size must be less than 2MB.');
      onError(new Error('File size must be less than 2MB.'));
      return;
    }

    setUploading(true);
    const fakeUpload = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(fakeUpload);
          onSuccess(null, file);
          setUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    setFileList((prevList) => [...prevList, file]);
  };

  const fileUploadProps = {
    name: 'file',
    multiple: true,
    accept: '.jpg,.png,.gif',
    customRequest,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        setFileList(info.fileList.filter((file) => file.status !== 'error'));
      }
    },
    listType: 'picture',
    fileList,
    showUploadList: {
      showRemoveIcon: true,
      removeIcon: <UilTrashAlt />,
    },
  };

  const handleClearFiles = () => {
    setFileList([]);
    if (draggerRef.current) {
      draggerRef.current.upload.uploader.reset();
    }
  };

  const handleSubmit = async () => {
    if (fileList.length > 0 && itemId) {
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append('file', file.originFileObj);
      });
      formData.append('itemID', itemId);

      await dispatch(uploadItem(formData));
      setFileList([]);
      setItemId('');
      setProgress(0);
      form.resetFields();
      handleClearFiles();
    } else {
      message.error('Please upload a file first.');
    }
  };

  return (
    <>
      <PageHeader
        className="ninjadash-page-header-main ninjadash-pageheader-with-back"
        routes={PageRoutes}
        title={
          <>
            <h4>Add Product</h4>
            <span className="back-link">
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  window.history.back();
                }}
                // to="#"
              >
                <UilArrowLeft />
                Go back
              </Link>
            </span>
          </>
        }
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards headless>
              <Row gutter={25} justify="center">
                <Col xxl={12} md={18} xs={24}>
                  <AddProductForm>
                    <Form style={{ width: '100%' }} form={form} name="addProduct" onFinish={handleSubmit}>
                      <BasicFormWrapper>
                        <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                <Cards title="Product Image">
                                  <Form.Item
                                    name="itemId"
                                    label="Item Name"
                                    rules={[{ required: true, message: 'Please select an item name' }]}
                                  >
                                    <Select
                                      placeholder="Select Item"
                                      allowClear
                                      autoClearSearchValue
                                      showSearch
                                      value={itemId}
                                      style={{ width: '100%' }}
                                      onChange={setItemId}
                                      filterOption={(input, option) =>
                                        option.children.toLowerCase().includes(input.toLowerCase())
                                      }
                                    >
                                      {ItemNameList &&
                                        ItemNameList.map((item) => (
                                          <Option key={item.Item_ID} value={item.Item_ID}>
                                            {item.Item_Name}
                                          </Option>
                                        ))}
                                    </Select>
                                  </Form.Item>
                                  <Dragger ref={draggerRef} {...fileUploadProps}>
                                    <p className="ant-upload-drag-icon">
                                      <UilCloudUpload />
                                    </p>
                                    <Heading as="h4" className="ant-upload-text">
                                      Drag and drop an image
                                    </Heading>
                                    <p className="ant-upload-hint">
                                      or <span>Browse</span> to choose a file
                                    </p>
                                    {uploading && <Progress percent={progress} />}
                                  </Dragger>
                                </Cards>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div className="add-form-action">
                          <Form.Item>
                            <Button
                              className="btn-cancel"
                              size="large"
                              onClick={() => {
                                form.resetFields();
                                setFileList([]);
                                setItemId('');
                                setProgress(0);
                              }}
                            >
                              Cancel
                            </Button>
                            <Button loading={loading} size="large" htmlType="submit" type="primary" raised>
                              {loading ? 'uploading' : 'Save Product'}
                            </Button>
                          </Form.Item>
                        </div>
                      </BasicFormWrapper>
                    </Form>
                  </AddProductForm>
                </Col>
              </Row>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default AddProduct;
