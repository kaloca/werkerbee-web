import Image from 'next/image'
import moment from 'moment'
import { BanknotesIcon, CurrencyDollarIcon } from '@heroicons/react/20/solid'

import Rating from '@/src/components/rating'
import helpers from '@/src/utils/helpers'
import { JobPosting } from '@/src/interfaces/models/JobPosting'

import Placeholder from '@/src/assets/placeholder.jpg'
import { useRouter } from 'next/navigation'

const jobPosting = {
	name: 'Cashier at Shake Shack',
	location: 'Stanford Mall, Stanford, CA',
	type: 'Cashier',
	payment: '40$/hr',
	start: '2023-05-24T19:00:00.000+00:00',
	end: '2023-05-25T00:00:00.000+00:00',
	company: {
		name: 'Shake Shack',
	},
}

const showApply = true

interface JobCardProps {
	jobPosting: JobPosting
	handleApply: (id: string) => void
	showApply: boolean
	showEdit?: boolean
}

const JobCard: React.FC<JobCardProps> = ({
	jobPosting,
	handleApply,
	showApply,
}) => {
	const startDate = new Date(jobPosting.start)
	const endDate = new Date(jobPosting.end)
	const router = useRouter()

	console.log(jobPosting)
	return (
		<li
			onClick={() => handleApply(jobPosting._id)}
			className='bg-white shadow overflow-hidden px-4 py-4 sm:px-6 sm:rounded-md hover:cursor-pointer hover:shadow-md hover:shadow-gray-300'
		>
			<div className='flex-none sm:flex'>
				<div className=' relative h-32 w-32   sm:mb-0 mb-3'>
					<Image
						src={Placeholder}
						alt='aji'
						className=' w-32 h-32 object-cover rounded-2xl'
					/>
					{/* {showEdit && (
							<a
								href='#'
								className='absolute -right-2 bottom-2 -ml-3 text-white p-1 text-xs bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
									fill='currentColor'
									className='h-4 w-4'
								>
									<path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'></path>
								</svg>
							</a>
						)} */}
				</div>
				<div className='flex-auto sm:ml-5 justify-evenly'>
					<div className='flex items-center justify-between sm:mt-2'>
						<div className='flex items-center'>
							<div className='flex flex-col'>
								<div className='w-full flex-none text-lg text-gray-800 font-bold leading-none'>
									{jobPosting.name}
								</div>
								<div className='inline-flex text-gray-500 my-1 items-center'>
									<span className='mr-3 capitalize font-semibold'>
										<button
											onClick = {() => router.push("company/fabrizio_passione")}>
											{jobPosting.companyName}
										</button>
									</span>
									
									<div className='mr-3 border-r border-gray-200 h-4 bg-slate-400 '></div>
									<div>
										<span className='mr-3 capitalize'>{jobPosting.type}</span>
									</div>
									<span className='mr-3 border-r border-gray-200  max-h-0' />
									<span>{jobPosting.distance}</span>
								</div>
							</div>
						</div>
					</div>

					<div className='flex pt-2  text-sm text-gray-500 justify-between items-center'>
						<div className='inline-flex'>
							<div className='flex flex-col items-start'>
								<p className=''>{moment(startDate).format('ddd, MMMM Do')}</p>
								<p className=''>
									{helpers.formatAMPM(startDate)}-{helpers.formatAMPM(endDate)}
								</p>
							</div>
							<div className='inline-flex items-center w-min mx-5'>
								<CurrencyDollarIcon className='h-6 mr-1 text-green-500' />

								<span className='text-lg text-gray-500 font-light'>
									{jobPosting.payment}
									<span className='text-gray-500 font-light'>/hr</span>
								</span>
							</div>
							<Rating rating={3.4} />
						</div>

						{/* {showApply && (
							<button
								onClick={() => handleApply(jobPosting._id)}
								className='flex-no-shrink bg-green-400 hover:bg-green-500 px-5 ml-4 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300'
							>
								Apply
							</button>
						)} */}
					</div>
				</div>
			</div>
		</li>
	)
}

export default JobCard
