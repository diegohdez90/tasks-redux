import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import store from '../../app/store';
import { EventDetail } from '../../constants/responseEvent';
import { thunkAddEventByRecorder, thunkDeleteEvent, thunkFetchEvents, thunkUpdateEvent } from '../../util/api';

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

export const eventSlice: Slice<EventSlice> = createSlice({
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
		builder.addCase(thunkAddEventByRecorder.fulfilled, (state, action) => {
			const event: EventDetail = action.payload;
			state.allIds = [...state.allIds, event.id];
			state.byId = {
				...state.byId,
				[action.payload.id]: action.payload
			};
		});
		builder.addCase(thunkDeleteEvent.fulfilled, (state, action) => {
			const { id } = action.payload
			state.byId = { ...state.byId };
			state.allIds = state.allIds.filter(storeId => storeId !== id);
			delete state.byId[id];
		});
		builder.addCase(thunkUpdateEvent.fulfilled, (state, action) => {
			const { id } = action.payload;
			state.byId = {
				...state.byId,
				[id]: action.payload
			};
		});
	}
});

export type EventDispatch = typeof store.dispatch;
export const useEventDispatch: () => EventDispatch = useDispatch;
export const value = (state: RootState) => state.events;

export default eventSlice.reducer;
