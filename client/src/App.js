import React from 'react';
import Game from './pages/Game';

import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/game'>
          <Game />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
