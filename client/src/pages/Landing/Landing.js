import '../../global.scss';
import './landing.scss';
import axios from 'axios';
import { motion } from 'framer-motion';

import React from 'react';

const onLogin = async () => {
  const res = await axios.get('http://localhost:8888/api/v1/auth');
  const authUrl = res.data.url;
  console.log(authUrl);
  window.location = authUrl;
};

const Landing = () => {
  return (
    <div className='container'>
      <button className='login' onClick={onLogin}>
        Login with Spotify
      </button>
      <h1 className='name'>TIMBRE</h1>
    </div>
  );
};

export default Landing;
