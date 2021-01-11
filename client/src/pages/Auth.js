import React from 'react';
import { useLocation } from 'react-router-dom';

const Auth = () => {
  const query = new URLSearchParams(useLocation().search);
  const access_token = query.get('access_token');
  const refresh_token = query.get('refresh_token');

  return <div>Loading...</div>;
};

export default Auth;
