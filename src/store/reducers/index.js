// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
//import blog from './blog';
import { blogApi } from './blogApi';
import requests from './requests';
import services from './services';
import portfolio from './portfolio';
import auth from './actions';
import team from './team';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, [blogApi.reducerPath]: blogApi.reducer, services, requests, portfolio, team, auth });

export default reducers;
