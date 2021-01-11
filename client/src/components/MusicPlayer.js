import React, { useState, useRef } from 'react';

const MusicPlayer = ({ cookies }) => {
  const [intervalId, setIntervalId] = useState(
    setInterval(() => {
      initPlayer();
      console.log('hello');
    }, 1000)
  );
  const player = useRef();

  const initPlayer = () => {
    if (window.Spotify !== null) {
      player.current = new window.Spotify.Player({
        name: 'Weblab Player',
        getOAuthToken: (callback) => {
          callback(cookies['access_token']);
        },
        volume: 0.5,
      });
      console.log(player);
      player.current.connect();
      console.log(intervalId);
      clearInterval(intervalId);
      initEventListeners();
    }
  };

  const initEventListeners = () => {
    player.current.addListener('ready', ({ device_id }) => {
      console.log('Ready to play music!');
      console.log('Device ID: ', device_id);
    });
  };

  return <div></div>;
};

export default MusicPlayer;
