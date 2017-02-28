/**
 * Created by edgar on 11/01/2017.
 */
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import calcReducer from '../reducers/calcReducer';
import userReducer from '../reducers/userReducer';

import thunk from 'redux-thunk';

const rootReducer = combineReducers({calculations:calcReducer, users:userReducer});

class Store {

  constructor(){

  }

}

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

const store = createStore(rootReducer, {}, enhancer);


store.subscribe(()=>{
  console.log('Store, subscribe');
  console.log(arguments);
  console.log('store changed', store.getState());
});

window.store = store;


export default store;