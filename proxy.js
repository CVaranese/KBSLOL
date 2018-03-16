const express = require('express');
const request = require('request');
const xml2js = require('xml2js');
const bodyParser = require('body-parser');
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

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/predict', (req, res) => {
  console.log(req.body);
  request({
    uri: `${req.query['url']}/predict`,
    method: 'post',
    form: {
      data: JSON.stringify(req.body)
    },
  }, (error, response, body) => {
    if (error) {
      res.send({
        error: 'Error calculating prediction',
      });
    } else {
      console.log(body);
      res.send(body);
    }
  });
});

app.get('/summoner', (req, res) => {
  const params = {};
  params['api_key'] = riot_api_key;
  console.log(req.query);
  request({
    uri: `${req.query['url']}/lol/summoner/v3/summoners/by-name/${req.query['summonerName']}`,
    method: 'get',
    qs: params,
  }, (error, response, body) => {
    if (error) {
      res.send('Riot API Error: Summoner Name');
    } else {
      const { id } = JSON.parse(body);
      console.log("Summoner Id:", id, JSON.parse(body));
      if (id) {
        request({
          uri: `${req.query['url']}/lol/spectator/v3/active-games/by-summoner/${id}`,
          method: 'get',
          qs: params,
        }, (error, response, body) => {
          console.log("Active Game:", JSON.parse(body));
          if (error) {
            console.log(`Error in getting active game for summoner id: ${id}`);
            res.send({
              error: `Error in getting active game for summoner id: ${id}`, 
            });
          } else {
            const { gameId, participants } = JSON.parse(body);
            if (participants) {
              const data = [];
              participants.map((participant) => {
                console.log("Participant", participant, participant.summonerId);
                return request({
                  uri: `${req.query['url']}/lol/league/v3/positions/by-summoner/${participant.summonerId}`,
                  method: 'get',
                  qs: params,
                }, (error, response, body) => {
                  console.log(participant.summonerName, JSON.parse(body));
                  if (error) {
                    data.push({
                      rank: '',
                      wins: -1,
                      losses: -1,
                      tier: '',
                      leaguePoints: -1,
                      champion: -1,
                      summonerName: '',
                      teamId: -1,
                    });
                  }
                  
                  // Is it always 1 item array?
                  const { rank, wins, losses, tier, leaguePoints } = JSON.parse(body)[0];
                  data.push({
                    rank: rank || '',
                    wins: wins || -1,
                    losses: losses || -1,
                    tier: tier || '',
                    leaguePoints: leaguePoints || -1,
                    champion: participant.championId,
                    summonerName: participant.summonerName,
                    teamId: participant.teamId || -1,
                  });
                });
              });

              // TODO: Use async/await or promise.all here instead of timeout
              setTimeout(() => {
                console.log('Player data:', data);
                res.send(data);
              }, 1500);
            } else {
              res.send({
                error: `No active game data for summoner: ${id}`,
              });
            }
          }
        });
      } else {
        res.send({
          error: "Error in getting summoner id.", 
        });
      }
    }
  });
});

app.listen(8080, () => console.log('Proxy server listening on port 8080'));
