import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Form, Spin, Modal } from 'antd';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import UilMinus from '@iconscout/react-unicons/icons/uil-minus';
import { useSelector, useDispatch } from 'react-redux';

import { FigureCart, ProductTable, CouponForm } from '../Style';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
// import { cartGetData, cartUpdateQuantity, cartDelete } from '../../../redux/cart/actionCreator';
import { deselectItem } from '../../../redux/reducers/authReducer';

function CartTable() {
  const cartData = useSelector((state) => state.auth.selectedItems);
  const catalogueData = useSelector((state) => state.auth.catalogueData);
  const [productQuantities, setProductQuantities] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    const storedQuantities = localStorage.getItem('productQuantities');
    if (storedQuantities) {
      setProductQuantities(JSON.parse(storedQuantities));
    }
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    const updatedQuantities = { ...productQuantities, [itemId]: newQuantity };
    setProductQuantities(updatedQuantities);
    localStorage.setItem('productQuantities', JSON.stringify(updatedQuantities));
  };

  // Increment quantity
  const incrementQuantity = (itemId) => {
    const currentQuantity = productQuantities[itemId] || 1;
    const newQuantity = currentQuantity + 1;
    updateQuantity(itemId, newQuantity);
  };

  // Decrement quantity
  const decrementQuantity = (itemId) => {
    const currentQuantity = productQuantities[itemId] || 1;
    const newQuantity = Math.max(1, currentQuantity - 1);
    updateQuantity(itemId, newQuantity);
  };

  const handleDeleteItem = (itemId, name) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: `Are you sure you want to remove this ${name} item from the cart?`,
      okText: 'Yes',
      cancelText: 'Cancel',
      centered: true,
      onOk: () => {
        dispatch(deselectItem({ itemId }));
      },
    });
  };

  // const [productQuantities, setProductQuantities] = useState([]);

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

  // useEffect(() => {
  //   const storedQuantities = localStorage.getItem('quantities');
  //   const parsedQuantities = storedQuantities ? JSON.parse(storedQuantities) : {};
  //   setProductQuantities(parsedQuantities);
  // }, []);

  // const incrementUpdate = (productId) => {
  //   setProductQuantities((prevQuantities) => {
  //     const newQuantities = Array.isArray(prevQuantities) ? [...prevQuantities] : [];
  //     newQuantities[productId] = (prevQuantities[productId] || 1) + 1;
  //     localStorage.setItem('quantities', JSON.stringify(newQuantities));
  //     return newQuantities;
  //   });
  // };

  // const decrementUpdate = (productId) => {
  //   setProductQuantities((prevQuantities) => {
  //     const newQuantities = Array.isArray(prevQuantities) ? [...prevQuantities] : [];
  //     newQuantities[productId] = Math.max(0, prevQuantities[productId] - 1);
  //     localStorage.setItem('quantities', JSON.stringify(newQuantities));
  //     return newQuantities;
  //   });
  // };
  // const cartDelete = (id) => {
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

      /* eslint-disable-next-line no-unsafe-optional-chaining */
      const totalPrice = quantity * product?.SalePrice1;

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
                      <span className="info-t itle">Item code :</span>
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
            <Button className="btn-dec" type="default" onClick={() => decrementQuantity(product.Item_Id)}>
              {/* onClick={() => decrementUpdate(product.Item_Id)} */}
              <UilMinus />
            </Button>
            {quantity}
            {/* onClick={() => incrementUpdate(product.Item_Id)} */}
            <Button className="btn-inc" type="default" onClick={() => incrementQuantity(product.Item_Id)}>
              <UilPlus />
            </Button>
          </div>
        ),
        total: <span className="cart-single-t-price">₹ {totalPrice}</span>,
        action: (
          <div className="table-action">
            <Button
              onClick={() => handleDeleteItem(product.Item_Id, product.Item_Name)}
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

  const subtotal = productTableData.reduce((acc, curr) => {
    return acc + curr.quantity * (curr.price || 0);
  }, 0);
  console.log(subtotal);

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

  const isLoading = false ;

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
