// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import { blogApi } from './blogApi';
import services from './services';
import portfolio from './portfolio';
import auth from './actions';
import team from './team';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  [blogApi.reducerPath]: blogApi.reducer,
  [services.reducerPath]: services.reducer,
  [portfolio.reducerPath]: portfolio.reducer,
  team,
  auth
});

export default reducers;
