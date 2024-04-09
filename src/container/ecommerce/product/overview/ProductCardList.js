import React from 'react';
import { Row, Col } from 'antd';
import UilShoppingBag from '@iconscout/react-unicons/icons/uil-shopping-bag';
// import UilHeart from '@iconscout/react-unicons/icons/uil-heart';
// import { useDispatch } from 'react-redux';
// import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { ReactSVG } from 'react-svg';
import Heading from '../../../../components/heading/heading';
import { Button } from '../../../../components/buttons/buttons';
import { ProductCard } from '../../Style';
// import { updateWishList } from '../../../../redux/product/actionCreator';

const ProductCardsList = React.memo(({ product }) => {
  const filepathpreffix = 'http://103.67.238.230:1386/';
  const { Item_Id: id, Item_Name: name, SalePrice1: price, Gallary: gallery } = product;

  /* eslint-disable-next-line no-unsafe-optional-chaining */
  const productImage = filepathpreffix + gallery[0]?.Filepath;

  return (
    <ProductCard className="list-view" style={{ marginBottom: 20 }}>
      <div className="product-list">
        <Row gutter={15}>
          <Col md={6} xs={24}>
            <figure>
              <img src={productImage} alt={name} />
            </figure>
          </Col>
          <Col md={12} xs={24}>
            <div className="product-single-description">
              <Heading className="product-single-title" as="h5">
                {/* <NavLink to={`/admin/ecommerce/productDetails/${id}`}>{name}</NavLink> */}
                {name} {id}
              </Heading>
              <p>description</p>
            </div>
          </Col>
          <Col md={6} xs={24}>
            <div className="product-single-info">
              {/* <Link
                // onClick={() => dispatch(updateWishList(id))}
                className={popular ? 'btn-heart favourite' : 'btn-heart'}
                to="#"
              >
                {popular ? (
                  <ReactSVG src={require(`../../../../static/img/icon/heart-fill.svg`).default} />
                ) : (
                  <UilHeart />
                )}
              </Link> */}
              <p className="product-single-price">
                <span className="product-single-price__new">₹{price} </span>
                {price && (
                  <>
                    <del> ${price} </del>
                    <span className="product-single-price__offer"> 60% Off</span>
                  </>
                )}
              </p>
              <div className="product-single-rating">
                <span className="total-reviews"> 778 Reviews</span>
              </div>
              <div className="product-single-action">
                <Button className="btn-cart" size="small" type="white" outlined>
                  <UilShoppingBag />
                  Add To Cart
                </Button>
                <Button size="small" type="primary">
                  Buy Now
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
