import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Header from './components/Header';
import Product from './pages/Product';
import Products from './pages/Products';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Container from 'react-bootstrap/Container';
import './App.css';
import {useDispatch} from 'react-redux';
import {loadCart} from './features/cart/cartSlice';

function App() {
  const dispatch = useDispatch();

  dispatch(loadCart());
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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
