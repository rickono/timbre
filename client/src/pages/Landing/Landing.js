import '../../global.scss';
import './landing.scss';
import axios from 'axios';

import React from 'react';

import Cursor from '../../components/Cursor';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const onLogin = async () => {
  const res = await axios.get(process.env.REACT_APP_API_URL + '/api/v1/auth');
  const authUrl = res.data.url;
  console.log(authUrl);
  window.location = authUrl;
};

const Landing = () => {
  return (
    <>
      <Cursor />
      <Link
        to='/about'
        className='link'
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
      >
        <motion.p whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
          About
        </motion.p>
      </Link>
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
