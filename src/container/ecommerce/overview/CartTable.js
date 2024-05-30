import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Form, Spin, Modal, Input } from 'antd';
import { UilTrashAlt, UilCheckCircle, UilPlus, UilMinus } from '@iconscout/react-unicons';
import { useSelector, useDispatch } from 'react-redux';
import { InquiryForm } from '../../forms/overview/InquiryForm';
import { FigureCart, ProductTable, CouponForm } from '../Style';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
import { getCartItem, removeFromCart, updateCartItem } from '../../../Actions/Catalogue/CartAction';

function CartTable() {
  const cartData = useSelector((state) => state.cart.cartItems.CartItem);
  const cartId = useSelector((state) => state.cart.cartId);
  const isLoading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const [itemQuantity, setItemQuantity] = useState({});
  const [remarks, setRemarks] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (cartId) {
      dispatch(getCartItem(cartId));
    }
  }, [dispatch, cartId]);

  const incrementQuantity = (itemId, Qty) => {
    const updatedQty = Qty + 1;
    setItemQuantity((prev) => ({ ...prev, [itemId]: updatedQty }));
    dispatch(updateCartItem(itemId, cartId, updatedQty, remarks[itemId] || ''));
    dispatch(getCartItem(cartId));
  };

  const decrementQuantity = (itemId, Qty) => {
    if (Qty > 1) {
      const updatedQty = Qty - 1;
      setItemQuantity((prev) => ({ ...prev, [itemId]: updatedQty }));
      dispatch(updateCartItem(itemId, cartId, updatedQty, remarks[itemId] || ''));
      dispatch(getCartItem(cartId));
    }
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

  const handleRemarkChange = (e, itemId) => {
    const { value } = e.target;
    setRemarks((prev) => ({ ...prev, [itemId]: value }));
  };

  const handleRemarkBlur = (itemId) => {
    const remark = remarks[itemId] || '';
    const quantity = itemQuantity[itemId] || cartData.find((item) => item.Id === itemId)?.Qty || 1;
    dispatch(updateCartItem(itemId, cartId, quantity, remark));
    dispatch(getCartItem(cartId));
  };

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

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
              <UilMinus />
            </Button>
            {product.Qty}
            <Button className="btn-inc" type="default" onClick={() => incrementQuantity(product.Id, product.Qty)}>
              <UilPlus />
            </Button>
          </div>
        ),
        total: <span className="cart-single-t-price">₹ {product?.Total}</span>,
        remark: (
          <span className="cart-single-t-price remark-value">
            <Input
              type="text"
              value={remarks[product?.Id] || ''}
              onChange={(e) => handleRemarkChange(e, product?.Id)}
              onBlur={() => handleRemarkBlur(product?.Id)}
              placeholder={`${product?.Remark || 'Write Remark'}`}
            />
          </span>
        ),
        action: (
          <div className="table-action">
            <Button
              onClick={() => handleDeleteItem(product.Id, product.Item_Name)}
              className="btn-icon"
              title="Delete"
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
      <Modal open={isModalVisible} onCancel={handleCancel} footer={null}>
        <InquiryForm />
      </Modal>
    </>
  );
}

export default CartTable;
