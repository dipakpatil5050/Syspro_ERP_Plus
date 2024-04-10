import React from 'react';
import UilShoppingBag from '@iconscout/react-unicons/icons/uil-shopping-bag';
import PropTypes from 'prop-types';
import Heading from '../../../../components/heading/heading';
import { Button } from '../../../../components/buttons/buttons';
import { ProductCard } from '../../Style';

function ProductCards({ product }) {
  const filepathpreffix = 'http://103.67.238.230:1386/';
  const { Item_Id: id, Item_Name: name, SalePrice1: price, Gallary: gallery } = product;

  /* eslint-disable-next-line no-unsafe-optional-chaining */
  const productImage = filepathpreffix + gallery[0]?.Filepath;

  return (
    <ProductCard style={{ marginBottom: 30, width: 280 }}>
      <figure>
        <img src={productImage} alt={name} height={200} />
      </figure>
      {/* width={290} height={200} */}
      <figcaption>
        <Heading className="product-single-title" as="h5">
          {/* <NavLink to={`/admin/ecommerce/productDetails/${id}`}>{name}</NavLink> */}
          {name} {id}
        </Heading>
        <p className="product-single-price">
          <span className="product-single-price__new">₹ {price} </span>
        </p>
        <div className="product-single-action">
          <Button size="small" type="white" className="btn-cart" outlined>
            <UilShoppingBag />
            Add To Cart
          </Button>
          <Button size="small" type="primary">
            Buy Now
          </Button>
        </div>
      </figcaption>
    </ProductCard>
  );
}

ProductCards.propTypes = {
  product: PropTypes.shape({
    Item_Id: PropTypes.number.isRequired,
    Item_Name: PropTypes.string.isRequired,
    SalePrice1: PropTypes.number.isRequired,
    Gallary: PropTypes.arrayOf(
      PropTypes.shape({
        Document_Id: PropTypes.number.isRequired,
        Filepath: PropTypes.string.isRequired,
        FileName: PropTypes.string.isRequired,
        IsBannerImage: PropTypes.bool.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default ProductCards;
