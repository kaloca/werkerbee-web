'use client'

import React from 'react'

import useUser from '@/app/hooks/useUser'
import { signOut } from 'next-auth/react'

import ProfileCard from './components/companyProfileCard'

const CompanyProfile = () => {
	const { data, error, isLoading } = useUser()
	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}

	return (
		<div className='h-full w-full flex flex-col justify-start items-center pt-28'>
			<ProfileCard
				name={data.company.name}
				description={data.company.description || 'description'}
				rating={data.company.rating}
				address={data.company.address}
				jobTypes={data.company.jobTypes}
			/>
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
