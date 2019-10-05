import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'

import authReduder from './authReducer';
import recordReducer from './recordReducer';
import settingReducer from './settingReducer';

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    auth: authReduder,
    record: recordReducer,
    setting: settingReducer,
})

export default rootReducer;