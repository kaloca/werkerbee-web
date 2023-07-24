import { UseJobsResponse } from '@/src/hooks/useJobs'
import { Rating } from '@mui/material'
import Image from 'next/image'

interface JobHistoryCardProps {
	job: UseJobsResponse
	onClickChangeRating: (job: UseJobsResponse) => void
}

const JobHistoryCard: React.FC<JobHistoryCardProps> = ({
	job,
	onClickChangeRating,
}) => {
	return (
		<section aria-labelledby={`${job._id}-heading`}>
			<div className='space-y-1 md:flex md:items-baseline md:space-y-0 md:space-x-4'>
				<h2
					id={`${job._id}-heading`}
					className='text-lg font-medium text-gray-900 md:flex-shrink-0'
				>
					{new Date(job.shiftStart).toLocaleDateString()}
				</h2>
				<div className='space-y-5 md:flex-1 md:min-w-0 sm:flex sm:items-baseline sm:justify-between sm:space-y-0'>
					<p className='text-md font-medium text-gray-500'>{job.name}</p>
					<div className='flex text-sm font-medium'>
						<a
							href={`/job/${job._id}`}
							className='text-indigo-600 hover:text-indigo-500'
						>
							Job Timeline
						</a>
						<div className='border-l border-gray-200 ml-4 pl-4 sm:ml-6 sm:pl-6'>
							<a
								// href={'order.invoiceHref'}
								className='text-indigo-600 hover:text-indigo-500'
							>
								View Invoice
							</a>
						</div>
					</div>
				</div>
			</div>

			<div className='mt-6 -mb-6 flow-root border-t border-gray-200 divide-y divide-gray-200'>
				{/* {jobs &&
										jobs.map((job) => ( */}
				<div className='py-6 sm:flex'>
					<div className='flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8'>
						<Image
							src={job.companyId.profilePicture || ''}
							alt={'company-profile-pic'}
							width={150}
							height={150}
							className='flex-none w-8 h-8 rounded-md object-center object-cover sm:w-14 sm:h-14'
						/>
						<div className='pt-1.5 min-w-0 flex-1 sm:pt-0'>
							<h3 className='text-md font-medium text-gray-900 hover:underline'>
								<a href={`/company/${job.companyId.username}`}>
									{job.companyId.name}
								</a>
							</h3>
							<p className='text-sm text-gray-500 truncate'>
								<span className='capitalize'>{job.status.toLowerCase()}</span>{' '}
								<span className='mx-1 text-gray-400' aria-hidden='true'>
									&middot;
								</span>{' '}
								<span className='capitalize'>{job.jobPostingId.type}</span>
							</p>
							{job.status == 'COMPLETE' && (
								<div
									className='flex flex-col border rounded-md w-min pt-1 pb-2 px-2 mt-2 hover:shadow hover:cursor-pointer'
									onClick={() => onClickChangeRating(job)}
								>
									<span className='text-sm mb-1'>Your Rating:</span>
									<Rating
										name='read-only'
										value={job.workerRating?.rating || 0}
										readOnly
									/>
								</div>
							)}
							{/* <p className='mt-1 font-medium text-gray-900'>
													{'Hey field'}
												</p> */}
						</div>
					</div>
					<div className='mt-6 space-y-4 sm:mt-0 sm:ml-6 sm:flex-none sm:w-40'>
						<button
							type='button'
							className='w-full flex items-center justify-center bg-indigo-600 py-2 px-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full sm:flex-grow-0'
						>
							View Similar Jobs
						</button>
						<button
							type='button'
							className='w-full flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full sm:flex-grow-0'
						>
							Report Issue
						</button>
					</div>
				</div>
				{/* ))} */}
			</div>
		</section>
	)
}

export default JobHistoryCard
