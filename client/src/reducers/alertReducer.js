import { REMOVE_ALERT, SET_ALERT } from '../actions/types';

const initialState = [
  /*   {
    id: 1,
    msg: 'Please log in',
    alertType: 'success',
  }, */
];

export const alertReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((i) => i.id !== payload);
    default:
      return state;
  }
};

export default alertReducer;
