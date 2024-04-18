import React, { useState, useEffect } from 'react';
// import UilShareAlt from '@iconscout/react-unicons/icons/uil-share-alt';
// import { IoShareSocialOutline } from 'react-icons/io5';
import { Share2 } from 'lucide-react';
// import UilShoppingBag from '@iconscout/react-unicons/icons/uil-shopping-bag';
// import UilCheckCircle from '@iconscout/react-unicons/icons/uil-check-circle';
import { Col, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Heading from '../../../../components/heading/heading';
import { Button } from '../../../../components/buttons/buttons';
import { ProductCard } from '../../Style';
import { selectItem } from '../../../../redux/reducers/authReducer';

function ProductCards({ product }) {
  const filepathprefix = 'http://103.67.238.230:1386/';
  const dispatch = useDispatch();

  const [imageError, setImageError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { Item_Id: id, Item_Name: name, SalePrice1: price, Gallary: gallery } = product;

  // const selectedItemsCount = useSelector((state) => state.auth.selectedItems.length);

  const handleImageError = () => {
    setImageError(true);
  };

  // localStorage functionality for  Selected Card Items
  useEffect(() => {
    const selectedItemsFromStorage = JSON.parse(localStorage.getItem('selectedItems')) || [];
    setIsChecked(selectedItemsFromStorage.includes(product.Item_Id));
  }, [product.Item_Id]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    dispatch(selectItem({ itemId: product.Item_Id, isChecked: event.target.checked }));
  };

  /* eslint-disable-next-line no-unsafe-optional-chaining */
  const productImage = !imageError && gallery?.length > 0 ? filepathprefix + gallery[0]?.Filepath : null;
  const defaultImage = 'https://dummyimage.com/600x400/ffffff/000000.png&text=No+Preview';

  // purple Color Code: #8231d3.

  return (
    <>
      {/* <div>Selected Items: {selectedItemsCount}</div> */}
      <ProductCard
        style={{
          marginBottom: 30,
          border: isChecked ? '2px solid #007bff' : 'none',
          boxShadow: '0px 3px 2px rgba(0, 0, 0, 0.24)',
        }}
      >
        <label htmlFor={`checkbox-${id}`}>
          <Checkbox
            id={`checkbox-${id}`}
            checked={isChecked}
            onChange={handleCheckboxChange}
            style={{ position: 'absolute', top: 10, left: 10 }}
          />
          <figure>
            <img
              src={productImage || defaultImage}
              alt={name}
              height={200}
              onError={handleImageError}
              style={{ borderRadius: '9px' }}
            />
          </figure>
        </label>
        {/* width={290} height={200} */}

        {!isChecked && (
          <Col align="right" style={{ position: 'absolute', right: '0', top: '178px' }}>
            <Button className="btn-icon" shape="circle" type="primary" size="large">
              <Share2 style={{ color: 'white' }} />
            </Button>
          </Col>
        )}
        <figcaption>
          {/* {isChecked && (
            <Button size="small" type="white" style={{ position: 'absolute', bottom: 35, right: 10 }}>
              Selected &nbsp; <UilCheckCircle />
            </Button>
          )} */}
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
    </>
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
