import React, { useState } from 'react';
import { Row, Col, Spin, Button } from 'antd';
import { useSelector } from 'react-redux';
import { UilTopArrowFromTop } from '@iconscout/react-unicons';
import ProductCardsList from './ProductCardList';
import Heading from '../../../../components/heading/heading';

function List() {
  const { catalogueData, loading } = useSelector((state) => state.auth);

  const [visible, setVisible] = useState(10);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 10);
  };

  const onTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // const areMoreItemsAvailable = visible < catalogueData.length;

  if (loading) {
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
      <Col xs={24} className="pb-30">
        <Col xs={24} className="pb-30" align="end">
          <Button onClick={showMoreItems} type="primary">
            Show More ...
          </Button>
        </Col>

        {/* Top Button  */}
        <Col xs={24} className="pb-30" align="end">
          <Button xs={24} type="dashed" onClick={onTop} shape="circle">
            <UilTopArrowFromTop />
            <span style={{ fontSize: '12px', display: 'flex' }}>Back to Top</span>
          </Button>
        </Col>
      </Col>
    </Row>
  );
}

export default List;
