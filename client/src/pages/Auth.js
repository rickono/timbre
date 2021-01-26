import React from 'react';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const Auth = ({ authenticate }) => {
  const query = new URLSearchParams(useLocation().search);
  const access_token = query.get('access_token');
  const refresh_token = query.get('refresh_token');
  const name = query.get('name');

  Cookies.set('access-token', access_token);
  Cookies.set('refresh-token', refresh_token);
  Cookies.set('username', name);

  window.location = process.env.REACT_APP_BASE_URL + '/game';

  return <h1>Logging you in...</h1>;
};

export default Auth;
