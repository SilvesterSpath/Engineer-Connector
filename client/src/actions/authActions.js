import axios from 'axios';
import { REGISTER_FAIL, REGISTER_SUCCES } from './types';
import { setAlert } from './alertAction'; // this can be called from anywhere

// Register User
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      header: {
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
      console.log(errors);

      if (errors) {
        errors.forEach((i) => dispatch(setAlert(i.msg, 'danger')));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
