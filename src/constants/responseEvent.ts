export type Response = {
	events: Array<EventDetail>
}

export type EventDetail = {
	id: number;
	title: string;
	description: string;
	dateStart: string;
	dateEnd: string;
}

export type Events = EventDetail[];

export type EventCard = EventDetail & {
	uuid: string;
};
