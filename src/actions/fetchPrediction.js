import axios from 'axios';

import actions from '../constants/actions';

const {
  FETCH_PREDICTION_START,
  FETCH_PREDICTION_SUCCESS,
  FETCH_PREDICTION_FAILURE,
} = actions;

export default function fetchSummoner(summonerName) {
  return {
    types: {
      request: FETCH_PREDICTION_START,
      success: FETCH_PREDICTION_SUCCESS,
      failure: FETCH_PREDICTION_FAILURE,
    },
    callAPI: (state) => {
      const {
        config: { urls: { local, python } },
        data: { summoners },
      } = state;
      const params = {
        url: python, 
      };
      console.log("SUMMONER: ", summoners);
      return axios({
        method: 'post',
        baseURL: local,
        url: 'predict',
        data: {
          summoners,
        },
        params,
      });
    },
  };
}
