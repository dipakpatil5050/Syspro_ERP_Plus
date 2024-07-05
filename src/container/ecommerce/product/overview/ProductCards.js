import React, { useState, useEffect, useCallback } from 'react';
// import UilShareAlt from '@iconscout/react-unicons/icons/uil-share-alt';
// import { IoShareSocialOutline } from 'react-icons/io5';
import { Pointer, Share2 } from 'lucide-react';
import UilShoppingBag from '@iconscout/react-unicons/icons/uil-shopping-bag';
// import UilCheckCircle from '@iconscout/react-unicons/icons/uil-check-circle';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Col, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
// import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import useMobileView from '../useMobileView';
import Heading from '../../../../components/heading/heading';
import { Button } from '../../../../components/buttons/buttons';
import { ProductCard } from '../../Style';
import { addToCart, getCartItem } from '../../../../Actions/Catalogue/CartAction';

function ProductCards({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMobileView();

  const cartId = useSelector((state) => state.cart.cartId);

  const [imageError, setImageError] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { Item_Id: id, Item_Name: name, SalePrice1: price, Gallary: gallery } = product;

  const handleImageError = () => {
    setImageError(true);
  };

  /* eslint-disable-next-line no-unsafe-optional-chaining */
  const productImage = !imageError && gallery?.length > 0 ? gallery[0]?.Filepath : null;

  const defaultImage = 'https://dummyimage.com/600x400/ffffff/000000.png&text=No+Preview';

  const handleProductClick = (itemid) => {
    window.open(`/admin/ecommerce/productDetails/${itemid}`, '_blank');
  };

  function capitalizeFirstLetter(str) {
    return str?.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  const addToCartFromGrid = () => {
    const activeImage = gallery[activeImageIndex];
    const docsIds = activeImage?.Document_Id;

    if (docsIds) {
      dispatch(addToCart(id, docsIds));
      dispatch(getCartItem(cartId));
    }
    setActiveImageIndex(0);
  };

  return (
    <>
      <ProductCard
        style={{
          marginBottom: 30,
          // border: isChecked ? '2px solid #007bff' : 'none',
          boxShadow: '0px 3px 2px rgba(0, 0, 0, 0.24)',
          cursor: 'pointer',
        }}
      >
        <label htmlFor={`checkbox-${id}`}>
          <figure>
            {/* onClick={() => handleProductClick(product.Item_Id)} */}

            <Carousel showThumbs={false} showStatus={false} swipeable onChange={(index) => setActiveImageIndex(index)}>
              {gallery.map((image, index) => (
                <img
                  key={index}
                  src={image.Filepath || defaultImage}
                  alt={name}
                  height={300}
                  // onError={handleImageError}
                  onError={(e) => {
                    e.target.src = 'https://dummyimage.com/600x400/ffffff/000000.png&text=No+Preview';
                  }}
                  style={{
                    borderRadius: '9px',
                    cursor: 'pointer',
                    // maxWidth: '100%',
                    // objectFit: 'cover', //  take the size of container can crop top and bottom and fit to screen
                    objectFit: 'contain', // add white space for extra imagec area
                    objectPosition: 'center center',
                  }}
                />
              ))}
            </Carousel>
          </figure>
        </label>
        <figcaption>
          <Heading className="product-single-title" as="h5">
            <Link to={`/admin/ecommerce/productDetails/${id}`}>{name}</Link>
          </Heading>

          <p className="product-single-price">
            <span className="product-single-price__new">₹ {price} </span>
          </p>
          {isMobile ? (
            <div className="" style={{ textAlign: 'end', position: 'absolute', bottom: 36, right: 16 }}>
              <Button size="small" type="primary" onClick={addToCartFromGrid}>
                <UilShoppingBag />
                Add To Cart
              </Button>
            </div>
          ) : (
            <div className="product-single-action">
              <Button size="small" type="primary" onClick={addToCartFromGrid}>
                <UilShoppingBag />
                Add To Cart
              </Button>
            </div>
          )}
        </figcaption>
      </ProductCard>
    </>
  );
}

ProductCards.propTypes = {
  product: PropTypes.shape({
    Item_Id: PropTypes.number.isRequired,
    Item_Name: PropTypes.string.isRequired,
    SalePrice1: PropTypes.number.isRequired,
    DesignNo: PropTypes.number.isRequired,
    Document_Id: PropTypes.number.isRequired,
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
