'use client'
import React from 'react'

import useApplications from '@/src/hooks/useApplications'

const Applications = () => {
	const { data, error, isLoading } = useApplications()

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}

	if (data && data.length == 0) {
		return <div>No current job applications</div>
	}

	console.log(data)

	return (
		<div className='flex flex-col justify-center items-center h-full'>
			{data &&
				data.map((application) => (
					<div
						key={application._id}
						className='w-full max-w-md  my-2 bg-white rounded-3xl shadow-xl overflow-hidden'
					>
						<div className='max-w-md mx-auto'>
							<div className='p-4 sm:p-6'>
								<p className='font-bold text-gray-700 text-[22px] leading-7 mb-1'>
									{application.jobPosting.name}
								</p>
								<div className='flex flex-row'>
									<p className='text-[#3C3C4399] text-[17px] mr-2 '>
										{application.status}
									</p>
								</div>
							</div>
						</div>
					</div>
				))}
		</div>
	)
}

export default Applications
