// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import blog from './blog';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, blog });

export default reducers;
