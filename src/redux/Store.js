import {createStore} from 'redux';
import userReducer from './Reducer';

export const Store = createStore(userReducer);
