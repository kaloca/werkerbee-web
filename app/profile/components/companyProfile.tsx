'use client'

import React from 'react'

import useUser from '@/app/hooks/useUser'
import { signOut } from 'next-auth/react'

const CompanyProfile = () => {
	const { data, error, isLoading } = useUser()
	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}
	console.log(data)
	return (
		<div className='h-full w-full flex flex-col justify-center items-center'>
			{data.company.name}
			<div
				className='hover:cursor-pointer bg-slate-400 p-4'
				onClick={() => signOut()}
			>
				Sign Out
			</div>
		</div>
	)
}

export default CompanyProfile
