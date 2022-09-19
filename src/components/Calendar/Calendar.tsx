import React, { useEffect } from 'react';
import { useEventDispatch } from '../../features/events/eventSlice';
import { thunkFetchEvents } from '../../util/api';
import { useAppSelector } from '../../app/hooks';
import { addZero } from '../../helpers/addZero';
import { EventCard, EventDetail } from '../../constants/responseEvent';
import { v4 } from 'uuid';

const Calendar = () => {

	const dispatch = useEventDispatch();
	const events = useAppSelector(({ events }) => events.allIds.map(id => events.byId[id]));
	
	useEffect(() => {
		const promise = dispatch(thunkFetchEvents());
		return () => {
			promise.abort();
		}
	}, []);

	const createDateKey = (eventDate: Date) => {
		console.log(`---------------`);
		console.log(eventDate);

		const year = eventDate.getUTCFullYear();
		const month = eventDate.getUTCMonth() + 1;
		const day = eventDate.getUTCDate();
		console.log(`${year}-${addZero(month)}-${addZero(day)}`);
		return `${year}-${addZero(month)}-${addZero(day)}`;
	}

	const groupByDay = (events: EventDetail[]) => {
		const groups: Record<string, EventCard[]> = {};

		const addGroup = (group: string, event: EventDetail) => {
			if (groups[group] === undefined) {
				groups[group] = [];
			}
			groups[group].push({
				...event,
				uuid: v4() as string
			});
		}
		events.forEach(event => {
			const dateStart = createDateKey(new Date(event.dateStart));
			const dateEnd = createDateKey(new Date(event.dateEnd));

			addGroup(dateStart, event);
			if(dateEnd !== dateStart)
				addGroup(dateEnd, event);
		});
		return groups;
	}

	let groupEvents: ReturnType<typeof groupByDay> | undefined;
	let sortedGroups: string[] | undefined;

	if (events.length) {
		groupEvents = groupByDay(events);
		sortedGroups = Object.keys(groupEvents).sort((firstDate, secondDate) => {
			return +new Date(firstDate) - +new Date(secondDate)
		});
	}	
	
	return groupEvents && sortedGroups ? (
		sortedGroups.map((date) => {
			const events = groupEvents ? groupEvents[date]: [];
			const groupDate = new Date(date);
			const day = groupDate.getUTCDate();
			const month = groupDate.toLocaleString(undefined, {
				month: 'short'
			});
			return (
				<div key={date} className="row row-striped border rounded mt-4 py-2">
					<div className="col-2 text-center">
						<h1 className="display-6"><span className="badge bg-primary">{day}</span></h1>
						<h2>{month}</h2>
					</div>
					<div className="col-10">
					{events.map(event => 
						<React.Fragment key={event.uuid}>
							<div className="col-12">
								<div className="d-flex flex-row-reverse">
									<button className='btn'>
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
					)}
					</div>
				</div>)
		})) : <div>Loading...</div>;
}

export default Calendar;
