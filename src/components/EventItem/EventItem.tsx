import React from 'react'
import { EventCard } from '../../constants/responseEvent';
import { useEventDispatch } from '../../features/events/eventSlice';
import { thunkDeleteEvent } from '../../util/api';

interface Props {
	event: EventCard
}

const EventItem: React.FC<Props> = ({
	event
}: Props) => {

	const dispatch = useEventDispatch();

	const onDeleteEvent = (index: number) => {
		dispatch(thunkDeleteEvent(index))
	}

	return (
		<React.Fragment key={event.uuid}>
			<div className="col-12">
				<div className="d-flex flex-row-reverse">
					<button
						className='btn'
						onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
							e.preventDefault();
							onDeleteEvent(event.id)
						}}
					>
						<i className='bi bi-x'></i>
					</button>
				</div>
			</div>
			<h3 className="text-uppercase"><strong>{event.title}</strong></h3>
			<ul className="list-inline">
				<li className="list-inline-item"><i className="bi bi-clock" aria-hidden="true"></i> {event.dateStart} - 2:00 PM</li>
			</ul>
			<p>{event.description}</p>
		</React.Fragment>
	)
}

export default EventItem
