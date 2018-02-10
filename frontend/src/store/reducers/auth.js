import { } from "../actions/actionTypes";


const initialState = {
  token: null,
  expiryDate: null
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case AUTH_SET_TOKEN:
      console.log("auth")
      return {
        ...state,
        token: 'hoge'
      }
    default:
      return state;
  }
};

export default reducer;
