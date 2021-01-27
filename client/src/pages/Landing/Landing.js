import '../../global.scss';
import './landing.scss';
import axios from 'axios';

import React from 'react';

import Cursor from '../../components/Cursor';
import { Link } from 'react-router-dom';

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
      <Link to='/about' className='link'>
        About
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
