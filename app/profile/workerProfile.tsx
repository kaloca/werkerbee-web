'use client'

import React, { Suspense } from 'react'
import { signOut } from 'next-auth/react'

import useUser from '@/app/hooks/useUser'
import Applications from './components/applications'

const WorkerProfile = () => {
	const { data, error, isLoading } = useUser()
	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}
	return (
		<div className='h-screen w-full flex flex-col pt-20 items-center bg-slate-300'>
			<p>{data.worker.name}</p>
			<p>{data.worker.bio}</p>
			<div className='flex flex-row'>
				{data.worker.jobTypes.map((type: string) => (
					<p className='mx-2' key={type}>
						{type}
					</p>
				))}
			</div>
			<div>
				<Suspense fallback={<div>Loading Applications</div>}>
					<Applications />
				</Suspense>
			</div>
		</div>
	)
}

export default WorkerProfile
