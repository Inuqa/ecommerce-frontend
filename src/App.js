import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Header from './components/Header';
import Product from './pages/Product';
import Login from './pages/admin/Login';
import Products from './pages/Products';
import ProductIndex from './pages/admin/ProductIndex';
import Home from './pages/Home';
import Cart from './pages/Cart';
import OrdersIndex from './pages/admin/OrdersIndex';
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
          <Route exact path="/admin/products">
            <ProductIndex />
          </Route>
          <Route exact path="/admin/orders">
            <OrdersIndex />
          </Route>
          <Route exact path="/admin/login">
            <Login />
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
