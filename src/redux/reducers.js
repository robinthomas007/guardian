import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import labels from './labels/reducer';
import user from './user/reducer';
import userAdmin from './userAdmin/reducer';
import uploadProgressAlert from './uploadProgressAlert/reducer';
import headerReducer from './../reducers/headerReducer';
import commentReducer from '../reducers/commentReducer';
import findProjectReducer from '../reducers/findProjectReducer';
import ProjectInboxReducer from '../reducers/ProjectInboxReducer';

export default asyncReducers => {
  return combineReducers({
    form: formReducer,
    user,
    userAdmin,
    labels,
    uploadProgressAlert,
    headerReducer,
    commentReducer,
    findProjectReducer,
    ProjectInboxReducer,
    ...asyncReducers,
  });
};
