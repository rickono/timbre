import React, { useState, useEffect } from 'react';
import Game from './pages/Game/Game';
import Landing from './pages/Landing/Landing';
import Auth from './pages/Auth';

import { AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';

const App = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <Router>
        <Switch>
          <Route path='/game'>
            <Game />
          </Route>
          <Route path='/auth'>
            <Auth />
          </Route>
          <Route path='/'>
            <Landing />
          </Route>
        </Switch>
      </Router>
    </AnimatePresence>
  );
};

export default App;
