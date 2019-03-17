import {createStore, combineReducers} from 'redux';

import mapSettingsReducers from './containers/MapSettings/reducers';
import mapReducers from './pages/Map/reducers';
import signInReducers from './pages/SignIn/reducers';

const mapReducer = combineReducers({
    settings: mapSettingsReducers,
    data: mapReducers,
    filters: mapSettingsReducers,
});

const reducer = combineReducers({
    map: mapReducer,
    signIn: signInReducers,
});

const initialState = {
    map: {
        settings: {
            showNodes: true,
            showPipes: true,
            zoom: 4.2,
            showMapSettings: false,
            showNodeList: false,
        },
        filters: {
            types: ['FIELD', 'CS', 'UGS'],
            years: [2017, 2018, 2019],
            region: null,
            snapshotId: 'test',
        },
        data: {},
    },
    signIn: {},
};

const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
