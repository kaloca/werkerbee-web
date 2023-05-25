'use client'
import React, { useState } from 'react'

type Shift = 'Morning' | 'Afternoon' | 'Evening'

const daysOfWeek = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
]
const shiftsOfDay: Shift[] = ['Morning', 'Afternoon', 'Evening']

const AvailabilityScreen = () => {
	const [availability, setAvailability] = useState(
		Object.fromEntries(
			daysOfWeek.map((day) => [
				day,
				{ Morning: false, Afternoon: false, Evening: false },
			])
		)
	)

	const toggleShift = (day: string, shift: Shift) => {
		setAvailability((prev) => ({
			...prev,
			[day]: {
				...prev[day],
				[shift]: !prev[day][shift],
			},
		}))
	}

	return (
		<div className='font-sans bg-gray-50 min-h-screen p-8'>
			<h1 className='text-4xl font-bold mb-10 text-center'>
				Weekly Availability
			</h1>
			<div className='flex flex-wrap justify-center flex-row'>
				{daysOfWeek.map((day) => (
					<div key={day} className=' w-40 mx-1 flex flex-col items-center'>
						<h2 className='text-2xl font-semibold mb-4'>{day}</h2>
						<div className='flex flex-col'>
							{shiftsOfDay.map((shift) => (
								<div
									key={shift}
									onClick={() => toggleShift(day, shift)}
									className={`px-1 py-2 cursor-pointer text-center text-xs ${
										availability[day][shift]
											? 'bg-blue-500 text-white'
											: 'bg-white text-gray-800'
									} hover:bg-blue-300 hover:text-white w-40`}
								>
									{shift}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default AvailabilityScreen
