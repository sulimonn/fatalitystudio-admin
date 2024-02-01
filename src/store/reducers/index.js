// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import blog from './blog';
import requests from './requests';
import services from './services';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, blog, services, requests });

export default reducers;
