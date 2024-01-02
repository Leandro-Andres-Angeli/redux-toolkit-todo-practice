import React, { Fragment, useEffect } from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import './styles.css';
import Navbar from './components/Navbar';
import Counter from './pages/Counter';

const App = () => {
  return (
    <Fragment>
      <Navbar></Navbar>

      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route path='/counter' component={Counter}></Route>
      </Switch>
    </Fragment>
  );
};

export default App;