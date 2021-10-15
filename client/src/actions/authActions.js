import axios from 'axios';
import {
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCES,
  USER_LOADED,
} from './types';
import { setAlert } from './alertAction'; // this can be called from anywhere
import setAuthToken from '../utils/set-auth-token';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data, // this is the user
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ name, email, password }); // prepairing the data to be send

    try {
      const res = await axios.post('/api/users', body, config);

      dispatch({
        type: REGISTER_SUCCES,
        payload: res.data,
      });
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((i) => dispatch(setAlert(i.msg, 'danger')));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };