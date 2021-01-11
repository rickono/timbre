import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Auth = ({ cookies, setCookie, removeCookie }) => {
  const query = new URLSearchParams(useLocation().search);
  const access_token = query.get('access_token');
  const refresh_token = query.get('refresh_token');

  setCookie('access_token', access_token);
  setCookie('refresh_token', refresh_token);

  useEffect(() => {
    window.location = 'http://localhost:3000/game';
  }, [cookies]);

  return <div>Loading...</div>;
};

export default Auth;
