const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

let SpotifyWebApi = require('spotify-web-api-node');

var scopes = [
    'streaming',
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
  ],
  redirectUri = 'http://localhost:8888/callback',
  clientId = '9d9fea2b0fe144e78cf04804fe8b529b',
  clientSecret = 'c24d324bcbf74f60a03ff738157e99d4',
  state = 'state';

var spotifyApi = new SpotifyWebApi({
  redirectUri: redirectUri,
  clientId: clientId,
  clientSecret: clientSecret,
});

var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/auth', (req, res) => {
  res.send({ url: authorizeURL });
});

app.get('/callback', (req, res) => {
  let code = req.query.code;
  console.log(code);

  spotifyApi.authorizationCodeGrant(code).then(
    function (data) {
      console.log('The token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
      console.log('The refresh token is ' + data.body['refresh_token']);

      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.setRefreshToken(data.body['refresh_token']);
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );

  res.redirect('http://localhost:3000');
});

app.get('/elvis', (req, res) => {
  spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
    function (data) {
      console.log('Artist albums', data.body);
      res.send(data.body);
    },
    function (err) {
      console.error(err);
    }
  );
});

app.get('/getme', (req, res) => {
  spotifyApi.getMe().then(
    function (data) {
      console.log('Some information about the authenticated user', data.body);
      res.send(data.body);
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );
});

app.get('/myplaylists', (req, res) => {
  spotifyApi.getUserPlaylists('1293423980').then(
    function (data) {
      console.log('Some information about this playlist', data.body);
      res.send(data.body);
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
