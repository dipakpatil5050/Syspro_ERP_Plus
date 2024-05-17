import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Spin } from 'antd';
import { UilArrowUp } from '@iconscout/react-unicons';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductCards from './ProductCards';
import Heading from '../../../../components/heading/heading';
import { NotFoundWrapper } from '../../Style';
import { setOffsetValue } from '../../../../redux/reducers/authReducer';
// import catalogueService from '../../../../services/catalogueService';
// setLoadedItems

const Grid = React.memo(() => {
  const dispatch = useDispatch();

  const { catalogueData, loading, hasMoreData } = useSelector((state) => state.auth);
  // catalogueTotalDataCount, hasMoreData

  const [showTopButton, setShowTopButton] = useState(false);
  const offsetValue = useSelector((state) => state.auth.offsetValue);

  const totalItems = catalogueData?.length || 0;

  // for debugging purposes
  console.log('total items : ', totalItems);
  console.log('has more data: ', hasMoreData);
  console.log('Offset value Count : ', offsetValue);

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
  // console.log(hasMoreData)

  // useEffect(() => {
  //   catalogueService.getProducts();
  // }, []);

  return (
    <>
      <InfiniteScroll
        dataLength={totalItems}
        next={fetchMoreData}
        hasMore={hasMoreData}
        loader={<Spin style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />}
        style={{ overflow: 'hidden' }}
        endMessage={
          <NotFoundWrapper>{!loading && <Heading as="h5">No more products to load</Heading>}</NotFoundWrapper>
        }
      >
        <Row gutter={30}>
          {catalogueData &&
            catalogueData.map((product) => (
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
});

export default Grid;
