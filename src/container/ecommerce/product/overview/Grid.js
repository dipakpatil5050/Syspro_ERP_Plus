import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Spin, Button } from 'antd';
// import UilTopArrowFromTop from '@iconscout/react-unicons/icons/uil-apps';
import { UilTopArrowFromTop } from '@iconscout/react-unicons';
import ProductCards from './ProductCards';
import Heading from '../../../../components/heading/heading';
import { NotFoundWrapper } from '../../Style';

function Grid() {
  const { catalogueData, loading } = useSelector((state) => state.auth);

  // const [state, setState] = useState({
  //   products: catalogueData,
  //   current: 0,
  //   pageSize: 0,
  // });

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

  const areMoreItemsAvailable = visible < catalogueData.length;

  // const { products } = state;

  // useEffect(() => {
  //   if (catalogueData) {
  //     setState({
  //       products: catalogueData,
  //     });
  //   }
  // }, [catalogueData]);

  // const onShowSizeChange = (current, pageSize) => {
  //   setState({ ...state, current, pageSize });
  // };

  // const onHandleChange = (current, pageSize) => {
  //   setState({ ...state, current, pageSize });
  // };

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
    <Row gutter={30}>
      {catalogueData && catalogueData.length ? (
        catalogueData.slice(0, visible).map((product) => (
          <Col xxl={6} lg={12} xs={24} key={product.Item_Id}>
            <ProductCards product={product} />
          </Col>
        ))
      ) : (
        <Col md={24}>
          <NotFoundWrapper>
            <Heading as="h1">Data Not Found</Heading>
          </NotFoundWrapper>
        </Col>
      )}
      {/* Pagination */}

      {/* Show More Button */}

      {areMoreItemsAvailable && (
        <Col xs={24} className="pb-30" align="end">
          <Button onClick={showMoreItems} type="primary">
            Show More ...
          </Button>
        </Col>
      )}

      {/* Top Button  */}
      <Col xs={24} className="pb-30" align="end">
        <Button xs={24} type="dashed" onClick={onTop} shape="circle">
          <UilTopArrowFromTop />
          <span style={{ fontSize: '12px', display: 'flex' }}>Back to Top</span>
        </Button>
      </Col>
    </Row>
  );
}

export default Grid;
