import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Nav from './components/Nav';
import './App.css';

function App() {
  return (
    <Router>
      <Nav />
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
