import React, { useEffect } from 'react';
import { Rate } from 'antd';
// import UilHeart from '@iconscout/react-unicons/icons/uil-heart';
import UilShoppingBag from '@iconscout/react-unicons/icons/uil-shopping-bag';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// import FontAwesome from 'react-fontawesome';
import Heading from '../../../../components/heading/heading';
import { getCartItem } from '../../../../Actions/Catalogue/CartAction';
// import { updateWishList } from '../../../../redux/product/actionCreator';
// import { Button } from '../../../../components/buttons/buttons';
// import { selectItem } from '../../../../redux/reducers/authReducer';

function DetailsRight() {
  const dispatch = useDispatch();
  const cartId = useSelector((state) => state.cart.cartId);
  // if (!product) {
  //   return null;
  // }
  // const dispatch = useDispatch();
  // const [state, setState] = useState({
  //   quantity: 1,
  // });

  useEffect(() => {
    dispatch(getCartItem(cartId));
  }, [dispatch]);

  const products = useSelector((state) => state.auth.singleProduct[0]);

  /* eslint-disable camelcase */

  // const product = products[0];

  // const { Item_Name, Item_Code, SalePrice1, DesignNo, Item_Id } = product;

  // const [isModalVisible, setIsModalVisible] = useState(false);

  // const showModal = () => {
  //   setIsModalVisible(true);
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  // Stock_qty,
  // const availabilityText = Stock_qty > 0 ? 'In Stock' : 'Out of Stock'; //

  // let stockStyle;
  // if (availabilityText === 'Out of Stock') {
  //   stockStyle = {
  //     color: 'red',
  //     weight: 500,
  //   };
  // } else {
  //   stockStyle = {
  //     color: 'green',
  //   };
  // }
  // const { name, rate, price, oldPrice, description, category, brand, popular, id } = product;

  // const { quantity } = state;
  // console.log(id);

  // Quantity :
  // const incrementQuantity = (e) => {
  //   e.preventDefault();
  //   setState({
  //     ...state,
  //     quantity: quantity + 1,
  //   });
  // };

  // const decrementQuantity = (e) => {
  //   e.preventDefault();
  //   if (quantity !== 1)
  //     setState({
  //       ...state,
  //       quantity: quantity - 1,
  //     });
  // };

  return (
    <>
      <div className="product-details-box__right pdbr">
        {/* eslint-disable camelcase  */}
        <Heading className="pdbr__title" as="h1">
          {products?.Item_Name}
        </Heading>
        <Rate allowHalf defaultValue={products?.SalePrice1} disabled />

        <Heading className="pdbr__new-price" as="h3">
          {/* <span className="pdbr__currency">₹ </span> */}
          <span className="pdbr__price">₹ {products?.SalePrice1}</span>
        </Heading>
        <div className="pdbr__current-status">
          {/* <p>
            <span className="current-status-title">Availability :</span>

            <span className="stock-status in-stock" style={stockStyle}>
              {availabilityText}
            </span>
          </p> */}
          <p>
            <span className="current-status-title"> Item Name : </span>
            <span className="shipping-cost">{products?.Item_Name}</span>
          </p>
          <p>
            <span className="current-status-title"> Item Code : </span>
            <span className="shipping-cost">&nbsp;{products?.Item_Code}</span>
          </p>

          <p>
            <span className="current-status-title"> Design No : </span>
            <span className="shipping-cost">{products?.DesignNo}</span>
          </p>
          {/* <p>
            <span className="current-status-title"> Stock : </span>
            <span className="shipping-cost">&emsp; &ensp; {Stock_qty}</span>
          </p> */}

          {/* Quantity page :  */}
          {/* <p className="pdbr__quantity">
          <span className="current-status-title">Quantity :</span>

          <Button className="btn-inc" onClick={decrementQuantity} type="default">
            -
          </Button>
          {quantity}
          <Button className="btn-dec" onClick={incrementQuantity} type="default">
            +
          </Button>
          <span className="pdbr__availability">540 pieces available</span>
        </p> */}
        </div>
        <br />
        <br />
        {/* buy now and Add to Cart Button will be here */}
        {/* onClick={addToCart(Item_Id)} */}
        {/* <div className="pdbr__Actions d-flex align-items-center">
          <div className="pdbr__product-action">
            <Button className="btn-cart" size="default" type="secondary" onClick={() => addToCart(products?.Item_Id)}>
              <UilShoppingBag /> Add To Cart
            </Button>
          </div>
        </div> */}
        {/* <ul className="pdbr__list">
          <li>
            <span>Category:</span>
            <span>category</span>
          </li>
        </ul> */}
      </div>

      {/* <Modal title="inquiry Form" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <p>Home</p>
      </Modal> */}
    </>
  );
}
DetailsRight.propTypes = {
  products: PropTypes.shape({
    Item_Name: PropTypes.string.isRequired,
    SalePrice1: PropTypes.number.isRequired,
    Item_Code: PropTypes.string.isRequired,
    Item_Id: PropTypes.string.isRequired,
    // Stock_qty: PropTypes.number.isRequired,
    DesignNo: PropTypes.string.isRequired,
  }).isRequired,
};

export default DetailsRight;
