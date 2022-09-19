import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { start, stop } from '../../features/recorder/recorderSlice';
import { addZero } from '../../helpers/addZero';
import { useEventDispatch } from '../../features/events/eventSlice';
import { thunkAddEventByRecorder } from '../../util/api';

const Recorder = () => {

	const dispatch = useAppDispatch();
	const eventDispatch = useEventDispatch();
	const date = useAppSelector(state => state.recorder.dateStart);
	const started = date !== '';
	let interval = useRef<number>(0);
	const [, setCount] = useState(0);

	const onClickEvent = () => {
		if (started) {
			window.clearInterval(interval.current);
			dispatch(stop())
			eventDispatch(thunkAddEventByRecorder({
				title: 'Demo tasks',
				description: 'Dummy description',
				dateStart: date,
				dateEnd: new Date().toISOString()
			}));
		} else {
			dispatch(start());
			interval.current = window.setInterval(() => {
				setCount(count => count + 1);
			}, 1000);
		}
	}

	useEffect(() => {
		return () => {
			window.clearInterval(interval.current)
		}
	}, []);

	let seconds = started ? Math.floor((Date.now() - new Date(date).getTime()) / 1000) : 0;
	const hours = seconds ? Math.floor(seconds / 60 / 60) : 0;
	seconds -= hours * 60 * 60;
	const minutes = seconds ? Math.floor(seconds / 60) : 0;
	seconds -= minutes * 60;

	return (
		<div className='row'>
			<div className="col">
				<p
					className='text-center'
				>
					<button
						className='btn'
						onClick={onClickEvent}
					>
						<i className={cx({
							'bi-record-circle': !started
						}, {
							'bi-stop-circle': started
						}, 'text-center')} style={{
								fontSize: '5rem',
								color: "red"
							}}
							role="img" 
							aria-label="Record"
						></i>	
					</button>
				</p>
				<p className='text-center'>{addZero(hours)}:{addZero(minutes)}:{addZero(seconds)}</p>
			</div>
		</div>
	);
}


export default Recorder;
