import React from 'react';

const MusicPlayer = ({ accessToken }) => {
  const player = new window.Spotify.Player({
    name: 'Weblab Player',
    getOAuthToken: (callback) => {
      callback(accessToken);
    },
  });

  player.connect();

  return <div></div>;
};

export default MusicPlayer;
