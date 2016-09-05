import {
  LOGIN_DATA_LOAD,
  LOGIN_DATA_SUCCESS,
  LOGIN_DATA_FAIL,
} from '../actions/app';

const defaultState = {
  loading: false,
  error: undefined,
  user: undefined,
};

const fakeLoginDataResult = {
  username: 'Fakey Tumilton',
  age: 15,
  location: 'Sydney',
  following: [
    {
      username: 'Johnny Smultz',
      age: 25,
      location: 'Sydelbow',
    },
    {
      username: 'Dana McFurter',
      age: 35,
      location: 'Frankfurt',
    },
  ]
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    
    case LOGIN_DATA_LOAD:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        // user: action.result,
        user: fakeLoginDataResult,
      };

    case LOGIN_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        user: undefined,
      };

    default:
      return state;
  }
}
