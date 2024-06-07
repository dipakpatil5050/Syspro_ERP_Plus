import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Skeleton, Spin, Checkbox, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Scrollbars } from '@pezhmanparsaee/react-custom-scrollbars';
import {
  Magnifier,
  // GlassMagnifier,
  SideBySideMagnifier,
  // PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
} from '@datobs/react-image-magnifiers';

import UilShoppingBag from '@iconscout/react-unicons/icons/uil-shopping-bag';
import useMobileView from './useMobileView';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main } from '../../styled';
import { ProductCard, ProductDetailsWrapper } from '../Style';
import { Cards } from '../../../components/cards/frame/cards-frame';

// import { setLoading, setSingleProduct } from '../../../redux/reducers/authReducer';

import { fetchSingleProductDetailById, addToCart, getCartItem } from '../../../Actions/Catalogue/CartAction';

// import useDocumentTitle from '../../../components/dynamic-Page-Title/useDocumentTitle';

const DetailsRight = lazy(() => import('./overview/DetailsRight'));

function ProductDetails() {
  // useDocumentTitle('Product Details');
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [checkedImages, setCheckedImages] = useState({});
  // const [isMagnifierVisible, setIsMagnifierVisible] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.auth.singleProduct[0]);
  const loading = useSelector((state) => state.auth.loading);
  const cartId = useSelector((state) => state.cart.cartId);
  const isMobile = useMobileView();

  // const handleMouseEnter = () => {
  //   setIsMagnifierVisible(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsMagnifierVisible(false);
  // };

  const defaultImage = 'https://dummyimage.com/600x400/ffffff/000000.png&text=No+Preview';

  useEffect(() => {
    dispatch(fetchSingleProductDetailById(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getCartItem(cartId));
  }, [dispatch, cartId]);

  useEffect(() => {
    if (products?.Gallary?.length > 0) {
      setSelectedImage(products.Gallary[0].Filepath);
      setSelectedDocId(products.Gallary[0].Document_Id);
    }
  }, [products]);

  const handleImageClick = (filepath, docId) => {
    setSelectedImage(filepath);
    setSelectedDocId(docId);
  };

  const handleCheckboxChange = (docId, isChecked) => {
    setCheckedImages((prevState) => ({
      ...prevState,
      [docId]: isChecked,
    }));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(products.Item_Id, selectedDocId));
    dispatch(getCartItem(cartId));
  };

  // const productImage = selectedImage ? selectedImage : '';

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
                          {isMobile ? (
                            <>
                              <Magnifier
                                src={selectedImage}
                                alt="No preview"
                                onError={(e) => {
                                  e.target.src = 'https://dummyimage.com/600x400/ffffff/000000.png&text=No+Preview';
                                }}
                                activation={TOUCH_ACTIVATION}
                              />
                              <img
                                src={selectedImage}
                                alt="No preview"
                                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                                onError={(e) => {
                                  e.target.src = 'https://dummyimage.com/600x400/ffffff/000000.png&text=No+Preview';
                                }}
                              />
                            </>
                          ) : (
                            <SideBySideMagnifier
                              imageSrc={selectedImage}
                              imageAlt="No preview"
                              largeImageSrc={selectedImage}
                              onError={(e) => {
                                e.target.src = 'https://dummyimage.com/600x400/ffffff/000000.png&text=No+Preview';
                              }}
                            />
                          )}
                        </figure>
                        <div className="pdbl__slider pdbs">
                          <Row gutter={5}>
                            <Col md={4}>
                              {/* <Scrollbars> */}
                              <div
                                className="pdbl__image pdbs"
                                style={{
                                  display: 'flex',
                                  flexDirection: 'flexwrap',
                                  overflow: 'auto',
                                  width: '300px',
                                }}
                              >
                                {products?.Gallary?.map((value, index) => {
                                  return (
                                    <>
                                      <figure
                                        key={index}
                                        style={{
                                          cursor: 'pointer',
                                          margin: '5px',
                                          borderRadius: '10px',
                                        }}
                                      >
                                        <img
                                          src={value.Filepath}
                                          alt={products?.Item_Name}
                                          style={{ width: '100px', height: '100%' }}
                                          onError={(e) => {
                                            e.target.src =
                                              'https://dummyimage.com/100x100/ffffff/000000.png&text=No+Preview';
                                          }}
                                          onClick={() => handleImageClick(value.Filepath, value.Document_Id)}
                                        />
                                      </figure>
                                    </>
                                  );
                                })}
                              </div>
                              {/* </Scrollbars> */}
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
                    {/* <br /> */}
                    <ProductCard>
                      <div className="pdbr__Actions-for-deatil-page d-flex align-items-center">
                        <div className="pdbr__product-action">
                          <Button className="btn-cart" size="default" type="primary" onClick={handleAddToCart}>
                            <UilShoppingBag size={15} /> Add To Cart
                          </Button>
                        </div>
                      </div>
                    </ProductCard>
                    {/* <div className="pdbr__Actions d-flex align-items-center">
                      <div className="pdbr__product-action">
                        <Button className="btn-cart" size="default" type="primary" onClick={handleAddToCart}>
                          <UilShoppingBag size={15} /> Add to Cart
                        </Button>
                      </div>
                    </div> */}
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
