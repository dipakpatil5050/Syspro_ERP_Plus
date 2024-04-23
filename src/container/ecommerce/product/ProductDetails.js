import React, { lazy, Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main } from '../../styled';
import { ProductDetailsWrapper } from '../Style';
import { Cards } from '../../../components/cards/frame/cards-frame';

const DetailsRight = lazy(() => import('./overview/DetailsRight'));

// code changes from here

function ProductDetails() {
  const { id } = useParams();

  const productsData = useSelector((state) => {
    return state.auth.catalogueData?.find((product) => product.Item_Id === parseInt(id));
  });

  const products = productsData?.products;

  const productImage = products?.Gallary[0]?.Filepath;

  const [selectedImage, setSelectedImage] = useState(productImage);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleHover = (imagePath, index) => {
    setSelectedImage(imagePath);
    setActiveImageIndex(index);
  };

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
                  <div className="product-details-box__left pdbl">
                    <figure>
                      <img
                        src={`http://103.67.238.230:1386/${selectedImage}`}
                        alt="No preview"
                        style={{ width: '100%', height: '400px' }}
                      />
                    </figure>

                    <div className="pdbl__slider pdbs">
                      <Row gutter={5}>
                        <Col md={4}>
                          <div className="pdbl__image pdbs" style={{ display: 'flex' }}>
                            {products?.Gallary?.map((value, index) => {
                              const borderStyle = index === activeImageIndex ? '2px solid #5840ff' : 'none';
                              return (
                                <figure
                                  key={index}
                                  style={{
                                    cursor: 'pointer',
                                    margin: '5px',
                                    border: borderStyle,
                                    borderRadius: '10px',
                                  }}
                                  onMouseEnter={() => handleHover(value?.Filepath, index)}
                                  onMouseLeave={() =>
                                    setActiveImageIndex(
                                      selectedImage.split('/').pop() === value?.Filepath.split('/').pop()
                                        ? activeImageIndex
                                        : 0,
                                    )
                                  }
                                >
                                  <img
                                    src={`http://103.67.238.230:1386/${value?.Filepath}`}
                                    alt={products.Item_Name}
                                    style={{ width: '100px', height: '100%' }}
                                  />
                                </figure>
                              );
                            })}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col xs={24} lg={14}>
                  <Suspense
                    fallback={
                      <Cards headless>
                        <Skeleton active />
                      </Cards>
                    }
                  >
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
