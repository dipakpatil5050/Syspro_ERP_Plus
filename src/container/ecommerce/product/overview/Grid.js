import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Spin, Button } from 'antd';
import PropTypes from 'prop-types';
import { UilArrowUp } from '@iconscout/react-unicons';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductCards from './ProductCards';
import Heading from '../../../../components/heading/heading';
import { NotFoundWrapper } from '../../Style';
import { setLoadedItems } from '../../../../redux/reducers/authReducer';

function Grid({ filters }) {
  const dispatch = useDispatch();

  const { catalogueData, loading, loadedItems } = useSelector((state) => state.auth);

  const [visible, setVisible] = useState(loadedItems || 50);
  const [showTopButton, setShowTopButton] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const productsData = catalogueData?.products;
  const filterData = catalogueData?.filters;
  console.log(filterData);

  useEffect(() => {
    if (filters && filters.group) {
      const filtered = productsData?.filter((product) => product.Group_Name === filters.group);
      setFilteredData(filtered);
    } else {
      setFilteredData(productsData);
    }
  }, [productsData, filters]);

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

  const filteredProducts = productsData?.filter((product) => {
    if (filters.group && product.Group_Name !== filters.group) return false;
    if (filters.subGroup && product.SubGroup_Name !== filters.subGroup) return false;
    if (filters.category && product.Cat_Name !== filters.category) return false;
    return true;
  });

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
        hasMore={visible < filteredProducts?.length}
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
        <Row gutter={30}>
          {filteredData &&
            filteredData.slice(0, visible).map((product) => (
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

Grid.propTypes = {
  filters: PropTypes.shape({
    group: PropTypes.string,
    subGroup: PropTypes.string,
    category: PropTypes.string,
  }),
};
export default Grid;
