import React, { useState, useEffect } from 'react';
import { Row, Col, Spin, Button, Pagination } from 'antd';
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

  const userData = useSelector((state) => state.auth.userData);
  const AccessValue = userData?.data?.Data?.Access_Value || '';

  const TotalProducts = useSelector((state) => state.auth.catalogueTotalDataCount);

  const [showTopButton, setShowTopButton] = useState(false);
  const [state, setState] = useState({
    currentPage: 1,
    pageSize: 100,
  });

  useEffect(() => {
    dispatch(getCartItem(cartId));
  }, [dispatch, cartId]);

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

  const fetchProducts = (page, size) => {
    dispatch(setOffsetValue(page));
    // dispatch(getAllProducts(AccessValue, page, size));
  };

  useEffect(() => {
    fetchProducts(state.currentPage - 1, state.pageSize);
  }, [dispatch, AccessValue, state.currentPage, state.pageSize]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (state.currentPage >= 0) {
      scrollToTop();
    }
  }, [state.currentPage]);

  const handlePageChange = (page, size) => {
    setState((prevState) => ({
      ...prevState,
      currentPage: page,
      pageSize: size,
    }));
  };

  return (
    <>
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

      {!loading && catalogueData?.length === 0 && (
        <div style={{ position: 'relative', bottom: '10px', right: '20px', zIndex: 1000 }}>
          <NotFoundWrapper>
            <Heading as="h5">No more products to load</Heading>
          </NotFoundWrapper>
        </div>
      )}

      <Pagination
        current={state.currentPage}
        pageSize={state.pageSize}
        showSizeChanger={false}
        total={TotalProducts}
        onChange={handlePageChange}
        style={{ marginTop: 20, textAlign: 'center' }}
        hideOnSinglePage
        responsive
      />

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
