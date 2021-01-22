import './game.scss';
import React, { useEffect, useState, useRef } from 'react';
import Biome from '../../components/Biome';
import colorSchemes from '../../helpers/colorSchemes';
import { randRange, randVal } from '../../helpers/utils';

import axios from 'axios';

const SIDE_LENGTH = 320;
const DIVISIONS = SIDE_LENGTH / 4;

function Game({ cookies, setCookie, removeCookie }) {
  let player = useRef();
  const songs = useRef([]);

  const playerCheckInterval = setInterval(() => checkForPlayer(), 1000);

  const checkForPlayer = () => {
    if (window.Spotify !== null && window.Spotify !== undefined) {
      player.current = new window.Spotify.Player({
        name: 'Weblab Player',
        getOAuthToken: (callback) => {
          callback(cookies['access_token']);
        },
        volume: 0.5,
      });
      player.current.connect();
      initEventListeners();
      clearInterval(playerCheckInterval);
    }
  };

  const initEventListeners = async () => {
    player.current.addListener('ready', ({ device_id }) => {
      console.log('Ready to play music!');
      console.log('Device ID: ', device_id);
    });
    const config = {
      headers: {
        'access-token': cookies['access_token'],
        'refresh-token': cookies['refresh_token'],
      },
    };

    const topSongsRes = await axios.get(
      'http://localhost:8888/api/v1/me/toptracks',
      config
    );
    const topSongs = topSongsRes.data.items;

    const topSongsIds = topSongs.map((song) => song.id);

    const recommendedSongsRes = await axios.get(
      `http://localhost:8888/api/v1/recommended?seed=${topSongsIds.slice(
        0,
        5
      )}`,
      config
    );

    const recommendedSongs = recommendedSongsRes.data.tracks;
    console.log(recommendedSongs);

    await axios.get(
      `http://localhost:8888/api/v1/play?id=${player.current._options.id}&uris=${recommendedSongs[0].uri}`,
      config
    );
  };

  return (
    <>
      <Biome
        DIVISIONS={DIVISIONS}
        SIDE_LENGTH={SIDE_LENGTH}
        mood={'happy'}
        seed={0}
      />
    </>
  );
}

export default Game;
