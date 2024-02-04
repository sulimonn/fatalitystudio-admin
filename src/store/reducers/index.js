// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import blog from './blog';
import requests from './requests';
import services from './services';
import portfolio from './portfolio';
import authReducer from './actions';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, blog, services, requests, portfolio, auth: authReducer });

export default reducers;
