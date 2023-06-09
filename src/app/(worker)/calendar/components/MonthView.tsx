import helpers from '@/src/utils/helpers'

import { Day } from '@/src/hooks/useWorkerCalendar'
import MonthDay from './Day'

interface MonthViewProps {
	days: Day[] | undefined | null
}

const classNames = helpers.classNames

const MonthView: React.FC<MonthViewProps> = ({ days }) => {
	return (
		<div className='shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col'>
			<div className='grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none'>
				<div className='bg-white py-2'>
					M<span className='sr-only sm:not-sr-only'>on</span>
				</div>
				<div className='bg-white py-2'>
					T<span className='sr-only sm:not-sr-only'>ue</span>
				</div>
				<div className='bg-white py-2'>
					W<span className='sr-only sm:not-sr-only'>ed</span>
				</div>
				<div className='bg-white py-2'>
					T<span className='sr-only sm:not-sr-only'>hu</span>
				</div>
				<div className='bg-white py-2'>
					F<span className='sr-only sm:not-sr-only'>ri</span>
				</div>
				<div className='bg-white py-2'>
					S<span className='sr-only sm:not-sr-only'>at</span>
				</div>
				<div className='bg-white py-2'>
					S<span className='sr-only sm:not-sr-only'>un</span>
				</div>
			</div>

			<div className='flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto'>
				<MonthDay days={days} />
			</div>
		</div>
	)
}

export default MonthView
