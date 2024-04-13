import React, { useState } from 'react';
// import UilShareAlt from '@iconscout/react-unicons/icons/uil-share-alt';
// import { IoShareSocialOutline } from 'react-icons/io5';
import { Share2 } from 'lucide-react';
// import UilShoppingBag from '@iconscout/react-unicons/icons/uil-shopping-bag';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Col } from 'antd';
import Heading from '../../../../components/heading/heading';
import { Button } from '../../../../components/buttons/buttons';
import { ProductCard } from '../../Style';

function ProductCards({ product }) {
  const filepathprefix = 'http://103.67.238.230:1386/';
  const [imageError, setImageError] = useState(false);
  const { Item_Id: id, Item_Name: name, SalePrice1: price, Gallary: gallery } = product;

  const handleImageError = () => {
    setImageError(true);
  };

  /* eslint-disable-next-line no-unsafe-optional-chaining */
  const productImage = !imageError && gallery?.length > 0 ? filepathprefix + gallery[0]?.Filepath : null;
  const defaultImage = 'https://dummyimage.com/600x400/ffffff/000000.png&text=No+Preview';

  return (
    <ProductCard style={{ marginBottom: 30 }}>
      <NavLink to={`/admin/ecommerce/productDetails/${id}`} state={{ product }}>
        <figure>
          <img src={productImage || defaultImage} alt={name} height={200} onError={handleImageError} />
        </figure>
      </NavLink>
      {/* width={290} height={200} */}

      <Col align="right" style={{ position: 'absolute', right: '0', top: '178px' }}>
        <Button className="btn-icon" shape="circle" type="primary" size="large">
          <Share2 style={{ color: 'white' }} />
        </Button>
      </Col>

      <figcaption>
        <Heading className="product-single-title" as="h5">
          <NavLink to={`/admin/ecommerce/productDetails/${id}`} state={{ product }}>
            {name}
          </NavLink>
        </Heading>
        <p className="product-single-price">
          <span className="product-single-price__new">₹ {price} </span>
        </p>

        {/* <div className="product-single-action">
          <Button size="small" type="white" className="btn-cart" outlined>
            <UilShoppingBag />
            Add To Cart
          </Button>
          <Button size="small" type="primary">
            Buy Now
          </Button>
        </div> */}
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
