import React, { useState, useEffect, useCallback } from 'react';
// import UilShareAlt from '@iconscout/react-unicons/icons/uil-share-alt';
// import { IoShareSocialOutline } from 'react-icons/io5';
import { Pointer, Share2 } from 'lucide-react';
import UilShoppingBag from '@iconscout/react-unicons/icons/uil-shopping-bag';
// import UilCheckCircle from '@iconscout/react-unicons/icons/uil-check-circle';
import { Col, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
// import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Heading from '../../../../components/heading/heading';
import { Button } from '../../../../components/buttons/buttons';
import { ProductCard } from '../../Style';
import { addToCart, getCartItem } from '../../../../Actions/Catalogue/CartAction';

// import { selectItem, setLoading } from '../../../../redux/reducers/authReducer';
import { selectItem } from '../../../../redux/reducers/authReducer';

function ProductCards({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartId = useSelector((state) => state.cart.cartId);

  // const { paramId } = useParams();

  // const selectedItems = useSelector((state) => state.auth.selectedItems);

  const [imageError, setImageError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { Item_Id: id, Item_Name: name, SalePrice1: price, Gallary: gallery } = product;

  const docsIds = gallery[0].Document_Id;

  // console.log('Products IDs : ', id);

  // const selectedItemsCount = useSelector((state) => state.auth.selectedItems.length);

  // const catalogueData = useSelector((state) => state.auth.catalogueData);

  const handleImageError = () => {
    setImageError(true);
  };

  // localStorage functionality for Selected Card Items
  // useEffect(() => {
  //   const selectedItemsFromStorage = JSON.parse(localStorage.getItem('selectedItems')) || [];
  //   setIsChecked(selectedItemsFromStorage.includes(product.Item_Id));
  // }, [product.Item_Id]);

  // const handleCheckboxChange = (event) => {
  //   setIsChecked(event.target.checked);
  //   dispatch(selectItem({ itemId: product.Item_Id, isChecked: event.target.checked }));
  // };

  /* eslint-disable-next-line no-unsafe-optional-chaining */
  const productImage = !imageError && gallery?.length > 0 ? gallery[0]?.Filepath : null;
  const defaultImage = 'https://dummyimage.com/600x400/ffffff/000000.png&text=No+Preview';

  // purple Color Code: #8231d3.

  // const [isModalVisible, setIsModalVisible] = useState(false);

  // const showModal = () => {
  //   setIsModalVisible(true);
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  // const handleProductDetail = () => {
  //   Modal.confirm({
  //     title: 'Confirm Delete',
  //     content: `Are you sure you want to remove this item from the cart?`,
  //     okText: 'Yes',
  //     cancelText: 'Cancel',
  //     centered: true,
  //   });
  // };

  const handleProductClick = (itemid) => {
    window.open(`/admin/ecommerce/productDetails/${itemid}`, '_blank');
  };

  function capitalizeFirstLetter(str) {
    return str?.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  const addToCartFromGrid = () => {
    dispatch(addToCart(id, docsIds));
    dispatch(getCartItem(cartId));
  };

  return (
    <>
      <ProductCard
        style={{
          marginBottom: 30,
          border: isChecked ? '2px solid #007bff' : 'none',
          boxShadow: '0px 3px 2px rgba(0, 0, 0, 0.24)',
          cursor: 'pointer',
        }}
        // ref={product.Item_Id}
      >
        <label htmlFor={`checkbox-${id}`}>
          {/* <Checkbox
            id={`checkbox-${id}`}
            checked={isChecked}
            // onChange={handleCheckboxChange}
            style={{ position: 'absolute', top: 10, left: 10 }}
          /> */}
          <figure onClick={() => handleProductClick(product.Item_Id)}>
            {/* here multiple item images will be shown with Slider */}
            {/* maxWidth: '100%', aspectRatio: 'auto' */}
            <img
              src={productImage || defaultImage}
              alt={name}
              height={300}
              onError={handleImageError}
              style={{
                borderRadius: '9px',
                cursor: 'pointer',
                maxWidth: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
              }}
            />
          </figure>
        </label>
        <figcaption>
          <Heading className="product-single-title" as="h5">
            <Link onClick={() => handleProductClick(id)}>{name}</Link>
          </Heading>
          <p className="product-single-price" style={{ marginTop: '7px' }}>
            <span className="product-single-price__new">₹ {price} </span>
          </p>
          <div className="" style={{ textAlign: 'end', position: 'absolute', bottom: 36, right: 16 }}>
            <Button size="small" type="primary" onClick={addToCartFromGrid}>
              <UilShoppingBag />
              Add To Cart
            </Button>
          </div>
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
