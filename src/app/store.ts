import { configureStore } from '@reduxjs/toolkit';
import eventReducer from  '../features/events/eventSlice';
import recorderReducer from '../features/recorder/recorderSlice';

const store =configureStore({
	reducer: {
		events: eventReducer,
		recorder: recorderReducer,
	}
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;
