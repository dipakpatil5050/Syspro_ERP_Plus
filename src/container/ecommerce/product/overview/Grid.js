import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Spin, Pagination } from 'antd';
import ProductCards from './ProductCards';
import Heading from '../../../../components/heading/heading';
import { PaginationWrapper, NotFoundWrapper } from '../../Style';

function Grid() {
  const { catalogueData, loading } = useSelector((state) => state.auth);

  const [state, setState] = useState({
    products: catalogueData,
    current: 0,
    pageSize: 0,
  });

  const { products } = state;

  useEffect(() => {
    if (catalogueData) {
      setState({
        products: catalogueData,
      });
    }
  }, [catalogueData]);

  const onShowSizeChange = (current, pageSize) => {
    setState({ ...state, current, pageSize });
  };

  const onHandleChange = (current, pageSize) => {
    setState({ ...state, current, pageSize });
  };

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
        catalogueData.map((product) => (
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
      <Col xs={24} className="pb-30">
        <PaginationWrapper style={{ marginTop: 10 }}>
          {products && products.length ? (
            <Pagination
              onChange={onHandleChange}
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              pageSize={5}
              defaultCurrent={1}
              total={40}
            />
          ) : null}
        </PaginationWrapper>
      </Col>
    </Row>
  );
}

export default Grid;
