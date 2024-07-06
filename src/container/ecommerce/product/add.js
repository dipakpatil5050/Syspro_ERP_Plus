import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Select, Upload, message } from 'antd';
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

  const [form] = Form.useForm();
  const [state, setState] = useState({
    file: null,
    list: [],
    itemId: '',
  });

  const dispatch = useDispatch();
  const ItemNameList = useSelector((state1) => state1.auth.itemList);

  useEffect(() => {
    dispatch(getItemList());
  }, [dispatch]);

  const customRequest = async ({ file, onSuccess, onError }) => {
    if (file.size / 1024 / 1024 > 2) {
      message.error('File size must be less than 2MB.');
      onError(new Error('File size must be less than 2MB.'));
      return;
    }

    setState((prevState) => ({
      ...prevState,
      file,
    }));
    onSuccess(null, file);
  };

  const fileUploadProps = {
    name: 'file',
    multiple: true,
    customRequest,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        setState((prevState) => ({
          ...prevState,
          list: info.fileList.filter((file) => file.status !== 'error'),
        }));
      }
    },
    listType: 'picture',
    defaultFileList: state.list,
    showUploadList: {
      showRemoveIcon: true,
      removeIcon: <UilTrashAlt />,
    },
  };

  const handleSubmit = async () => {
    if (state.file && state.itemId) {
      try {
        await dispatch(uploadItem(state.file, state.itemId));
        message.success('Product uploaded successfully!');
      } catch (error) {
        message.error('Product upload failed!');
      }
    } else {
      message.error('Please select an item and upload a file.');
    }
  };

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Add Product" routes={PageRoutes} />
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
                                      value={state.itemId}
                                      style={{ width: '100%' }}
                                      onChange={(value) => setState((prevState) => ({ ...prevState, itemId: value }))}
                                    >
                                      {ItemNameList &&
                                        ItemNameList.map((item) => (
                                          <Option key={item.Item_Id} value={item.Item_Id}>
                                            {item.Item_Name}
                                          </Option>
                                        ))}
                                    </Select>
                                  </Form.Item>
                                  <Dragger {...fileUploadProps}>
                                    <p className="ant-upload-drag-icon">
                                      <UilCloudUpload />
                                    </p>
                                    <Heading as="h4" className="ant-upload-text">
                                      Drag and drop an image
                                    </Heading>
                                    <p className="ant-upload-hint">
                                      or <span>Browse</span> to choose a file
                                    </p>
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
                                setState({ file: null, list: [], itemId: '' });
                              }}
                            >
                              Cancel
                            </Button>
                            <Button size="large" htmlType="submit" type="primary" raised>
                              Save Product
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

// working code for backup
