import './game.scss';
import React, { useEffect, useState, useRef } from 'react';
import Biome from '../../components/Biome';
import { Canvas } from 'react-three-fiber';
import Cookies from 'js-cookie';

import axios from 'axios';
import Loading from '../../components/Loading';
import Setup from './Setup';
import Usercard from './Usercard';
import Cursor from '../../components/Cursor';

const SIDE_LENGTH = 320;
const DIVISIONS = SIDE_LENGTH / 4;

function Game() {
  let player = useRef();
  const recommended = useRef([]);
  const [loading, setLoading] = useState(true);
  const [playerLoading, setPlayerLoading] = useState(true);
  const [setupDone, setSetupDone] = useState(false);

  const setup = () => {
    setSetupDone(true);
  };

  const logout = () => {
    Cookies.remove('access-token');
    Cookies.remove('refresh-token');
    Cookies.remove('username');
    window.location = process.env.REACT_APP_BASE_URL;
  };

  const playerCheckInterval = setInterval(() => checkForPlayer(), 1000);

  const checkForPlayer = () => {
    if (window.Spotify !== null && window.Spotify !== undefined) {
      player.current = new window.Spotify.Player({
        name: 'Weblab Player',
        getOAuthToken: (callback) => {
          callback(Cookies.get('access-token'));
        },
        volume: 0.5,
      });
      player.current.connect();
      setPlayerLoading(false);
      clearInterval(playerCheckInterval);
    }
  };
  useEffect(() => {
    const init = async () => {
      if (!playerLoading) {
        player.current.addListener('ready', ({ device_id }) => {
          console.log('Ready to play music!');
          console.log('Device ID: ', device_id);
          console.log(player);
        });
        const config = {
          headers: {
            'access-token': Cookies.get('access-token'),
            'refresh-token': Cookies.get('refresh-token'),
          },
        };

        const topSongsRes = await axios.get(
          process.env.REACT_APP_API_URL + '/api/v1/me/toptracks',
          config
        );
        const topSongs = topSongsRes.data.items;

        const topSongsIds = topSongs.map((song) => song.id);

        const recommendedSongsRes = await axios.get(
          `${
            process.env.REACT_APP_API_URL
          }/api/v1/recommended?seed=${topSongsIds.slice(0, 5)}`,
          config
        );

        const recommendedSongs2Res = await axios.get(
          `${
            process.env.REACT_APP_API_URL
          }/api/v1/recommended?seed=${topSongsIds.slice(6, 10)}`,
          config
        );

        const recommendedSongs3Res = await axios.get(
          `${
            process.env.REACT_APP_API_URL
          }/api/v1/recommended?seed=${topSongsIds.slice(11, 15)}`,
          config
        );

        const recommendedSongs4Res = await axios.get(
          `${
            process.env.REACT_APP_API_URL
          }/api/v1/recommended?seed=${topSongsIds.slice(16, 20)}`,
          config
        );

        const allRecommended = recommendedSongsRes.data.tracks.concat(
          recommendedSongs2Res.data.tracks,
          recommendedSongs3Res.data.tracks,
          recommendedSongs4Res.data.tracks
        );

        recommended.current = allRecommended.map((track) => {
          return {
            ...track,
            position: [
              Math.floor(Math.random() * SIDE_LENGTH - SIDE_LENGTH / 2),
              Math.floor(Math.random() * SIDE_LENGTH - SIDE_LENGTH / 2),
            ],
          };
        });

        setLoading(false);
      }
    };
    init();
  }, [playerLoading]);
  return (
    <>
      <Cursor />
      <Canvas
        shadowMap
        colorManagement
        onCreated={({ camera }) => camera.lookAt(-20, 60, -20)}
        camera={{ position: [30, 30, 30], fov: 60 }}
      >
        {loading ? (
          <Loading />
        ) : setupDone ? (
          <Biome
            DIVISIONS={DIVISIONS}
            SIDE_LENGTH={SIDE_LENGTH}
            mood={Math.random() < 0.5 ? 'happy' : 'chill'}
            seed={0}
            songs={recommended.current}
            playerId={player.current._options.id}
          />
        ) : (
          ''
        )}
      </Canvas>
      {loading ? <h1 className='loadingtext'>Loading...</h1> : ''}
      {setupDone || loading ? (
        ''
      ) : (
        <>
          <Setup setup={setup} />
        </>
      )}
      {setupDone && !loading ? <Usercard logout={logout} /> : ''}
    </>
  );
}

export default Game;
