import React, { Fragment, useEffect } from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import './styles.css';
import Navbar from './components/Navbar';
import Counter from './pages/Counter';
import Products from './pages/Products';
import { useDispatch } from 'react-redux';
import { productsAction } from './features/productsReducer';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productsAction.loadProducts());
  }, []);
  return (
    <Fragment>
      <Navbar></Navbar>

      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route path='/counter' component={Counter}></Route>
        <Route path='/products' component={Products}></Route>
      </Switch>
    </Fragment>
  );
};

export default App;
