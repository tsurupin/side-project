import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware
} from 'redux';
import uiReducer from './reducers/ui';
//import authReducer from './reducers/auth';
import accountsReducer from './reducers/accounts';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  accounts: accountsReducer,
  //auth: authReducer,
  ui: uiReducer,
});


let composeEnchancers = compose;

if (__DEV__) {
  composeEnchancers = window.__REACT_DEVTOOLS_EXTENSIO_COMPOSE__ || compose;
};

const configureStore = () => {
  return createStore(rootReducer, composeEnchancers(applyMiddleware(thunk)));
};

export default configureStore;
