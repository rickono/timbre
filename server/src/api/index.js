const express = require('express');

const emojis = require('./emojis');

const router = express.Router();

let SpotifyWebApi = require('spotify-web-api-node');

const scopes = [
    'streaming',
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'user-read-playback-state',
  ],
  redirectUri = 'http://localhost:8888/api/v1/callback',
  clientId = '9d9fea2b0fe144e78cf04804fe8b529b',
  clientSecret = 'c24d324bcbf74f60a03ff738157e99d4',
  state = 'state';

const spotifyApi = new SpotifyWebApi({
  redirectUri: redirectUri,
  clientId: clientId,
  clientSecret: clientSecret,
});

const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

router
  .get('/auth', (req, res) => {
    res.json({ url: authorizeURL });
  })
  .get('/callback', (req, res) => {
    let code = req.query.code;
    console.log(code);

    spotifyApi.authorizationCodeGrant(code).then(
      (data) => {
        console.log('The token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        console.log('The refresh token is ' + data.body['refresh_token']);

        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);

        console.log(spotifyApi);
      },
      (err) => {
        console.log('Something went wrong!', err);
      }
    );
    res.redirect('http://localhost:3000/game');
  })
  .get('/me/devices', (req, res) => {
    console.log(req);
    spotifyApi.getMyDevices().then(
      (data) => {
        console.log(spotifyApi);
        const availableDevices = data.body.devices;
        console.log(availableDevices);
      },
      (err) => {
        console.log(spotifyApi);
        console.log(err);
      }
    );
  });

module.exports = router;
