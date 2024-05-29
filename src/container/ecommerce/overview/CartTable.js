import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Form, Spin, Modal, Input } from 'antd';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import UilCheckCircle from '@iconscout/react-unicons/icons/uil-check-circle';

import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import UilMinus from '@iconscout/react-unicons/icons/uil-minus';
import { useSelector, useDispatch } from 'react-redux';
import { InquiryForm } from '../../forms/overview/InquiryForm';
import { FigureCart, ProductTable, CouponForm } from '../Style';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
import { getCartItem, removeFromCart, updateCartItem } from '../../../Actions/Catalogue/CartAction';
// import { cartGetData, cartUpdateQuantity, cartDelete } from '../../../redux/cart/actionCreator';

// import { deselectItem } from '../../../redux/reducers/authReducer';

function CartTable() {
  const cartData = useSelector((state) => state.cart.cartItems.CartItem);

  const cartId = useSelector((state) => state.cart.cartId);

  const isLoading = useSelector((state) => state.auth.loading);

  // const [productQuantities, setProductQuantities] = useState(1);

  const [itemQuantity, setItemQuantity] = useState(0);

  const [remark, setRemark] = useState('');

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const storedQuantities = localStorage.getItem('productQuantities');
  //   if (storedQuantities) {
  //     setProductQuantities(JSON.parse(storedQuantities));
  //   }
  // }, []);

  // const updateQuantity = (itemId, newQuantity) => {
  //   const updatedQuantities = { ...productQuantities, [itemId]: newQuantity };
  //   setProductQuantities(updatedQuantities);
  //   localStorage.setItem('productQuantities', JSON.stringify(updatedQuantities));
  // };

  // Increment quantity
  const incrementQuantity = (itemId, Qty) => {
    const updatedQty = Qty + 1;
    setItemQuantity(updatedQty);
    dispatch(updateCartItem(itemId, cartId, updatedQty, remark));
    dispatch(getCartItem(cartId));
  };

  // Decrement quantity
  const decrementQuantity = (itemId, Qty) => {
    const updatedQty = Qty - 1;
    setItemQuantity(updatedQty);
    dispatch(updateCartItem(itemId, cartId, updatedQty, remark));
    dispatch(getCartItem(cartId));
  };

  const handleDeleteItem = (itemId, name) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: `Are you sure you want to remove this ${name} item from the cart?`,
      okText: 'Yes',
      cancelText: 'Cancel',
      centered: true,
      onOk: () => {
        dispatch(removeFromCart(itemId, cartId));
        dispatch(getCartItem(cartId));
      },
    });
  };

  const handleItemUpdate = (itemId) => {
    dispatch(updateCartItem(itemId, cartId, itemQuantity, remark));
  };

  useEffect(() => {
    if (getCartItem) {
      dispatch(getCartItem(cartId));
    }
  }, [dispatch]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const productTableData = [];

  if (cartData !== null) {
    cartData?.map((product) => {
      return productTableData.push({
        key: product?.Item_Id,
        product: (
          <div className="cart-single">
            <FigureCart>
              <img style={{ width: 80 }} src={product?.Filepath} alt="Product loading..." />
              <figcaption>
                <div className="cart-single__info">
                  <b>
                    <Heading as="h6">{product?.Item_Name}</Heading>
                  </b>
                  <ul className="info-list">
                    <li>
                      <span className="info-title">Item code :</span>
                      <span>{product?.Item_Id}</span>
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
        price: <span className="cart-single-price">₹ {product?.Saleprice1}</span>,
        quantity: (
          <div className="cart-single-quantity">
            <Button className="btn-dec" type="default" onClick={() => decrementQuantity(product.Id, product.Qty)}>
              {/* onClick={() => decrementUpdate(product.Item_Id)} */}
              <UilMinus />
            </Button>
            {product.Qty}
            {/* onClick={() => incrementUpdate(product.Item_Id)} */}
            <Button className="btn-inc" type="default" onClick={() => incrementQuantity(product.Id, product.Qty)}>
              <UilPlus />
            </Button>
          </div>
        ),
        total: <span className="cart-single-t-price">₹ {product?.Total}</span>,

        remark: (
          <span className="cart-single-t-price remark-value">
            <Input type="text" placeholder={`${product?.Remark || 'Write Remark'}`} />
          </span>
        ),
        action: (
          <div className="table-action">
            <Button
              onClick={() => handleItemUpdate(product.Id)}
              className="btn-icon"
              to="#"
              size="default"
              type="primary"
              shape="circle"
              transparented
            >
              <UilCheckCircle />
              {/* <img
                src="https://image.shutterstock.com/image-vector/update-icon-vector-solid-illustration-260nw-405097894.jpg"
                alt="action"
              /> */}
            </Button>
            {'  '}
            <Button
              onClick={() => handleDeleteItem(product.Id, product.Item_Name)}
              className="btn-icon"
              to="#"
              size="default"
              type="danger"
              shape="circle"
              transparented
            >
              <UilTrashAlt />
            </Button>
          </div>
        ),
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
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

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
            {/* <Col lg={4} sm={8} xs={24}>
              <Form.Item name="coupon" label="">
                <Input placeholder="Coupon Code" />
              </Form.Item>
            </Col> */}
            <Col lg={4} sm={8} xs={24}>
              <Button htmlType="submit" size="default" type="primary" onClick={showModal}>
                Share
              </Button>
            </Col>
          </Row>
        </Form>
      </CouponForm>
      {/* visible ={isModalVisible}  instead of open if not works */}
      <Modal open={isModalVisible} onCancel={handleCancel} footer={null}>
        <InquiryForm />
      </Modal>
    </>
  );
}

export default CartTable;
