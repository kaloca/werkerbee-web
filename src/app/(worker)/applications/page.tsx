'use client'
import React from 'react'

import useApplications from '@/src/hooks/useApplications'
import JobApplicationCard from './components/JobApplicationCard'

const Applications = () => {
	const { data, error, isLoading } = useApplications()

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}

	console.log(data)

	return (
		<div className='flex flex-col justify-center items-center h-full bg-slate-300'>
			{data && data.length > 0 ? (
				data.map((application) => (
					<JobApplicationCard key={application._id} application={application} />
				))
			) : (
				<div>
					<span>No current applications</span>
				</div>
			)}
		</div>
	)
}

export default Applications
