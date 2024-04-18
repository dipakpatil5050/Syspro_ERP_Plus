// import React, { useState, useEffect } from 'react';
import React from 'react';
import { Row, Col, Table, Form, Input, Spin } from 'antd';
// import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
// import UilMinus from '@iconscout/react-unicons/icons/uil-minus';
// import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
// import { useDispatch, useSelector } from 'react-redux';

import { useSelector } from 'react-redux';
import { FigureCart, ProductTable, CouponForm } from '../Style';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
// import { cartGetData, cartUpdateQuantity, cartDelete } from '../../../redux/cart/actionCreator';

function CartTable() {
  const cartData = useSelector((state) => state.auth.selectedItems);
  const catalogueData = useSelector((state) => state.auth.catalogueData);

  //   const dispatch = useDispatch();
  //   const { cartData, isLoading } = useSelector((state) => {
  //     return {
  //       cartData: state.cart.data,
  //       isLoading: state.cart.loading,
  //       rtl: state.ChangeLayoutMode.rtlData,
  //     };
  //   });

  //   const [form] = Form.useForm();
  //   const [state, setState] = useState({
  //     coupon: 0,
  //     promo: 0,
  //     current: 0,
  //   });

  //   useEffect(() => {
  //     if (cartGetData) {
  //       dispatch(cartGetData());
  //     }
  //   }, [dispatch]);

  //   const incrementUpdate = (id, quantity) => {
  //     const data = parseInt(quantity, 10) + 1;
  //     dispatch(cartUpdateQuantity(id, data, cartData));
  //   };

  //   const decrementUpdate = (id, quantity) => {
  //     const data = parseInt(quantity, 10) >= 2 ? parseInt(quantity, 10) - 1 : 1;
  //     dispatch(cartUpdateQuantity(id, data, cartData));
  //   };

  //   const cartDeleted = (id) => {
  //     const confirm = window.confirm('Are you sure to delete this product?');
  //     if (confirm) dispatch(cartDelete(id, cartData));
  //   };

  const productTableData = [];

  if (cartData !== null) {
    cartData.map((itemId) => {
      const product = catalogueData?.find((item) => item.Item_Id === itemId);

      const filepathprefix = 'http://103.67.238.230:1386/';
      /* eslint-disable-next-line no-unsafe-optional-chaining */
      const productImage = filepathprefix + product?.Gallary[0]?.Filepath;
      return productTableData.push({
        key: product?.Item_Id,
        product: (
          <div className="cart-single">
            <FigureCart>
              <img style={{ width: 80 }} src={productImage} alt="" />
              <figcaption>
                <div className="cart-single__info">
                  <b>
                    <Heading as="h6">{product.Item_Name}</Heading>
                  </b>
                  <ul className="info-list">
                    <li>
                      <span className="info-title">Item code :</span>
                      <span>{product.Item_Code}</span>
                    </li>
                    {/* <li>
                      <span className="info-title"> Color :</span>
                      <span>{product.Item_Id}</span>
                    </li> */}
                  </ul>
                </div>
              </figcaption>
            </FigureCart>
          </div>
        ),
        price: <span className="cart-single-price">₹ {product.SalePrice1}</span>,
        // quantity: (
        //   <div className="cart-single-quantity">
        //     <Button onClick={() => decrementUpdate(id, quantity)} className="btn-dec" type="default">
        //       <UilMinus />
        //     </Button>
        //     {quantity}
        //     <Button onClick={() => incrementUpdate(id, quantity)} className="btn-inc" type="default">
        //       <UilPlus />
        //     </Button>
        //   </div>
        // ),
        total: <span className="cart-single-t-price">₹ {product.SalePrice1}</span>,
        // action: (
        //   <div className="table-action">
        //     <Button
        //       onClick={() => cartDeleted(id)}
        //       className="btn-icon"
        //       to="#"
        //       size="default"
        //       type="danger"
        //       shape="circle"
        //       transparented
        //     >
        //       <UilTrashAlt />
        //     </Button>
        //   </div>
        // ),
      });
    });
  }

  const productTableColumns = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    // {
    //   title: 'Quantity',
    //   dataIndex: 'quantity',
    //   key: 'quantity',
    // },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  //   const submitCoupon = (values) => {
  //     setState({ ...state, coupon: values });
  //   };

  const isLoading = false;

  return (
    <>
      <ProductTable>
        {isLoading ? (
          <div className="sd-spin">
            <Spin />
          </div>
        ) : (
          <div className="table-cart table-responsive">
            <Table pagination={false} dataSource={productTableData} columns={productTableColumns} />
          </div>
        )}
      </ProductTable>

      <CouponForm>
        <Form name="submitCoupon">
          <Row gutter={15}>
            <Col lg={4} sm={8} xs={24}>
              <Form.Item name="coupon" label="">
                <Input placeholder="Coupon Code" />
              </Form.Item>
            </Col>
            <Col lg={4} sm={8} xs={24}>
              <Button htmlType="submit" size="default" type="primary">
                Share
              </Button>
            </Col>
          </Row>
        </Form>
      </CouponForm>
    </>
  );
}

export default CartTable;
