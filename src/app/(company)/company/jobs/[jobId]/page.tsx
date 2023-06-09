'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import {
	CheckIcon,
	ClockIcon,
	ArrowLeftOnRectangleIcon,
	HandRaisedIcon,
	ArrowDownOnSquareIcon,
	ArrowLeftIcon,
} from '@heroicons/react/20/solid'

import useJob from '@/src/hooks/useJob'
import helpers from '@/src/utils/helpers'

const eventFormatting = {
	CLOCK_IN: {
		icon: ArrowDownOnSquareIcon,
		color: 'bg-blue-500',
		title: 'Clocked in',
	},
	CLOCK_OUT: {
		icon: ArrowLeftOnRectangleIcon,
		color: 'bg-red-500',
		title: 'Clocked out',
	},
	BREAK_START: {
		icon: HandRaisedIcon,
		color: 'bg-green-500',
		title: 'Started break',
	},
	BREAK_END: {
		icon: CheckIcon,
		color: 'bg-yellow-500',
		title: 'Finished break',
	},
}

const classNames = helpers.classNames

export default function JobTimelinePage({ params }: any) {
	const router = useRouter()
	const { data: job, isLoading, refetch } = useJob(params.jobId)

	useEffect(() => {
		const intervalId = setInterval(() => {
			refetch()
		}, 5000)

		return () => clearInterval(intervalId) // This is to cleanup after the component unmounts
	}, [refetch])

	return (
		<div className='flex flex-col justify-start items-center pt-28'>
			<div className='flow-root'>
				<ArrowLeftIcon
					className='w-10 mr-3 hover:bg-slate-200 rounded p-2 hover:cursor-pointer'
					onClick={() => router.push('/posts')}
				/>
				<ul role='list' className='-mb-8'>
					{job && (
						<div className='mb-8 flex flex-col'>
							<h1 className='font-bold text-[20px]'>{job.name}</h1>
							<span className='font-medium'>
								Scheduled start:{' '}
								<span className='font-normal'>
									{new Date(job.shiftStart).toLocaleString()}
								</span>
							</span>
							<span className='font-medium'>
								Scheduled end:{' '}
								<span className='font-normal'>
									{new Date(job.shiftEnd).toLocaleString()}
								</span>
							</span>
						</div>
					)}
					{job &&
						job.timeline &&
						job.timeline.map((event, eventIdx) => {
							const IconComponent = eventFormatting[event.status].icon
							return (
								<li key={eventIdx}>
									<div className='relative pb-8'>
										{/* ... */}
										<div className='relative flex space-x-3'>
											<div>
												<span
													className={classNames(
														eventFormatting[event.status].color,
														'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
													)}
												>
													<IconComponent
														className='h-5 w-5 text-white'
														aria-hidden='true'
													/>
												</span>
											</div>
											<div className='min-w-0 flex-1 pt-1.5 flex justify-between space-x-4'>
												<div>
													<p className='text-sm text-gray-500'>
														{eventFormatting[event.status].title} at{' '}
														<time>
															{new Date(event.time).toLocaleTimeString()}
														</time>
													</p>
												</div>
											</div>
										</div>
									</div>
								</li>
							)
						})}
					{job && (!job.timeline || job.timeline?.length < 1) && (
						<div className='inline-flex items-center'>
							<span
								className={
									' bg-red-500 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white mr-3'
								}
							>
								<ClockIcon className='h-5 w-5 text-white' aria-hidden='true' />
							</span>
							<span className='font-medium text-gray-800'>
								Worker still hasn&apos;t clocked in
							</span>
						</div>
					)}
				</ul>
			</div>
		</div>
	)
}
