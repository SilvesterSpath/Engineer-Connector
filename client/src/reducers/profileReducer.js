import {
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILE_ME,
  PROFILE_ERROR,
} from '../actions/types';

const initialState = {
  profile: null,
  profile_me: [],
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case GET_PROFILE_ME:
      return {
        ...state,
        profile_me: action.payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
}

export default profileReducer;
