'use client'

import React from 'react'

import useUser from '@/app/hooks/useUser'
import { signOut } from 'next-auth/react'

const WorkerProfile = () => {
	const { data, error, isLoading } = useUser()
	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}
	return (
		<div className='h-screen w-full flex flex-col justify-center items-center'>
			{data.worker.bio}
			<div
				className='hover:cursor-pointer bg-slate-400 p-4'
				onClick={() => signOut()}
			>
				Sign Out
			</div>
		</div>
	)
}

export default WorkerProfile
