'use client'

import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { SyncLoader } from 'react-spinners'

import { BASE_URL } from '@/src/utils/constants'
import useCompany from '@/src/hooks/useCompany'
import useJob from '@/src/hooks/useJob'
import helpers from '@/src/utils/helpers'
import apiClient from '@/src/utils/apiClient'
import { useErrorBar } from '@/src/app/context/errorContext'

const getCompanyData = async (companyId: string) => {
	const res = await axios.get(`${BASE_URL}/company/${companyId}`)
	console.log(res.data)
}

export default function JobPage({ params }: any) {
	const { data: session } = useSession()
	const { data: job, isLoading, refetch } = useJob(params.jobId)

	const router = useRouter()

	const { showError } = useErrorBar()

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
				showError(error.response.data.message)
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
				showError(error.response.data.message)
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
				showError(error.response.data.message)
			}
		}
	}

	return (
		<div className='w-full h-full'>
			<div className='flex flex-row w-full h-full pt-40 justify-center items-start bg-slate-100'>
				<div className='bg-white shadow sm:rounded-lg'>
					{isLoading && (
						<div className='px-4 py-5 sm:p-6 flex justify-center items-center w-52 h-44'>
							<SyncLoader color='#ddd' size={5} />
						</div>
					)}{' '}
					{!isLoading && job && (
						<div className='px-4 py-5 sm:p-6'>
							{isLoading && <span>Loading</span>}
							{!job.clockStart && (
								<div>
									<h3 className='text-lg leading-6 font-medium text-gray-900'>
										Your job starts at{' '}
										{helpers.formatAMPM(new Date(job.shiftStart))}
									</h3>
									<div className='mt-2 max-w-xl text-sm text-gray-500'>
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
									<span className='mb-2'>
										Clocked in at {helpers.formatAMPM(new Date(job.clockStart))}
									</span>
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
											<div>
												<div>
													<span>
														Break started at{' '}
														{helpers.formatAMPM(
															new Date(job.breaks[job.breaks.length - 1]?.start)
														)}
													</span>
												</div>
												<button
													type='button'
													className='inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm mb-4 mt-3'
													onClick={() =>
														endBreak(job.breaks![job.breaks!.length - 1]?._id)
													}
												>
													End Break
												</button>
											</div>
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
							{job.clockStart && job.clockEnd && (
								<div className='flex flex-col'>
									<span>
										Clocked in at {helpers.formatAMPM(new Date(job.clockStart))}
									</span>
									<span>
										Clocked out at {helpers.formatAMPM(new Date(job.clockEnd))}
									</span>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
{
	/* )
	// return (
	// 	<div classNameName='bg-yellow-400 h-screen overflow-hidden flex items-center justify-center'>
	// 		<div classNameName='flex bg-white lg:w-5/12 md:6/12 w-10/12 h-1/2 shadow-3xl justify-center justify-items-center'>
	// 			{isLoading ? <p>Loading</p> : <p>{JSON.stringify(data)}</p>}
	// 		</div>
	// 	</div>
	// )
} */
}
