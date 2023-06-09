'use client'
import React from 'react'

import useApplications from '@/src/hooks/useApplications'
import JobApplicationCard from './components/JobApplicationCard'
import { SyncLoader } from 'react-spinners'

const Applications = () => {
	const { data, error, isLoading } = useApplications()

	if (error) {
		return <div>Error: {error.message}</div>
	}

	console.log(data)

	return (
		<div className='flex flex-col justify-center items-center h-full bg-slate-300'>
			{!isLoading &&
				(data && data.length > 0 ? (
					data.map((application) => (
						<JobApplicationCard
							key={application._id}
							application={application}
						/>
					))
				) : (
					<div>
						<span>No current applications</span>
					</div>
				))}
			{isLoading && (
				<div className='flex justify-center items-start'>
					<h3>Loading applications</h3>
					<SyncLoader size={8} className='m-4' />
				</div>
			)}
		</div>
	)
}

export default Applications
