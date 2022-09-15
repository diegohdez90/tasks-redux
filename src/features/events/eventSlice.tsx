import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

interface Event {
	"id": string;
	"title": string;
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

	}
});

export const value = (state: RootState) => null;

export default eventSlice.reducer;
