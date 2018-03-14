import actions from '../constants/actions';

const serverInit = () => {
  const payload = {};

  if (typeof window !== 'undefined') {
    payload.riotapikey = window.riotapikey;
  }

  return (
    (dispatch) => dispatch({
      type: actions.APP_INITIALIZED_SUCCESS,
      payload,
    })
  );
}

export default serverInit;
