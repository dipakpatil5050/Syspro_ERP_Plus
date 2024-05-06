import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Spin, Button } from 'antd';
import { UilArrowUp } from '@iconscout/react-unicons';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductCards from './ProductCards';
import Heading from '../../../../components/heading/heading';
import { NotFoundWrapper } from '../../Style';
import { setLoadedItems, setPageSize } from '../../../../redux/reducers/authReducer';

function Grid() {
  const dispatch = useDispatch();

  const { catalogueData, loading } = useSelector((state) => state.auth);
  // , loadedItems
  const [visible, setVisible] = useState(50); // loadedItems
  const [showTopButton, setShowTopButton] = useState(false);

  const productsData = catalogueData?.products;

  const totalItems = productsData?.length || 0;

  useEffect(() => {
    if (totalItems === visible) {
      dispatch(setPageSize(visible + 100)); // Increment page size by 100
    }
  }, [visible, totalItems, dispatch]);

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

  // localStorage.setItem('loadedItems', visible);

  useEffect(() => {
    dispatch(setLoadedItems(visible));
  }, [visible, dispatch]);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 10);
  };

  const loadMoreData = () => {
    setTimeout(() => {
      showMoreItems();
    }, 1500);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (loading && visible === 10) {
    return (
      <Row gutter={30}>
        <Col xs={24}>
          <div className="spin">
            <Spin />
          </div>
        </Col>
      </Row>
    );
  }

  return (
    <>
      <InfiniteScroll
        dataLength={visible}
        next={loadMoreData}
        hasMore={visible < productsData?.length}
        loader={<Spin style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />}
        style={{ overflow: 'hidden' }}
        endMessage={
          <NotFoundWrapper>
            {/* {loading && (
              <div className="spin">
                <Spin />
              </div>
            )} */}
            {!loading && <Heading as="h5">No more products to load</Heading>}
          </NotFoundWrapper>
        }
      >
        <Row gutter={30}>
          {productsData &&
            productsData.slice(0, visible).map((product) => (
              <Col xxl={6} lg={12} xs={24} key={product.Item_Id}>
                <ProductCards product={product} />
              </Col>
            ))}
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

export default Grid;
