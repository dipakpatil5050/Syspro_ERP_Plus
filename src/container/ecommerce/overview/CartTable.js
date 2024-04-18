import React, { useState } from 'react';
import { Row, Col, Table, Form, Input, Spin } from 'antd';
// import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import UilMinus from '@iconscout/react-unicons/icons/uil-minus';
import { useSelector } from 'react-redux';

import { FigureCart, ProductTable, CouponForm } from '../Style';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
// import { cartGetData, cartUpdateQuantity, cartDelete } from '../../../redux/cart/actionCreator';
// import { deselectItem } from '../../../redux/reducers/authReducer';

function CartTable() {
  const cartData = useSelector((state) => state.auth.selectedItems);
  const catalogueData = useSelector((state) => state.auth.catalogueData);

  const [productQuantities, setProductQuantities] = useState([]);
  localStorage.getItem('quantities');

  // const dispatch = useDispatch();

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

  const incrementUpdate = (productId) => {
    setProductQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      newQuantities[productId] = (prevQuantities[productId] || 1) + 1;
      return newQuantities;
    });
  };

  const decrementUpdate = (productId) => {
    setProductQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      newQuantities[productId] = Math.max(0, prevQuantities[productId] - 1);
      return newQuantities;
    });
  };
  // const cartDeleted = (id) => {
  //   const confirm = window.confirm('Are you sure to delete this product?');
  //   if (confirm) dispatch(deselectItem(id));
  // };

  const productTableData = [];

  if (cartData !== null) {
    cartData.map((itemId) => {
      const product = catalogueData?.find((item) => item.Item_Id === itemId);
      const quantity = productQuantities[itemId] || 1;

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
                    <Heading as="h6">{product?.Item_Name}</Heading>
                  </b>
                  <ul className="info-list">
                    <li>
                      <span className="info-title">Item code :</span>
                      <span>{product?.Item_Code}</span>
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
        price: <span className="cart-single-price">₹ {product?.SalePrice1}</span>,
        quantity: (
          <div className="cart-single-quantity">
            <Button onClick={() => decrementUpdate(product.Item_Id)} className="btn-dec" type="default">
              <UilMinus />
            </Button>
            {quantity}
            <Button onClick={() => incrementUpdate(product.Item_Id)} className="btn-inc" type="default">
              <UilPlus />
            </Button>
          </div>
        ),
        /* eslint-disable-next-line no-unsafe-optional-chaining */
        total: <span className="cart-single-t-price">₹ {quantity * product?.SalePrice1}</span>,
        // action: (
        //   <div className="table-action">
        //     <Button
        //       onClick={() => cartDeleted(product.Item_Id)}
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
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
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
