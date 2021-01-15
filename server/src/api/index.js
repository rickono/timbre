const express = require('express');

const router = express.Router();

const User = require('../models/User');

const SpotifyWebApi = require('spotify-web-api-node');

const redirectUri = 'http://localhost:8888/api/v1/callback';
const clientId = '9d9fea2b0fe144e78cf04804fe8b529b';
const clientSecret = 'c24d324bcbf74f60a03ff738157e99d4';

const spotifyApi = new SpotifyWebApi({
  redirectUri: redirectUri,
  clientId: clientId,
  clientSecret: clientSecret,
});

const scopes = [
  'streaming',
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'user-read-playback-state',
  'user-top-read',
];

const state = 'state';
const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

router
  .get('/auth', (req, res) => {
    res.json({ url: authorizeURL });
  })
  .get('/callback', (req, res) => {
    let code = req.query.code;

    spotifyApi.authorizationCodeGrant(code).then(
      async (data) => {
        console.log('The token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        console.log('The refresh token is ' + data.body['refresh_token']);

        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);

        // Get user info and save to MongoDB
        const apiRes = await spotifyApi.getMe();
        const userData = apiRes.body;

        await User.findOneAndUpdate(
          { email: userData.email },
          {
            name: userData.display_name,
            email: userData.email,
            pictureUrl: userData.images[0].url,
            accessToken: data.body['access_token'],
            refreshToken: data.body['refresh_token'],
          },
          { upsert: true }
        );

        res.redirect(
          `http://localhost:3000/auth?access_token=${data.body['access_token']}&refresh_token=${data.body['refresh_token']}`
        );
      },
      (err) => {
        console.log('Something went wrong!', err);
      }
    );
  })
  .get('/me/devices', (req, res) => {
    // console.log(req);
    spotifyApi.getMyDevices().then(
      (data) => {
        const availableDevices = data.body.devices;
        res.json(availableDevices);
      },
      (err) => {
        console.log(err);
      }
    );
  })
  .get('/me/toptracks', (req, res) => {
    console.log(req.headers['access-token']);
    spotifyApi.setAccessToken(req.headers['access-token']);
    spotifyApi.setRefreshToken(req.headers['refresh-token']);
    spotifyApi.getMyTopTracks().then(
      (data) => {
        const topTracks = data.body;
        res.send(topTracks);
      },
      (err) => console.log(err)
    );
  })
  .get('/recommended', (req, res) => {
    spotifyApi.setAccessToken(req.headers['access-token']);
    spotifyApi.setRefreshToken(req.headers['refresh-token']);
    spotifyApi
      .getRecommendations({
        seed_tracks: req.query.seed.split(',').slice(0, 5),
      })
      .then(
        (data) => {
          const recommendedSongs = data.body;
          res.send(recommendedSongs);
        },
        (err) => {
          console.log(err);
        }
      );
  })
  .put('/transfer', (req, res) => {
    spotifyApi.setAccessToken(req.headers['access-token']);
    spotifyApi.setRefreshToken(req.headers['refresh-token']);
    spotifyApi.transferMyPlayback([req.query.id]).then(
      () => {
        console.log('Transferring playback');
        res.send({ data: 'Sucessfully transferred player' });
      },
      (err) => {
        console.log(err);
      }
    );
  })
  .get('/play', (req, res) => {
    spotifyApi.setAccessToken(req.headers['access-token']);
    spotifyApi.setRefreshToken(req.headers['refresh-token']);
    spotifyApi
      .play({
        device_id: req.query.id,
        uris: [req.query.uris],
      })
      .then(
        () => {
          console.log('Playing...');
          res.send({ data: 'Sucessfully started playing' });
        },
        (err) => {
          console.log(err);
        }
      );
  });

module.exports = router;
