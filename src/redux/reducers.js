import { combineReducers } from 'redux';
import userAdmin from './userAdmin/reducer';
import { reducer as formReducer } from 'redux-form';

export default asyncReducers => {
    return combineReducers({
        userAdmin,
        ...asyncReducers,
        form: formReducer,
    });
};
