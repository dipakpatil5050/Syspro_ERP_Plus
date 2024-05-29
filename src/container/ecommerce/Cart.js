import React, { lazy, Suspense, useEffect } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
// import { cartGetData } from '../../redux/cart/actionCreator';
import { getCartItem } from '../../Actions/Catalogue/CartAction';
import useDocumentTitle from '../../components/dynamic-Page-Title/useDocumentTitle';

const CartTable = lazy(() => import('./overview/CartTable'));
const Ordersummary = lazy(() => import('./overview/Ordersummary'));

function ShoppingCart() {
  useDocumentTitle('Checkout');

  const PageRoutes = [
    {
      path: '/admin/ecommerce/products/grid',
      breadcrumbName: 'Catalogue',
    },
    {
      path: '',
      breadcrumbName: 'Checkout',
    },
  ];

  const dispatch = useDispatch();
  //   const { cartData } = useSelector((state) => {
  //     return {
  //       cartData: state.cart.data,
  //       rtl: state.ChangeLayoutMode.rtlData,
  //     };
  //   });

  // useEffect(() => {
  //   if (cartGetData) {
  //     dispatch(cartGetData());
  //   }
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getCartItem());
  }, []);

  //   let subtotal = 0;

  //   if (cartData !== null) {
  //     cartData.map((data) => {
  //       const { quantity, price } = data;
  //       subtotal += parseInt(quantity, 10) * parseInt(price, 10);
  //       return subtotal;
  //     });
  //   }

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" routes={PageRoutes} />
      <Main>
        <div className="cartWraper">
          <Row gutter={15}>
            <Col md={24}>
              <Cards headless>
                <Row gutter={30}>
                  <Col xxl={17} xs={24}>
                    <Suspense
                      fallback={
                        <Cards headless>
                          <Skeleton paragraph={{ rows: 10 }} active />
                        </Cards>
                      }
                    >
                      <Routes>
                        <Route index element={<CartTable />} />
                      </Routes>
                    </Suspense>
                  </Col>
                  <Col xxl={7} xs={24}>
                    <Suspense
                      fallback={
                        <Cards headless>
                          <Skeleton paragraph={{ rows: 10 }} active />
                        </Cards>
                      }
                    >
                      {/* <Ordersummary subtotal={subTotal} checkout={false} /> */}
                    </Suspense>
                  </Col>
                </Row>
              </Cards>
            </Col>
          </Row>
        </div>
      </Main>
    </>
  );
}

export default ShoppingCart;
