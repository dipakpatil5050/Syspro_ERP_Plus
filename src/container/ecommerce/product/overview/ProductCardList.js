import React, { useState, useEffect } from 'react';
import { Row, Col, Checkbox } from 'antd';
import UilShareAlt from '@iconscout/react-unicons/icons/uil-share-alt';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Heading from '../../../../components/heading/heading';
import { Button } from '../../../../components/buttons/buttons';
import { ProductCard } from '../../Style';
// import { selectItem } from '../../../../redux/reducers/authReducer';
// import { updateWishList } from '../../../../redux/product/actionCreator';

const ProductCardsList = React.memo(({ product }) => {
  const [imageError, setImageError] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();

  const {
    Item_Id: id,
    Item_Name: name,
    SalePrice1: price,
    Gallary: gallery,
    Group_Name: group,
    DesignNo: design,
    SubGroup_Name: subgroup,
    View: view,
  } = product;

  const handleImageError = () => {
    setImageError(true);
  };

  // useEffect(() => {
  //   const selectedItemsFromStorage = JSON.parse(localStorage.getItem('selectedItems')) || [];
  //   setIsChecked(selectedItemsFromStorage.includes(product.Item_Id));
  // }, [product.Item_Id]);

  // const handleCheckboxChange = (event) => {
  //   setIsChecked(event.target.checked);
  //   dispatch(selectItem({ itemId: product.Item_Id, isChecked: event.target.checked }));
  // };

  const handleProductClick = (itemid) => {
    window.open(`/admin/ecommerce/productDetails/${itemid}`, '_blank');
  };

  /* eslint-disable-next-line no-unsafe-optional-chaining */
  const productImage = !imageError && gallery.length > 0 ? gallery[0].Filepath : null;
  const defaultImage = 'https://dummyimage.com/600x400/ffffff/000000.png&text=No+Preview';

  return (
    <ProductCard
      className="list-view"
      style={{
        marginBottom: 20,
        // border: isChecked ? '2px solid #007bff' : 'none',
        boxShadow: '0px 3px 2px rgba(0, 0, 0, 0.24)',
      }}
      onClick={() => handleProductClick(product.Item_Id)}
    >
      <div className="product-list">
        <Row gutter={15}>
          <Col md={6} xs={24}>
            <label htmlFor={`checkbox-${id}`}>
              {/* <Checkbox
                id={`checkbox-${id}`}
                checked={isChecked}
                onChange={handleCheckboxChange}
                style={{ position: 'absolute', top: 10, left: 10 }}
              /> */}
              <figure>
                <img
                  src={productImage || defaultImage}
                  alt={name}
                  onError={handleImageError}
                  style={{ borderRadius: '9px' }}
                />
              </figure>
            </label>
          </Col>
          <Col md={12} xs={24}>
            <div className="product-single-description">
              <Heading className="product-single-title" as="h5">
                <Link onClick={() => handleProductClick(id)}>{name}</Link>
              </Heading>
              <ul>
                <li>
                  <b>Group</b> : {group}
                </li>
                <li>
                  <b>SubGroup </b> : {subgroup}
                </li>
                <li>
                  <b>Design No </b> : {design}
                </li>
              </ul>
            </div>
          </Col>
          <Col md={6} xs={24}>
            <div className="product-single-info">
              <p className="product-single-price">
                <span className="product-single-price__new">₹ {price} </span>
              </p>

              {/* {!isChecked && (
                <div className="product-single-action">
                  <Button className="btn-buy" size="default" type="primary">
                    <UilShareAlt /> Share
                  </Button>
                </div>
              )} */}
            </div>
          </Col>
        </Row>
      </div>
    </ProductCard>
  );
});

ProductCardsList.propTypes = {
  product: PropTypes.object,
};

export default ProductCardsList;
