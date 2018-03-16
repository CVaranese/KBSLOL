import actions from '../constants/actions';
import initialState from '../constants/initialState';

const data = (state = initialState.data, { payload, response, type }) => {
  switch(type) {
    case actions.APP_INITIALIZED_SUCCESS: {
      return Object.assign({}, state, payload);
    }
    case actions.FETCH_SUMMONER_START: {
      return Object.assign({}, state, {
        searching: true,   
      });
    }
    case actions.FETCH_SUMMONER_FAILURE: {
      return Object.assign({}, state, {
        searching: false,   
      });
    }
    case actions.FETCH_SUMMONER_SUCCESS: {
      if (response.error) {
        return Object.assign({}, {
          error: response.error,
          searching: false,
        });
      } else {
        return Object.assign({}, {
          summoners: response.data,
          error: '',
          searching: false,
        });
      }
    }
    default:
      return state;
  }
};

export default data;
