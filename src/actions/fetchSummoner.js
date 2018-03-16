import axios from 'axios';

import actions from '../constants/actions';

const {
  FETCH_SUMMONER_START,
  FETCH_SUMMONER_SUCCESS,
  FETCH_SUMMONER_FAILURE,
} = actions;

export default function fetchSummoner(summonerName) {
  return {
    types: {
      request: FETCH_SUMMONER_START,
      success: FETCH_SUMMONER_SUCCESS,
      failure: FETCH_SUMMONER_FAILURE,
    },
    callAPI: (state) => {
      const {
        config: { urls: { local, riot } },
      } = state;
      const params = {};
     
      params['summonerName'] = summonerName;
      params['url'] = riot;

      return axios({
        method: 'get',
        baseURL: local,
        url: 'summoner',
        params
      });
    },
  };
}
