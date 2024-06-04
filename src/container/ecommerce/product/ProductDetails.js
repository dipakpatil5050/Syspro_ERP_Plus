import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Skeleton, Spin, Checkbox, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import UilShoppingBag from '@iconscout/react-unicons/icons/uil-shopping-bag';
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

  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.auth.singleProduct[0]);
  const loading = useSelector((state) => state.auth.loading);
  const cartId = useSelector((state) => state.cart.cartId);

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

    if (selectedDocId) {
      console.log(`Selected Document ID: ${selectedDocId}`);
    }

    dispatch(getCartItem(cartId));
  };

  const productImage = selectedImage ? selectedImage : '';

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
                            src={productImage}
                            alt="No preview"
                            style={{ width: '100%', height: '400px' }}
                            onError={(e) => {
                              e.target.src = 'https://dummyimage.com/600x400/ffffff/000000.png&text=No+Preview';
                            }}
                          />
                        </figure>

                        <div className="pdbl__slider pdbs">
                          <Row gutter={5}>
                            <Col md={4}>
                              <div className="pdbl__image pdbs" style={{ display: 'flex' }}>
                                {products?.Gallary?.map((value, index) => {
                                  /* const borderStyle = index === activeImageIndex ? '2px solid #5840ff' : 'none'; */
                                  // <Checkbox
                                  //   checked={checkedImages[value.Document_Id] || false}
                                  //   onChange={(e) => handleCheckboxChange(value.Document_Id, e.target.checked)}
                                  // />;
                                  return (
                                    <>
                                      <figure
                                        key={index}
                                        style={{
                                          cursor: 'pointer',
                                          margin: '5px',
                                          // border: borderStyle,
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
                    <br />
                    <ProductCard>
                      <div className="pdbr__Actions d-flex align-items-center">
                        <div className="pdbr__product-action">
                          <Button className="btn-cart" size="default" type="primary" onClick={handleAddToCart}>
                            <UilShoppingBag size={15} /> Add To Cart
                          </Button>
                        </div>
                      </div>
                    </ProductCard>
                    {/* <Button className="btn-cart" size="default" type="secondary" onClick={handleAddToCart}>
                      Add to Cart
                    </Button> */}
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
