import React, { useState, useEffect } from 'react';
import { Row, Col, Spin, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { UilArrowUp } from '@iconscout/react-unicons';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductCardsList from './ProductCardList';
import Heading from '../../../../components/heading/heading';
import { NotFoundWrapper } from '../../Style';
import { setLoadedItems } from '../../../../redux/reducers/authReducer';

function List() {
  const dispatch = useDispatch();

  const { catalogueData, loading, loadedItems } = useSelector((state) => state.auth);

  const [visible, setVisible] = useState(loadedItems || 50);
  const [showTopButton, setShowTopButton] = useState(false);

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

  useEffect(() => {
    localStorage.setItem('loadedItems', visible);
    dispatch(setLoadedItems(visible));
  }, [visible, dispatch]);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 10);
  };

  const fetchMoreData = () => {
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
        next={fetchMoreData}
        hasMore={visible < catalogueData?.length}
        loader={<Spin style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />}
        style={{ overflow: 'hidden' }}
        endMessage={
          <NotFoundWrapper>
            {loading && (
              <div className="spin">
                <Spin />
              </div>
            )}
            <Heading as="h1">No more products to load</Heading>
          </NotFoundWrapper>
        }
      >
        <Row gutter={15}>
          {catalogueData && catalogueData.length ? (
            catalogueData.slice(0, visible).map((product) => {
              return (
                <Col xs={24} key={product.Item_Id}>
                  <ProductCardsList product={product} />
                </Col>
              );
            })
          ) : (
            <Col xs={24}>
              <Heading as="h1">Data Not Found</Heading>
            </Col>
          )}
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

export default List;
