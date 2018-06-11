import { createStore, combineReducers, applyMiddleware } from ‘redux’;
import exampleReducer from ‘./reducers/exampleReducer;
import thunk from ‘redux-thunk’;

const reducer = combineReducers({
  exampleReducer
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;
