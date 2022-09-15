import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

interface RecorderSlice {
	dateStart: string;
}

const initialState: RecorderSlice = {
	dateStart: ""
}

export const recorderSlice = createSlice({
	name: 'recorder',
	initialState: initialState,
	reducers: {
		start: state => {
			state.dateStart = new Date().toISOString();
		},
		stop: state => {
			state.dateStart = '';
		}
	}
});

export const {
	start,
	stop
} = recorderSlice.actions;

export const value = (state: RootState) => state.recorder;

export default recorderSlice.reducer;

