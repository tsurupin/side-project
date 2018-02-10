import { } from "../actions/actionTypes";
import {
  SIGN_UP_WAITING,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from '../../constants/actions';

const initialState = {
  uid: null,
  token: null,
  error: null
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SIGN_UP_WAITING:

    case SIGN_UP_SUCCESS:
      console.log("auth")
      return {
        ...state,
        uid: action.payload.uid,
        token: action.payload.token
      }
    case SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload.errorMessage
      }

    default:
      return state;
  }
};

export default reducer;
