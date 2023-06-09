export type TimelineEventType =
	| 'CLOCK_IN'
	| 'CLOCK_OUT'
	| 'BREAK_START'
	| 'BREAK_END'

export interface ITimelineEvent {
	status: TimelineEventType
	time: Date
}
export interface Job {
	_id: string
	name: string
	rating?: number
	worker: string
	company: string
	jobPosting: string
	status: 'PENDING' | 'COMPLETE' | 'CANCELED'
	shiftStart: Date
	shiftEnd: Date
	clockStart?: Date
	clockEnd?: Date
	breaks?: [
		{
			start: Date
			end?: Date
			_id: string
		}
	]
	timeline: ITimelineEvent[]
	createdAt: Date
	updatedAt: Date
}
