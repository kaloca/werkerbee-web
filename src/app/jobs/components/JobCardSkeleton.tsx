import { Skeleton } from '@mui/material'

const JobCardSkeleton = () => {
	// console.log(jobPosting)
	return (
		<li className='bg-white shadow overflow-hidden px-4 py-4 sm:px-6 sm:rounded-md '>
			<div className='flex-none sm:flex'>
				<div className=' relative h-32 w-32   sm:mb-0 mb-3'>
					<Skeleton
						className='w-32 h-32 object-cover rounded-2xl'
						variant='rounded'
						height={125}
						width={125}
					/>
				</div>
				<div className='flex-auto sm:ml-5 justify-evenly'>
					<div className='flex items-center justify-between sm:mt-2'>
						<div className='flex items-center'>
							<div className='flex flex-col'>
								<div className='w-full flex-none text-lg text-gray-800 font-bold leading-none'>
									<Skeleton className='h-16 w-44' height={30} />
								</div>
								<div className='inline-flex text-gray-500 my-1 items-center'>
									<span className='mr-3 capitalize font-semibold'>
										<Skeleton height={20} className='w-32' />
									</span>
									<div className='mr-3 border-r border-gray-200 h-4 bg-slate-400 '></div>

									<span className='mr-3 capitalize'>
										<Skeleton height={20} className='w-20' />
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className='flex pt-2  text-sm text-gray-500 justify-between items-center'>
						<div className='inline-flex'>
							<div className='flex flex-col items-start'>
								<Skeleton height={20} className='w-28' />
								<Skeleton height={20} className='w-28' />
							</div>
							<div className='inline-flex items-center w-min mx-5'>
								<Skeleton height={25} className='w-10' />
								<Skeleton height={25} className='ml-5 w-20' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</li>
	)
}

export default JobCardSkeleton
