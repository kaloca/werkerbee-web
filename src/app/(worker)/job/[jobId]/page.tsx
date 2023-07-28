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
import { useSession } from 'next-auth/react'
import apiClient from '@/src/utils/apiClient'
import { useSnackbar } from '@/src/app/context/snackbarContext'

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
		color: 'bg-yellow-500',
		title: 'Started break',
	},
	BREAK_END: {
		icon: CheckIcon,
		color: 'bg-green-500',
		title: 'Finished break',
	},
}

const classNames = helpers.classNames

export default function WorkerJobTimelinePage({ params }: any) {
	const router = useRouter()
	const { data: session } = useSession()
	const { data: job, isLoading, refetch } = useJob(params.jobId)

	const { showSnackbar } = useSnackbar()

	const clock = async (mode: string) => {
		if (session) {
			try {
				const response = await apiClient({
					method: 'put',
					url: `/job/${params.jobId}/clock-${mode}`,
					token: session.user.token,
				})

				if (response?.status === 200) {
					console.log(`Clocked ${mode} successfully`)
				} else {
					console.error(`Error clocking ${mode}: ${response.data.message}`)
				}
				refetch()
			} catch (error: any) {
				console.error(`Error clocking ${mode}:`, error.response.data.message)
				showSnackbar('error', error.response.data.message)
			}
		}
	}

	const newBreak = async () => {
		if (session) {
			try {
				const response = await apiClient({
					method: 'post',
					url: `/job/${params.jobId}/break`,
					token: session.user.token,
				})

				if (response?.status === 200) {
					console.log(`Successfully started break`)
				} else {
					console.error(`Error starting break: ${response.data.message}`)
				}
				refetch()
			} catch (error: any) {
				console.error(`Error starting break:`, error.response.data.message)
				showSnackbar('error', error.response.data.message)
			}
		}
	}

	const endBreak = async (breakId: string) => {
		if (session) {
			try {
				const response = await apiClient({
					method: 'put',
					url: `/job/${params.jobId}/break/${breakId}`,
					token: session.user.token,
				})

				if (response?.status === 200) {
					console.log(`Successfully finished break`)
				} else {
					console.error(`Error finishing break: ${response.data.message}`)
				}
				refetch()
			} catch (error: any) {
				console.error(`Error finishing break:`, error.response.data.message)
				showSnackbar('error', error.response.data.message)
			}
		}
	}

	return (
		<div className='flex flex-col justify-start items-center pt-28'>
			<div>
				<ArrowLeftIcon
					className='absolute left-2 top-20 w-10 mr-3 hover:bg-slate-200 rounded p-2 hover:cursor-pointer'
					onClick={() => router.back()}
				/>
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
				<ul role='list' className='-mb-8 overflow-scroll'>
					{job &&
						job.timeline &&
						job.timeline.map((event, eventIdx) => {
							const IconComponent = eventFormatting[event.status].icon
							return (
								<li key={eventIdx}>
									<div className='relative pb-8'>
										{eventIdx !== job.timeline.length - 1 ? (
											<span
												className='absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200'
												aria-hidden='true'
											/>
										) : null}
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
														{event.status == 'CLOCK_IN' &&
															helpers.differenceInMinutes(
																new Date(job.shiftStart),
																new Date(event.time)
															) > 5 && (
																<span className='ml-2 text-red-500'>
																	(LATE)
																</span>
															)}
														{event.status == 'CLOCK_OUT' &&
															helpers.differenceInMinutes(
																new Date(job.shiftEnd),
																new Date(event.time)
															) < -5 && (
																<span className='ml-2 text-red-500'>
																	(EARLY)
																</span>
															)}
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
								You haven&apos;t clocked in yet
							</span>
						</div>
					)}
				</ul>
				{job && (
					<div className='px-4 py-5 sm:p-6'>
						{!job.clockStart && (
							<div>
								{/* <h3 className='text-lg leading-6 font-medium text-gray-900'>
										Your job starts at{' '}
										{helpers.formatAMPM(new Date(job.shiftStart))}
									</h3> */}
								<div className='mt-2 ml-2 max-w-xl text-sm text-gray-500'>
									<p>
										Clock in when you arrive at the job location and are ready
										to work.
									</p>
								</div>
								<button
									type='button'
									className='inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm mt-5'
									onClick={() => clock('in')}
								>
									Clock In
								</button>
							</div>
						)}
						{job.clockStart && !job.clockEnd && (
							<div className='flex flex-col'>
								{/* <span className='mb-2'>
										Clocked in at {helpers.formatAMPM(new Date(job.clockStart))}
									</span> */}
								{job.breaks &&
									(job.breaks[job.breaks.length - 1]?.end ||
										job.breaks.length < 1) && (
										<button
											type='button'
											className='inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm mb-4 mt-3'
											onClick={newBreak}
										>
											Start Break
										</button>
									)}
								{job.breaks &&
									job.breaks.length > 0 &&
									!job.breaks[job.breaks.length - 1]?.end && (
										<button
											type='button'
											className='inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm mb-4 mt-3'
											onClick={() =>
												endBreak(job.breaks![job.breaks!.length - 1]?._id)
											}
										>
											End Break
										</button>
									)}
								<button
									type='button'
									className='inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm'
									onClick={() => clock('out')}
								>
									Clock Out
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
