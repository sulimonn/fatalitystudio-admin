// third-party
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

// project import
import reducers from './reducers';
import { blogApi } from './reducers/blogApi';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware)
});

const { dispatch } = store;

export { store, dispatch };

setupListeners(store.dispatch);
