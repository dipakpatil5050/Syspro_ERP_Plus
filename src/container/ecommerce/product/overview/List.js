import React, { useState, useEffect } from 'react';
import { Row, Col, Spin, Button } from 'antd';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { UilArrowUp } from '@iconscout/react-unicons';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductCardsList from './ProductCardList';
import Heading from '../../../../components/heading/heading';
import { NotFoundWrapper } from '../../Style';
import { setOffsetValue } from '../../../../redux/reducers/authReducer';
import { getCartItem } from '../../../../Actions/Catalogue/CartAction';

function List() {
  const dispatch = useDispatch();
  const cartId = useSelector((state) => state.cart.cartId);
  const { catalogueData, loading, offsetValue, hasMoreData } = useSelector((state) => state.auth);

  const [showTopButton, setShowTopButton] = useState(false);

  const totalItems = catalogueData?.length || 0;

  useEffect(() => {
    dispatch(getCartItem(cartId));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fetchMoreData = () => {
    dispatch(setOffsetValue(offsetValue + 1));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <InfiniteScroll
        dataLength={totalItems}
        next={fetchMoreData}
        hasMore={hasMoreData}
        loader={<Spin style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />}
        style={{ overflow: 'hidden' }}
        endMessage={
          <NotFoundWrapper>
            {!loading && (
              // (
              //   <div className="spin">
              //     <Spin />
              //   </div>
              // )
              <Heading as="h1">No more products to load</Heading>
            )}
          </NotFoundWrapper>
        }
      >
        <Row gutter={15}>
          {catalogueData &&
            catalogueData.map((product) => {
              return (
                <Col xs={24} key={product.Item_Id}>
                  <ProductCardsList product={product} />
                </Col>
              );
            })}
        </Row>
      </InfiniteScroll>
      {showTopButton && (
        <Button
          type="primary"
          shape="circle"
          icon={<UilArrowUp />}
          size="large"
          style={{ position: 'fixed', bottom: '67px', right: '20px', zIndex: 1000 }}
          onClick={scrollToTop}
        />
      )}
    </>
  );
}

List.propTypes = {
  filters: PropTypes.shape({
    group: PropTypes.string,
    subGroup: PropTypes.string,
    category: PropTypes.string,
  }),
};

export default List;
