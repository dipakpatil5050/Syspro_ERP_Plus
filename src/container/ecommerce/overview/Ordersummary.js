/* eslint-disable react/prop-types */
import React from 'react';
// import { Form, Input, Select } from 'antd';
// import UilAngleLeft from '@iconscout/react-unicons/icons/uil-angle-left';
// import UilAngleRight from '@iconscout/react-unicons/icons/uil-angle-right';
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { OrderSummary } from '../Style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import Heading from '../../../components/heading/heading';
// import { Button } from '../../../components/buttons/buttons';
// import { cartGetData } from '../../../redux/cart/actionCreator';

function Ordersummary() {
  const subtotal = useSelector((state) => state.cart.cartItems.Subtotal);

  //   useEffect(() => {
  //     if (cartGetData) {
  //       dispatch(cartGetData());
  //     }
  //   }, [dispatch]);

  return (
    <Cards
      bodyStyle={{
        borderRadius: '20px',
      }}
      className="ninjadash-order-summery"
      headless
    >
      <OrderSummary>
        <Heading className="summary-table-title" as="h4">
          Order Summary
        </Heading>
        <Cards
          bodyStyle={{
            borderRadius: '10px',
          }}
          headless
        >
          <div className="order-summary-inner">
            <Heading className="summary-total" as="h4">
              <span className="summary-total-label">Subtotal : </span>
              <span className="summary-total-amount"> ₹ {subtotal}</span>
            </Heading>
            {/* {!checkout && (
              <Button className="btn-proceed" type="secondary" size="large">
                <Link to="/admin/ecommerce/checkout">
                  Proceed To Checkout
                  {!rtl ? <UilAngleRight /> : <UilAngleLeft />}
                </Link>
              </Button>
            )} */}
            {/* {state.current === 3 && (
              <Button onClick={onSubmit} className="btn-proceed" type="secondary" size="large">
                <Link to="#">Place Order</Link>
              </Button>
            )} */}
          </div>
        </Cards>
      </OrderSummary>
    </Cards>
  );
}

export default Ordersummary;
