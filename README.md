This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# League of Legends Match Predictor
This project utilizes a knowledge based system to determine the winner of a League of Legends match based on player and game statistics.

## Usage
To run this application you will need [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/lang/en/docs/install/). Also install [node](https://nodejs.org/en/download/). You will also need a Riot Games API key for the [Places](https://developer.riotgames.com) API.

```
git clone https://github.com/CVaranese/KBSLOL.git
cd KBSLOL
node proxy.js [RIOT API Key]
```

In a new terminal window navigate to KBSLOL
```
./scripts/start [RIOT API Key]
```

In a new terminal window navigate to KBSLOL
```
python src/inference/server.py
```
