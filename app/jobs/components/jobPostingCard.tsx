import { JobPosting } from '@/app/hooks/useJobPostings'
import Rating from '@/app/components/rating'

interface JobPostingCardProps {
	jobPosting: JobPosting
	handleApply: (id: string) => void
	showApply: boolean
	showEdit?: boolean
}

const JobPostingCard: React.FC<JobPostingCardProps> = ({
	jobPosting,
	handleApply,
	showApply,
	showEdit = false,
}) => {
	return (
		<div className='flex flex-col bg-white border border-white shadow-lg  rounded-3xl p-4 m-4 w-full'>
			<div className='flex-none sm:flex'>
				<div className=' relative h-32 w-32   sm:mb-0 mb-3'>
					<img
						src='https://tailwindcomponents.com/storage/avatars/njkIbPhyZCftc4g9XbMWwVsa7aGVPajYLRXhEeoo.jpg'
						alt='aji'
						className=' w-32 h-32 object-cover rounded-2xl'
					/>
					{showEdit && (
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
					)}
				</div>
				<div className='flex-auto sm:ml-5 justify-evenly'>
					<div className='flex items-center justify-between sm:mt-2'>
						<div className='flex items-center'>
							<div className='flex flex-col'>
								<div className='w-full flex-none text-lg text-gray-800 font-bold leading-none'>
									{jobPosting.name}
								</div>
								<div className='flex-auto text-gray-500 my-1'>
									<span className='mr-3 first-letter:capitalize'>
										{jobPosting.type}
									</span>
									<span className='mr-3 border-r border-gray-200  max-h-0' />
									<span>{jobPosting.location}</span>
								</div>
							</div>
						</div>
					</div>
					<Rating rating={3.4} />
					<div className='flex pt-2  text-sm text-gray-500'>
						<div className='flex-1 inline-flex items-center flex-row'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='icon icon-tabler icon-tabler-currency-dollar h-5'
								width={24}
								height={24}
								viewBox='0 0 24 24'
								strokeWidth={2}
								stroke='currentColor'
								fill='none'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path stroke='none' d='M0 0h24v24H0z' fill='none' />
								<path d='M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2' />
								<path d='M12 3v3m0 12v3' />
							</svg>

							<p className=''>{jobPosting.payment}</p>
						</div>
						<div className='flex-1 inline-flex items-center'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5 mr-2'
								viewBox='0 0 20 20'
								fill='currentColor'
							>
								<path
									fillRule='evenodd'
									d='M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z'
									clipRule='evenodd'
								/>
							</svg>
							<p className=''>{jobPosting.time}</p>
						</div>
						{showApply && (
							<button
								onClick={() => handleApply(jobPosting._id)}
								className='flex-no-shrink bg-green-400 hover:bg-green-500 px-5 ml-4 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300'
							>
								Apply
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default JobPostingCard
