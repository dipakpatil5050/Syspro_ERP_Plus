import React, { useState } from 'react';
import { Row, Col } from 'antd';
import UilShareAlt from '@iconscout/react-unicons/icons/uil-share-alt';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Heading from '../../../../components/heading/heading';
import { Button } from '../../../../components/buttons/buttons';
import { ProductCard } from '../../Style';
// import { updateWishList } from '../../../../redux/product/actionCreator';

const ProductCardsList = React.memo(({ product }) => {
  const filepathprefix = 'http://103.67.238.230:1386/';
  const [imageError, setImageError] = useState(false);
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

  /* eslint-disable-next-line no-unsafe-optional-chaining */
  const productImage = !imageError && gallery.length > 0 ? filepathprefix + gallery[0].Filepath : null;
  const defaultImage = 'https://dummyimage.com/600x400/ffffff/000000.png&text=No+Preview';

  return (
    <ProductCard className="list-view" style={{ marginBottom: 20 }}>
      <div className="product-list">
        <Row gutter={15}>
          <Col md={6} xs={24}>
            <NavLink to={`/admin/ecommerce/productDetails/${id}`}>
              <figure>
                <img src={productImage || defaultImage} alt={name} onError={handleImageError} />
              </figure>
            </NavLink>
          </Col>
          <Col md={12} xs={24}>
            <div className="product-single-description">
              <Heading className="product-single-title" as="h5">
                <NavLink to={`/admin/ecommerce/productDetails/${id}`}>{name}</NavLink>
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

                <li>
                  <b>Stock </b>: {view.Stock}
                </li>
                <li>
                  <b>WIP </b>: {view.WIP}
                </li>
                <li>
                  <b>Order </b>: {view.Order}
                </li>
              </ul>
            </div>
          </Col>
          <Col md={6} xs={24}>
            <div className="product-single-info">
              <p className="product-single-price">
                <span className="product-single-price__new">₹ {price} </span>
              </p>

              <div className="product-single-action">
                <Button className="btn-buy" size="default" type="primary">
                  <UilShareAlt /> Share
                </Button>
              </div>
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
