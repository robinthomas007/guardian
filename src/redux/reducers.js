import { combineReducers } from 'redux';
import userAdmin from './userAdmin/reducer';

export default asyncReducers => {
    return combineReducers({
        userAdmin,
        ...asyncReducers,
    });
};
