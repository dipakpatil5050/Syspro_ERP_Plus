import React, { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCartItem } from '../../Actions/Catalogue/CartAction';

const Dashboard = lazy(() => import('../../container/dashboard'));
const NotFound = lazy(() => import('../../container/pages/404'));

function DashboardRoutes() {
  const cartId = useSelector((state) => state.cart.cartId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItem(cartId));
  }, [dispatch, cartId]);

  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default DashboardRoutes;
