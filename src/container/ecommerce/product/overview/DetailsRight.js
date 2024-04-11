import React from 'react';
import { Rate } from 'antd';
// import UilHeart from '@iconscout/react-unicons/icons/uil-heart';
import UilShareAlt from '@iconscout/react-unicons/icons/uil-share-alt';
import UilShoppingBag from '@iconscout/react-unicons/icons/uil-shopping-bag';
import PropTypes from 'prop-types';
// import FontAwesome from 'react-fontawesome';
import Heading from '../../../../components/heading/heading';
// import { updateWishList } from '../../../../redux/product/actionCreator';
import { Button } from '../../../../components/buttons/buttons';

const DetailsRight = React.memo(({ product }) => {
  // argument = { product }
  //   const dispatch = useDispatch();
  // const [state, setState] = useState({
  //   quantity: 1,
  // });

  /* eslint-disable camelcase */
  const { Item_Name, Item_Code, SalePrice1, Stock_qty, WIP_stock, SaleOrder, DesignNo } = product;

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
          {Item_Name}
        </Heading>
        <Rate allowHalf defaultValue={SalePrice1} disabled />
        {/* <span className="pdbr__rating">{SalePrice1}</span> */}
        {/* <span className="pdbr__review-count"> 778 Reviews</span> */}
        {/* <p>
        <span className="pdbr__brand-text">Brand :</span>
        <span className="pdbr__brand-name">{name}</span>
      </p> */}
        <Heading className="pdbr__new-price" as="h3">
          {/* <span className="pdbr__currency">₹ </span> */}
          <span className="pdbr__price">₹ {SalePrice1}</span>
        </Heading>
        {/* <p className="pdbr__desc">{}</p> */}
        <div className="pdbr__current-status">
          <p>
            <span className="current-status-title">Available :</span>
            <span className="stock-status in-stock"> In Stock</span>
          </p>
          <p>
            <span className="current-status-title"> Item Name : </span>
            <span className="shipping-cost">{Item_Name}</span>
          </p>
          <p>
            <span className="current-status-title"> Item Code : </span>
            <span className="shipping-cost">{Item_Code}</span>
          </p>
          <p>
            <span className="current-status-title"> WIP Stock : </span>
            <span className="shipping-cost">{WIP_stock}</span>
          </p>
          <p>
            <span className="current-status-title"> Design No : </span>
            <span className="shipping-cost">{DesignNo}</span>
          </p>
          <p>
            <span className="current-status-title"> Stock : </span>
            <span className="shipping-cost">{Stock_qty}</span>
          </p>
          <p>
            <span className="current-status-title"> Sale Order (Pending) : </span>
            <span className="shipping-cost">{SaleOrder}</span>
          </p>
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
        {/* buy now and Add to Cart Button will be here */}
        <div className="pdbr__Actions d-flex align-items-center">
          <div className="pdbr__product-action">
            <Button className="btn-buy" size="default" type="primary">
              Buy Now
            </Button>
            <Button className="btn-cart" size="default" type="secondary">
              <UilShoppingBag /> Add To Cart
            </Button>

            <Button className="btn-icon" size="default" raised type="white" shape="circle">
              <UilShareAlt />
            </Button>
          </div>
        </div>
        <ul className="pdbr__list">
          <li>
            <span>Category:</span>
            {/* <span>{category}</span> */}
          </li>
        </ul>
        <ul className="pdbr__list">
          <li>
            <span>Tags:</span>
          </li>
        </ul>
      </div>
    </>
  );
});
DetailsRight.propTypes = {
  product: PropTypes.shape({
    Item_Name: PropTypes.string.isRequired,
    SalePrice1: PropTypes.number.isRequired,
    Item_Code: PropTypes.string.isRequired,
    Stock_qty: PropTypes.number.isRequired,
    SaleOrder: PropTypes.number.isRequired,
    WIP_stock: PropTypes.number.isRequired,
    DesignNo: PropTypes.string.isRequired,
  }).isRequired,
};

export default DetailsRight;
