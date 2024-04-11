import React, { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main } from '../../styled';
import { ProductDetailsWrapper } from '../Style';
import { Cards } from '../../../components/cards/frame/cards-frame';

const DetailsRight = lazy(() => import('./overview/DetailsRight'));

function ProductDetails() {
  // Get the product ID from the URL params
  const { id } = useParams();

  // const { catalogueData } = useSelector((state) => state.auth);

  const products = useSelector((state) => {
    return state.auth.catalogueData.find((product) => product.Item_Id === parseInt(id));
  });

  const PageRoutes = [
    {
      path: '/admin/ecommerce/products/grid',
      breadcrumbName: 'Catalogue',
    },
    {
      path: '',
      breadcrumbName: 'Product Details',
    },
  ];
  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Product Details" routes={PageRoutes} />
      <Main>
        <Cards headless>
          {/* Close Button  */}
          {/* <Col align="right">
            <Button>Close</Button>
          </Col> */}

          <ProductDetailsWrapper>
            <div className="product-details-box">
              <Row gutter={30}>
                <Col xs={24} lg={10}>
                  <figure>
                    <img
                      src={`http://103.67.238.230:1386/${products.Gallary[0]?.Filepath}`}
                      alt={products.Item_Name}
                      style={{ width: '100%' }}
                    />
                  </figure>
                </Col>
                <Col xs={24} lg={14}>
                  <Suspense
                    fallback={
                      <Cards headless>
                        <Skeleton active />
                      </Cards>
                    }
                  >
                    {/* Pass product data as prop to DetailsRight component */}
                    <DetailsRight product={products} />
                  </Suspense>
                </Col>
              </Row>
            </div>
          </ProductDetailsWrapper>
        </Cards>
      </Main>
    </>
  );
}

export default ProductDetails;
