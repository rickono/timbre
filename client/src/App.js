import React from 'react';
import Game from './pages/Game/Game';
import Landing from './pages/Landing/Landing';

import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/game'>
          <Game />
        </Route>
        <Route path='/'>
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
