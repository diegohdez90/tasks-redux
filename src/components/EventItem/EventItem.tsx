import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { EventCard } from '../../constants/responseEvent';
import { useEventDispatch } from '../../features/events/eventSlice';
import { thunkDeleteEvent, thunkUpdateEvent } from '../../util/api';

interface Props {
	event: EventCard
}

const EventItem: React.FC<Props> = ({
	event
}: Props) => {

	const dispatch = useEventDispatch();
	const [hover, setHover] = useState(false);
	const [editable, setEditable] = useState(false);
	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);

	const onDeleteEvent = (index: number) => {
		dispatch(thunkDeleteEvent(index))
	}

	const onEdit = () => {
		setEditable(true);
	}

	const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		//setTitle(e.target.value)
		titleRef.current!.value = e.target.value;
	}

	const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		//setDescription(e.target.value);
		descriptionRef.current!.value = e.target.value;
	}

	const save = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setEditable(false);
		dispatch(thunkUpdateEvent({
			data: {
				title: titleRef.current?.value as string,
				description: descriptionRef.current?.value as string,
				id: event.id,
				dateEnd: event.dateEnd,
				dateStart: event.dateStart
			},
			id: event.id
		}));
	}

	useEffect(() => {
		if(editable) {
			titleRef.current!.value = event.title;
			titleRef.current?.focus();
			descriptionRef.current!.value = event.description;
		}
	}, [editable]);
	
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
			<h3
				className="text-uppercase"
				onMouseEnter={(_: React.MouseEvent<HTMLHeadElement>) => setHover(true)}
				onMouseLeave={(_: React.MouseEvent<HTMLHeadElement>) => setHover(false)}
			>
				{editable ?
						<div className='mb-3'>
							<input 
								ref={titleRef}
								className='form-control'
								onChange={onChangeTitle}
							/>
						</div>
				: <strong>
				<i
					style={{
						cursor: 'pointer'
					}}
					className={cx({
						'd-none': !hover
					}, 'bi bi-pencil')}
					onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
						e.preventDefault();
						onEdit();
					}}
				></i>
					{event.title}
				</strong>}
			</h3>
			<ul className="list-inline">
				<li className="list-inline-item"><i className="bi bi-clock" aria-hidden="true"></i> {event.dateStart} - 2:00 PM</li>
			</ul>
			{ editable ? <div className='mb-3'>
				<textarea
					ref={descriptionRef}
					className='form-control'
					onChange={onChangeDescription}
				/>
			</div> : <p>{event.description}</p>}
			{ editable ? <button onClick={save} className='btn border rounded'><i className='bi bi-save-fill'></i> Save</button> : null}
		</React.Fragment>
	)
}

export default EventItem
