import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import store from '../../app/store';
import { thunkFetchEvents } from '../../util/api';

interface Event {
	"id": number;
	"title": string;
	"description": string;
	"dateStart": string;
	"dateEnd": string;
}

interface EventSlice {
	byId: Record<Event['id'], Event>,
	allIds: Event['id'][]
}

const initialState: EventSlice = {
	byId: {},
	allIds: []
}

export const eventSlice = createSlice({
	name: 'event',
	initialState: initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(thunkFetchEvents.fulfilled, (state, action) => {
			const events = action.payload;

			state.allIds = events.map(({ id }) => id);
			state.byId = events.reduce<EventSlice['byId']>((byIds, event) => {
				byIds[event.id] = event;
				return byIds;
			} , {});
		});
		builder.addCase(thunkFetchEvents.pending, (state, action) => {

		});
		builder.addCase(thunkFetchEvents.rejected, (state, action) => {

		});
	}
});

export type EventDispatch = typeof store.dispatch;
export const useEventDispatch: () => EventDispatch = useDispatch;
export const value = (state: RootState) => state.events;

export default eventSlice.reducer;
