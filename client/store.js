import {createStore, combineReducers} from 'redux';

import mapReducers from './containers/MapSettings/reducers';

const reducer = combineReducers({
    map: mapReducers,
});

const initialState = {
    map: {
        settings: {
            showNodes: true,
            showTubes: true,
            zoom: 4.2,
        },
    },
};

const store = createStore(
    mapReducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
