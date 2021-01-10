import '../../global.scss';
import './landing.scss';

import React from 'react';

const Landing = () => {
  return (
    <div className='container'>
      <button className='login'>Login with Spotify</button>
      <h1 className='name'>SpotifyApp</h1>
    </div>
  );
};

export default Landing;
