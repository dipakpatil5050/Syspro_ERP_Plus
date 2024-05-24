import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Skeleton, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main } from '../../styled';
import { ProductDetailsWrapper } from '../Style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { setLoading, setSingleProduct } from '../../../redux/reducers/authReducer';

const DetailsRight = lazy(() => import('./overview/DetailsRight'));

// code changes from here

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.auth.singleProduct[0]);
  const loading = useSelector((state) => state.auth.loading);
  const userMpinData = useSelector((state) => state.auth.userMpinData);
  const userData = useSelector((state) => state.auth.userData);

  const ServerBaseUrl = userMpinData?.Data?.ServerBaseUrl;

  const fetchSingleProductDetailById = async (itemId) => {
    const productByIdAPI = `${ServerBaseUrl}api/CommonAPI/GetProductByID?Item_ID=${itemId}`;
    const headers = {
      'Content-Type': 'application/json',
      CompanyID: userData?.Data?.CompanyID,
      YearMasterID: userData?.Data?.YearMasterID,
      PremiseID: userData?.Data?.PremiseID,
      DepartmentID: userData?.Data?.DepartmentID,
      UserID: userData?.Data?.UserID,
      client: userMpinData?.Data?.SlugUrl,
      'x-api-key': userMpinData?.Data?.mPin,
    };
    try {
      dispatch(setLoading(true));
      const response = await axios.get(productByIdAPI, { headers });
      dispatch(setSingleProduct(response.data?.Data?.products));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchSingleProductDetailById(id);
  }, [id]);

  // const productdata = products1;
  // const products = useSelector((state) => state.auth.singleProduct);

  // const products = productdata?.find((product) => product.Item_Id === parseInt(id));
  // products?.Gallary[0]?.Filepath
  const productImage = products?.Gallary[0]?.Filepath;
  // const productImage = products?.Gallary?.length > 0 ? products.Gallary[0]?.Filepath : '';

  // const [selectedImage, setSelectedImage] = useState(productImage);
  // const [activeImageIndex, setActiveImageIndex] = useState(0);

  // const handleHover = (imagePath, index) => {
  //   setSelectedImage(imagePath);
  //   setActiveImageIndex(index);
  // };

  // requirement :  1. want to open Product Detail page on New tab when click on Product name on ProductCards
  // 2. if possible call the getProductDetailsById API on productdetails page after click on Product name
  // 3.

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
          {loading ? (
            <>
              <Spin
                style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  zIndex: 99999,
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  padding: '10px',
                }}
              />
            </>
          ) : (
            <ProductDetailsWrapper>
              <div className="product-details-box">
                <Row gutter={30}>
                  <Suspense
                    fallback={
                      <Cards headless>
                        <Skeleton active />
                      </Cards>
                    }
                  >
                    <Col xs={24} lg={10}>
                      <div className="product-details-box__left pdbl">
                        <figure>
                          <img
                            src={`http://103.67.238.230:1386/${productImage}`}
                            alt="No preview"
                            style={{ width: '100%', height: '400px' }}
                          />
                        </figure>
                        <div className="pdbl__slider pdbs">
                          <Row gutter={5}>
                            <Col md={4}>
                              <div className="pdbl__image pdbs" style={{ display: 'flex' }}>
                                {products?.Gallary?.map((value, index) => {
                                  /* const borderStyle = index === activeImageIndex ? '2px solid #5840ff' : 'none'; */

                                  return (
                                    <figure
                                      key={index}
                                      style={{
                                        cursor: 'pointer',
                                        margin: '5px',
                                        // border: borderStyle,
                                        borderRadius: '10px',
                                      }}
                                      // onMouseEnter={() => handleHover(value?.Filepath, index)}
                                      // onMouseLeave={() =>
                                      //   setActiveImageIndex(
                                      //     selectedImage.split('/').pop() === value?.Filepath.split('/').pop()
                                      //       ? activeImageIndex
                                      //       : 0,
                                      //   )
                                      // }
                                    >
                                      <img
                                        src={`http://103.67.238.230:1386/${value?.Filepath}`}
                                        alt={products?.Item_Name}
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
                  </Suspense>

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
          )}
        </Cards>
      </Main>
    </>
  );
}

export default ProductDetails;
