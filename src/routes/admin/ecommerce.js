import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
// import Product from '../../container/ecommerce/product/Products';

const Product = lazy(() => import('../../container/ecommerce/product/Products'));
const ProductAdd = lazy(() => import('../../container/ecommerce/product/AddProduct'));
const ProductDetails = lazy(() => import('../../container/ecommerce/product/ProductDetails'));
const Cart = lazy(() => import('../../container/ecommerce/Cart'));
const Orders = lazy(() => import('../../container/ecommerce/Orders'));

// const ProductEdit = lazy(() => import('../../container/ecommerce/product/EditProduct'));
// const Invoice = lazy(() => import('../../container/ecommerce/Invoice'));
// const Sellers = lazy(() => import('../../container/ecommerce/Sellers'));
// const Checkout = lazy(() => import('../../container/ecommerce/Checkout'));

const NotFound = lazy(() => import('../../container/pages/404'));

function EcommerceRoute() {
  return (
    <Routes>
      <Route path="products/*" element={<Product />} />
      <Route exact path="add-product" element={<ProductAdd />} />
      <Route exact path="productDetails/:id" element={<ProductDetails />} />
      <Route path="cart/*" element={<Cart />} />
      <Route exact path="orders" element={<Orders />} />

      {/* <Route exact path="edit-product" element={<ProductEdit />} /> */}
      {/* <Route exact path="invoice" element={<Invoice />} />
      <Route exact path="sellers" element={<Sellers />} /> */}
      {/* <Route path="checkout/*" element={<Checkout />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default EcommerceRoute;
