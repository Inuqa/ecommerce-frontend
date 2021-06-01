import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Header from './components/Header';
import Product from './pages/Product';
import Login from './pages/admin/Login';
import Products from './pages/Products';
import ProductIndex from './pages/admin/ProductIndex';
import Home from './pages/Home';
import Cart from './pages/Cart';
import OrderNew from './pages/OrderNew';
import OrdersIndex from './pages/admin/OrdersIndex';
import ProductsCreate from './pages/admin/ProductsCreate';
import ProductsEdit from './pages/admin/ProductsEdit';
import VariantsCreate from './pages/admin/VariantsCreate';
import VariantsEdit from './pages/admin/VariantsEdit';
import AfterTransaction from './pages/AfterTransaction';
import Container from 'react-bootstrap/Container';
import {useDispatch} from 'react-redux';
import {loadCart} from './features/cart/cartSlice';
import {authAutoLogin} from './features/auth/authSlice';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadCart());
    dispatch(authAutoLogin());
  }, []);
  return (
    <Router>
      <Container>
        <Header />
        <Switch>
          <Route path="/about">
          </Route>
          <Route path="/products/:id">
            <Product />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/order/new">
            <OrderNew />
          </Route>
          <PrivateRoute exact path="/admin">
            <Redirect to="/admin/orders" />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/products">
            <ProductIndex />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/products/new">
            <ProductsCreate />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/products/:id/edit">
            <ProductsEdit />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/products/:id/variants/new">
            <VariantsCreate />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/admin/products/:productId/variants/:id/edit"
          >
            <VariantsEdit />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/orders">
            <OrdersIndex />
          </PrivateRoute>
          <Route exact path="/admin/login">
            <Login />
          </Route>
          <Route exact path="/transactions/:id">
            <AfterTransaction />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
