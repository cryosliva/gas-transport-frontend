import {createStore, combineReducers} from 'redux';

import mapReducers from './containers/MapSettings/reducers';
import signInReducers from './pages/SignIn/reducers';

const reducer = combineReducers({
    map: mapReducers,
    signIn: signInReducers,
});

const initialState = {
    map: {
        settings: {
            showNodes: true,
            showTubes: true,
            zoom: 4.2,
        },
    },
    signIn: {},
};

const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
