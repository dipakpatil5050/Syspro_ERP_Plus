import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Spin, Button } from 'antd';
import { UilArrowUp } from '@iconscout/react-unicons';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductCards from './ProductCards';
import Heading from '../../../../components/heading/heading';
import { NotFoundWrapper } from '../../Style';

function Grid() {
  const { catalogueData, loading } = useSelector((state) => state.auth);
  // loading

  const [visible, setVisible] = useState(50);
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

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 10);
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      showMoreItems();
    }, 1500); // Simulated delay for fetching more data
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (loading && visible === 50) {
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
    <div>
      <InfiniteScroll
        dataLength={visible}
        next={fetchMoreData}
        hasMore={visible < catalogueData?.length}
        loader={<Spin style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />}
        style={{ overflow: 'hidden' }}
        endMessage={
          <NotFoundWrapper>
            <Heading as="h1">No more products to load</Heading>
          </NotFoundWrapper>
        }
      >
        <Row gutter={30}>
          {catalogueData &&
            catalogueData.slice(0, visible).map((product) => (
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
    </div>
  );
}

export default Grid;
