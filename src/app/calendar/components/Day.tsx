import helpers from '@/src/utils/helpers'

import { Day } from '@/src/hooks/useWorkerCalendar'

interface DayProps {
	days: Day[]
}

const classNames = helpers.classNames

const MonthDay: React.FC<DayProps> = ({ days }) => {
	return (
		<>
			<div className='hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-4 lg:gap-px'>
				{days.map((day: Day) => (
					<div
						key={day.date}
						className={classNames(
							day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500',
							'relative py-2 px-3'
						)}
					>
						<time
							dateTime={day.date}
							className={
								day.isToday
									? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
									: undefined
							}
						>
							{day.date.split('-').pop()!.replace(/^0/, '')}
						</time>
						{day.events.length > 0 && (
							<ol className='mt-2'>
								{day.events.slice(0, 2).map((event) => {
									let startDate = new Date(event.start)
									let endDate = new Date(event.end)
									return (
										<li key={event.id} onClick={() => console.log(event.id)}>
											<a href={event.href} className='group flex flex-col'>
												<p className='flex-auto truncate font-medium text-gray-900 hover:text-indigo-600 hover:cursor-pointer'>
													{event.name}
												</p>
												<time
													dateTime={event.start}
													className='hidden flex-none text-gray-500  xl:block'
												>
													{helpers.formatAMPM(startDate)}
													{'-'}
													{helpers.formatAMPM(endDate)}
												</time>
											</a>
										</li>
									)
								})}
								{day.events.length > 2 && (
									<li className='text-gray-500'>
										+ {day.events.length - 2} more
									</li>
								)}
							</ol>
						)}
					</div>
				))}
			</div>
			<div className='isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden'>
				{days.map((day: Day) => (
					<button
						key={day.date}
						type='button'
						className={classNames(
							day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
							(day.isSelected || day.isToday) && 'font-semibold',
							day.isSelected && 'text-white',
							!day.isSelected && day.isToday && 'text-indigo-600',
							!day.isSelected &&
								day.isCurrentMonth &&
								!day.isToday &&
								'text-gray-900',
							!day.isSelected &&
								!day.isCurrentMonth &&
								!day.isToday &&
								'text-gray-500',
							'flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10'
						)}
					>
						<time
							dateTime={day.date}
							className={classNames(
								day.isSelected &&
									'flex h-6 w-6 items-center justify-center rounded-full',
								day.isSelected && day.isToday && 'bg-indigo-600',
								day.isSelected && !day.isToday && 'bg-gray-900',
								'ml-auto'
							)}
						>
							{day.date.split('-').pop()!.replace(/^0/, '')}
						</time>
						<p className='sr-only'>{day.events.length} events</p>
						{day.events.length > 0 && (
							<div className='-mx-0.5 mt-auto flex flex-wrap-reverse'>
								{day.events.map((event) => (
									<div
										key={event.id}
										className='mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400'
									>
										Hello
									</div>
								))}
							</div>
						)}
					</button>
				))}
			</div>
		</>
	)
}

export default MonthDay
