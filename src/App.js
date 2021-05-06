import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/about">
        </Route>
        <Route path="/products">
        </Route>
        <Route path="/">
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
