// import UilHdd from '@iconscout/react-unicons/icons/uil-hdd';
// import UilUpload from '@iconscout/react-unicons/icons/uil-upload';
import UilShoppingCart from '@iconscout/react-unicons/icons/uil-shopping-cart';
import { Badge } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Scrollbars } from '@pezhmanparsaee/react-custom-scrollbars';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { ReactSVG } from 'react-svg';
import { useSelector } from 'react-redux';
import { UserActionDropDown } from './auth-info-style';
import Heading from '../../heading/heading';
import { Popover } from '../../popup/popup';

const ShoppingCart = React.memo(() => {
  const rtl = false;
  // const { rtl } = useSelector((state) => {
  //   return {
  //     rtl: state.ChangeLayoutMode.rtlData,
  //   };
  // });

  const selectedItems = useSelector((state) => state.auth.selectedItems);
  const catalogueData = useSelector((state) => state.auth.catalogueData);

  function renderThumb({ style }) {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: '#F1F2F6',
    };
    return <div style={{ ...style, ...thumbStyle }} />;
  }

  const renderTrackVertical = () => {
    const thumbStyle = {
      position: 'absolute',
      width: '6px',
      transition: 'opacity 200ms ease 0s',
      opacity: 0,
      [rtl ? 'left' : 'right']: '2px',
      bottom: '2px',
      top: '2px',
      borderRadius: '3px',
    };
    return <div className="hello" style={thumbStyle} />;
  };

  function renderView({ style }) {
    const customStyle = {
      marginRight: rtl && 'auto',
      [rtl ? 'marginLeft' : 'marginRight']: '-17px',
    };
    return <div style={{ ...style, ...customStyle }} />;
  }

  renderThumb.propTypes = {
    style: PropTypes.shape(PropTypes.object),
  };

  renderView.propTypes = {
    style: PropTypes.shape(PropTypes.object),
  };

  const content = (
    <UserActionDropDown className="ninjadash-top-dropdown">
      <Heading as="h5" className="ninjadash-top-dropdown__title">
        <span className="title-text">Product Cart</span>
        <Badge className="badge-success" count={selectedItems.length} />
      </Heading>
      {selectedItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is currently empty.</p>
      ) : (
        <Scrollbars
          autoHeight
          autoHide
          renderThumbVertical={renderThumb}
          renderView={renderView}
          renderTrackVertical={renderTrackVertical}
          renderTrackHorizontal={(props) => <div {...props} style={{ display: 'none' }} className="track-horizontal" />}
        >
          <ul className="ninjadash-top-dropdown__nav selected-items-list">
            {selectedItems.map((itemId) => {
              const product = catalogueData?.find((item) => item.Item_Id === itemId);

              if (!product) {
                return <li key={itemId}>Product not found (ID: {itemId})</li>;
              }

              const filepathprefix = 'http://103.67.238.230:1386/';
              /* eslint-disable-next-line no-unsafe-optional-chaining */
              const productImage = filepathprefix + product?.Gallary[0]?.Filepath;

              return (
                <li key={product.Item_Id}>
                  <div className="ninjadash-top-dropdown__content notifications">
                    <div className="notification-icon ">
                      {/* <UilHdd /> */}
                      <img
                        src={productImage}
                        alt="no preview"
                        style={{ borderRadius: '100%', marginTop: '10px', width: '40px', height: '40px' }}
                      />
                    </div>

                    <div className="notification-content d-flex">
                      <div className="notification-text">
                        <Heading as="h5">
                          <span>{product.Item_Name}</span> added to Cart
                        </Heading>
                        <p>₹{product.SalePrice1}</p>
                      </div>
                      {/* <div className="notification-status">
                        <Badge dot />
                      </div> */}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Scrollbars>
      )}
      <Link className="btn-seeAll" to="/admin/ecommerce/cart">
        See all Catalogue Items sharing Details
      </Link>
    </UserActionDropDown>
  );

  return (
    <div className="ninjadash-nav-actions__item ninjadash-nav-actions__notification">
      <Popover placement="bottomLeft" content={content} action="hover">
        <Badge style={{ display: 'flex' }} className="badge-success" count={selectedItems.length} offset={[-6, -3]}>
          <Link to="#" className="ninjadash-nav-action-link">
            <UilShoppingCart />
          </Link>
        </Badge>
      </Popover>
    </div>
  );
});

export default ShoppingCart;
