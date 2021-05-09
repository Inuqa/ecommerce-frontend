import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Header from './components/Header';
import Product from './pages/Product';
import Products from './pages/Products';
import Container from 'react-bootstrap/Container';
import './App.css';

function App() {
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
          <Route path="/">
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
