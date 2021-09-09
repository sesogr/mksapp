import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {songApi} from "../service/songApi";

export const store = configureStore({
  reducer: {
    [songApi.reducerPath]: songApi.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
