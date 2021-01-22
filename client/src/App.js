import React, { useState, useEffect } from 'react';
import Game from './pages/Game/Game';
import Landing from './pages/Landing/Landing';
import Auth from './pages/Auth';

import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';

const App = () => {
  const [authenticated, setAuthenticated] = useState(true);

  const authenticate = () => {
    setAuthenticated(true);
  };

  return (
    <Router>
      <Switch>
        <Route path='/game'>
          {authenticated ? <Game /> : <h1>Not authenticated</h1>}
        </Route>
        <Route path='/auth'>
          <Auth authenticate={authenticate} />
        </Route>
        <Route path='/'>
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
