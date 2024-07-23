import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Spin, Pagination } from 'antd';
import { UilArrowUp } from '@iconscout/react-unicons';
import styled from 'styled-components';
import ProductCards from './ProductCards';
import Heading from '../../../../components/heading/heading';
import { NotFoundWrapper } from '../../Style';
import { setOffsetValue } from '../../../../redux/reducers/authReducer';
import { getAllProducts, getCartItem } from '../../../../Actions/Catalogue/CartAction';

const CenteredSpin = styled(Spin)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Grid = React.memo(() => {
  const dispatch = useDispatch();
  const cartId = useSelector((state) => state.cart.cartId);
  const { catalogueData, loading, hasMoreData } = useSelector((state) => state.auth);
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
      <Row gutter={30}>
        {catalogueData &&
          catalogueData.map((product) => (
            <Col xxl={6} lg={12} xs={24} key={product.Item_Id}>
              <ProductCards product={product} />
            </Col>
          ))}
      </Row>

      {/* {loading && <CenteredSpin size="large" />} */}

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
        total={200} // TotalProducts
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
});

export default Grid;
