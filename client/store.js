import {createStore, combineReducers} from 'redux';

import mapSettingsReducers from './reducers/map/settings';
import mapDataReducers from './reducers/map/data';
import mapFiltersReducers from './reducers/map/filters';

import userReducers from './containers/RouteWithRedirect/reducers';

import manageReducers from './pages/Manage/reducers';

const mapReducer = combineReducers({
    settings: mapSettingsReducers,
    data: mapDataReducers,
    filters: mapFiltersReducers,
});

const reducer = combineReducers({
    map: mapReducer,
    manage: manageReducers,
    user: userReducers,
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
        filters: {},
        data: {},
    },
    signIn: {},
    manage: {},
    user: {},
};

const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
