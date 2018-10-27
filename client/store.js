import {createStore, combineReducers} from 'redux';

const reducer = combineReducers({});

const getInitialState = () => ({
    user: {
        login: 'katretyakova',
    },
});

const store = createStore(
    reducer,
    ...getInitialState(),
    {
        user: Promise.resolve(),
    },
);

export default store;
