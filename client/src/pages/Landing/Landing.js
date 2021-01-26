import '../../global.scss';
import './landing.scss';
import axios from 'axios';

import React from 'react';

import Cursor from '../../components/Cursor';

const onLogin = async () => {
  const res = await axios.get('http://localhost:8888/api/v1/auth');
  const authUrl = res.data.url;
  console.log(authUrl);
  window.location = authUrl;
};

const Landing = () => {
  return (
    <>
      <Cursor />
      <div className='container'>
        <h3 className='disclaimer'>
          You must have Spotify Premium for this app to work properly.
        </h3>
        <button className='login' onClick={onLogin}>
          Login with Spotify
        </button>
        <h1 className='name'>TIMBRE</h1>
      </div>
    </>
  );
};

export default Landing;
