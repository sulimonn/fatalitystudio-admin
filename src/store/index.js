// third-party
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

// project import
import reducers from './reducers';
import { blogApi } from './reducers/blogApi';
import portfolioApi from './reducers/portfolio';
import servicesApi from './reducers/services';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware, portfolioApi.middleware, servicesApi.middleware)
});

const { dispatch } = store;

export { store, dispatch };

setupListeners(store.dispatch);
