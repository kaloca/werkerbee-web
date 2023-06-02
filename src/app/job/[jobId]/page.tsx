'use client'

import axios from 'axios'

import { BASE_URL } from '@/src/utils/constants'
import useCompany from '@/src/hooks/useCompany'
import useJob from '@/src/hooks/useJob'
import helpers from '@/src/utils/helpers'

const getCompanyData = async (companyId: string) => {
	const res = await axios.get(`${BASE_URL}/company/${companyId}`)
	console.log(res.data)
}

export default function JobPage({ params }: any) {
	const { data: job, isLoading } = useJob(params.jobId)

	return (
		<div className='w-full h-full'>
			{isLoading && <p>Loading</p>}{' '}
			{job && (
				<div className='flex flex-row w-full h-full pt-40 justify-center items-start bg-slate-100'>
					<div className='bg-white shadow sm:rounded-lg'>
						<div className='px-4 py-5 sm:p-6'>
							<h3 className='text-lg leading-6 font-medium text-gray-900'>
								Your job starts at{' '}
								{helpers.formatAMPM(new Date(job.shiftStart))}
							</h3>
							<div className='mt-2 max-w-xl text-sm text-gray-500'>
								<p>
									Clock in when you arrive at the job location and are ready to
									work.
								</p>
							</div>
							<div className='mt-5'>
								<button
									type='button'
									className='inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm'
								>
									Clock In
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
	// return (
	// 	<div classNameName='bg-yellow-400 h-screen overflow-hidden flex items-center justify-center'>
	// 		<div classNameName='flex bg-white lg:w-5/12 md:6/12 w-10/12 h-1/2 shadow-3xl justify-center justify-items-center'>
	// 			{isLoading ? <p>Loading</p> : <p>{JSON.stringify(data)}</p>}
	// 		</div>
	// 	</div>
	// )
}
