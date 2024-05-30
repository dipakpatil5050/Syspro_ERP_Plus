import React, { useState, useEffect, useCallback } from 'react';
// import UilShareAlt from '@iconscout/react-unicons/icons/uil-share-alt';
// import { IoShareSocialOutline } from 'react-icons/io5';
import { Pointer, Share2 } from 'lucide-react';
// import UilShoppingBag from '@iconscout/react-unicons/icons/uil-shopping-bag';
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
// import { selectItem, setLoading } from '../../../../redux/reducers/authReducer';
import { selectItem } from '../../../../redux/reducers/authReducer';

function ProductCards({ product }) {
  const filepathprefix = 'http://103.67.238.230:1386/';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { paramId } = useParams();

  // const selectedItems = useSelector((state) => state.auth.selectedItems);

  const [imageError, setImageError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { Item_Id: id, Item_Name: name, SalePrice1: price, Gallary: gallery } = product;

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
  const productImage = !imageError && gallery?.length > 0 ? filepathprefix + gallery[0]?.Filepath : null;
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
        onClick={() => handleProductClick(product.Item_Id)}
      >
        <label htmlFor={`checkbox-${id}`}>
          {/* <Checkbox
            id={`checkbox-${id}`}
            checked={isChecked}
            // onChange={handleCheckboxChange}
            style={{ position: 'absolute', top: 10, left: 10 }}
          /> */}
          <figure>
            <img
              src={productImage || defaultImage}
              alt={name}
              height={200}
              onError={handleImageError}
              style={{ borderRadius: '9px', cursor: 'pointer' }}
            />
          </figure>
        </label>

        {/* {!isChecked && (
          <Col align="right" style={{ position: 'absolute', right: '0', top: '178px' }}>
            <Button className="btn-icon" shape="circle" type="primary" size="large">
              <Share2 style={{ color: 'white' }} />
            </Button>
          </Col>
        )} */}
        <figcaption>
          {/* {isChecked && (
            <Button size="small" type="white" style={{ position: 'absolute', bottom: 35, right: 10 }}>
              Selected &nbsp; <UilCheckCircle />
            </Button>
          )} */}
          <Heading className="product-single-title" as="h5">
            {/* onClick={showModal} */}
            {/* <NavLink to={`/admin/ecommerce/productDetails/${id}`} state={{ product }}>
              {name}
            </NavLink> */}
            {/* onClick={handleProductById(id)} */}

            {/* <b>{name}</b> */}

            {/* to={`/admin/ecommerce/productDetails/${id}`} */}

            {/* <Link to={`/admin/ecommerce/productDetails/${id}`}>{name}</Link> */}

            <Link onClick={() => handleProductClick(id)}>{name}</Link>
            {/* {capitalizeFirstLetter(name) */}
            {/* {name} */}
            {/* <Button onClick={handleProductById}>{name}</Button> */}

            {/* from API */}
            {/* to={`/admin/ecommerce/productDetails/${id}`} */}
            {/* <p onClick={handleProductById(product?.Item_Id)}>{name}</p> */}
            {/* <a target="_blank">{name}</a> */}
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
      {/* <Modal title="Product Detail" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <img src={productImage} alt={name} style={{ maxWidth: '100%', marginBottom: '10px' }} />
        <ul>
          <li>
            <b>Item Name </b>: {name}
          </li>
          <li>
            <b>Item Code </b> : {id}
          </li>
          <li>
            <b>Design No </b>: {designNo}
          </li>
          <li>
            <b>Price </b>: ₹ {price}
          </li>
        </ul>
      </Modal> */}
      {/* {console.log(designNo)} */}
    </>
  );
}

ProductCards.propTypes = {
  product: PropTypes.shape({
    Item_Id: PropTypes.number.isRequired,
    Item_Name: PropTypes.string.isRequired,
    SalePrice1: PropTypes.number.isRequired,
    DesignNo: PropTypes.number.isRequired,
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
