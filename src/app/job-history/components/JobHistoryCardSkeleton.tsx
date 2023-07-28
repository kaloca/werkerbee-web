import Skeleton from '@mui/material/Skeleton'

const JobHistoryCardSkeleton = () => {
	return (
		<section className=' mb-7'>
			<div className='space-y-1 flex flex-row items-center'>
				<h2 className='text-lg w-44 font-medium text-gray-900 md:flex-shrink-0'>
					<Skeleton variant='rounded' />
				</h2>
				<div className='space-y-5 md:flex-1 md:min-w-0 sm:flex sm:items-baseline sm:justify-between sm:space-y-0'>
					<p className='text-sm font-medium text-gray-500 w-20'>
						{/* <Skeleton variant='rounded' /> */}
					</p>
					<div className='flex text-sm font-medium'>
						<a className='text-indigo-600 hover:text-indigo-500'>
							<Skeleton variant='rounded' />
						</a>
						<div className='border-l border-gray-200 ml-4 pl-4 sm:ml-6 sm:pl-6'>
							<div className='text-indigo-600 w-16 hover:text-indigo-500'>
								<Skeleton variant='rounded' />
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='mt-6 -mb-6 flow-root border-t border-gray-200 divide-y divide-gray-200'>
				{/* {jobs &&
                                jobs.map((job) => ( */}
				<div className='py-6 sm:flex'>
					<div className='flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8'>
						<div className='flex-none w-8 h-8 rounded-md object-center object-cover '>
							<Skeleton variant='circular' height={30} />
						</div>
						<div className='pt-1.5 min-w-0 flex-1 sm:pt-0'>
							<h3 className='text-sm w-14 font-medium text-gray-900'>
								<Skeleton variant='rounded' />
							</h3>
							<p className='text-sm text-gray-500 truncate inline-flex mt-2'>
								<span className='w-14'>
									<Skeleton variant='rounded' />
								</span>{' '}
								<span className='mx-1 text-gray-400' aria-hidden='true'>
									&middot;
								</span>{' '}
								<span className='w-20'>
									<Skeleton variant='rounded' />
								</span>
							</p>
							<Skeleton className='w-20 h-4' variant='rounded' />

							{/* <p className='mt-1 font-medium text-gray-900'>
                                            {'Hey field'}
                                        </p> */}
						</div>
					</div>
					<div className='mt-6 space-y-4 sm:mt-0 sm:ml-6 sm:flex-none sm:w-40'>
						<div className='w-full h-8 flex items-center justify-center sm:flex-grow-0'>
							<Skeleton className='w-full h-8' variant='rounded' />
						</div>
						<div className='w-full flex items-center justify-center sm:flex-grow-0'>
							<Skeleton className='w-full h-8' variant='rounded' />
						</div>
					</div>
				</div>
				{/* ))} */}
			</div>
		</section>
	)
}

export default JobHistoryCardSkeleton
