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
      },
      (err) => {
        console.log('Something went wrong!', err);
      }
    );
    res.redirect('http://localhost:3000/game');
  })
  .get('/me/devices', (req, res) => {
    // console.log(req);
    spotifyApi.getMyDevices().then(
      (data) => {
        const availableDevices = data.body.devices;
      },
      (err) => {
        console.log(err);
      }
    );
  });

module.exports = router;
