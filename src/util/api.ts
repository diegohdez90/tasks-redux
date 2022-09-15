import { ThunkAction } from 'redux-thunk';
import type { AppThunk } from '../app/store';

export const thunkFetchEvents = (): AppThunk => async dispatch => {
	const async = await fetch('');
	dispatch(fetchEvents())
}
