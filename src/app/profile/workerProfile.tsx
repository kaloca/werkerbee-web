'use client'

import React, { Suspense } from 'react'
import { signOut } from 'next-auth/react'

import useUser from '@/src/hooks/useUser'
// import Applications from './components/applications'
import ProfileCard from './components/workerProfileCard'
import EditProfilePictureModal from '@/src/components/EditProfilePicture'

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
			{/* <EditProfilePictureModal /> */}
			<ProfileCard
				name={data.worker.name}
				bio={data.worker.bio}
				rating={data.worker.rating}
				address={data.worker.address}
				jobTypes={data.worker.jobTypes}
				profilePicture={data.worker.profilePicture}
			/>
			{/* <div className='flex'>
				<Suspense fallback={<div>Loading Applications</div>}>
					<Applications />
				</Suspense>
			</div> */}
		</div>
	)
}

export default WorkerProfile
