import React from 'react';
import Game from './pages/Game/Game';
import Landing from './pages/Landing/Landing';
import Auth from './pages/Auth';

import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies();

  return (
    <Router>
      <Switch>
        <Route path='/game'>
          <Game
            cookies={cookies}
            setCookie={setCookie}
            removeCookie={removeCookie}
          />
        </Route>
        <Route path='/auth'>
          <Auth
            cookies={cookies}
            setCookie={setCookie}
            removeCookie={removeCookie}
          />
        </Route>
        <Route path='/'>
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
