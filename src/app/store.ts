import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import eventReducer from  '../features/events/eventSlice';
import recorderReducer from '../features/recorder/recorderSlice';

const store = configureStore({
	reducer: {
		events: eventReducer,
		recorder: recorderReducer,
	}
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>

export default store;
