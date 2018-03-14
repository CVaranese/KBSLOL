const express = require('express');
const request = require('request');
const xml2js = require('xml2js');
const get = require('lodash/get');
const parseString = xml2js.parseString;
var riot_api_key = '';

if (process.argv.length === 3) {
  riot_api_key = process.argv[2];
} else {
  console.log("Usage: node proxy.js [RIOT_API_KEY]");
  process.exit(1);
}

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/summoner', (req, res) => {
  const params = {};
  params['api_key'] = riot_api_key;

  request({
    uri: `${req.query['url']}/lol/summoner/v3/summoners/by-name/${req.query['summonerName']}`,
    method: 'get',
    qs: params,
  }, (error, response, body) => {
    console.log(error, body);
  });
});

app.listen(8080, () => console.log('Proxy server listening on port 8080'));
