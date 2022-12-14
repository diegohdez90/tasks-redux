import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkUpdateEvent, EventRecorderBody, Events } from '../constants/responseEvent';

export const thunkFetchEvents = createAsyncThunk(
	'users/events',
	async () => {
		const response = await fetch('http://localhost:8080/events');
		return (await response.json()) as Events;		
	}
);

export const thunkAddEventByRecorder = createAsyncThunk(
	'user/events/post',
	async (data: EventRecorderBody) => {
		const response = await fetch('http://localhost:8080/events', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return (await response.json());
	}
)

export const thunkDeleteEvent = createAsyncThunk(
	'user/events/delete',
	async (id: number) => {
		await fetch(`http://localhost:8080/events/${id}`, {
			method: 'DELETE'
		});
		return {
			id
		}
	}
)

export const thunkUpdateEvent = createAsyncThunk(
	'user/events/update',
	async ({data, id}: AsyncThunkUpdateEvent) => {
		const response = await fetch(`http://localhost:8080/events/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await response.json();
	}
)
