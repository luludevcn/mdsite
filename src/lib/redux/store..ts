import { configureStore } from '@reduxjs/toolkit';
import { deepseekApiSlice } from './slices/deepseekApiSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [deepseekApiSlice.reducerPath]: deepseekApiSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];