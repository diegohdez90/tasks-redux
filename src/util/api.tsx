import { createAsyncThunk } from '@reduxjs/toolkit';
import { Events } from '../constants/responseEvent';

export const thunkFetchEvents = createAsyncThunk(
	'users/events',
	async () => {
		const response = await fetch('http://localhost:8080/events');
		return (await response.json()) as Events;		
	}
);
