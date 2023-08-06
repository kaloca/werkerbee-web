'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { notFound, useRouter } from 'next/navigation'

import Image from 'next/image'
import { Skeleton } from '@mui/material'
import {
	CheckBadgeIcon,
	EnvelopeIcon,
	PencilIcon,
	PhoneIcon,
} from '@heroicons/react/24/solid'

import useWorker from '@/src/hooks/useWorker'
import helpers from '@/src/utils/helpers'

import BlankProfilePic from '@/src/assets/blank_profile_pic.webp'
import PastExperiencesModal from './components/PastExperiencesModal'

const classNames = helpers.classNames

const profile = {
	name: 'Ricardo Cooper',
	email: 'ricardo.cooper@example.com',
	avatar:
		'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
	backgroundImage:
		'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
	fields: [
		['Phone', '(555) 123-4567'],
		['Email', 'ricardocooper@example.com'],
		['Title', 'Senior Front-End Developer'],
		['Team', 'Product Development'],
		['Location', 'San Francisco'],
		['Sits', 'Oasis, 4th floor'],
		['Salary', '$145,000'],
		['Birthday', 'June 8, 1990'],
	],
}

const stats = [
	{
		name: 'Job Types',
		stat: '71,897',
		previousStat: '70,946',
		change: '12%',
		changeType: 'increase',
	},
	{
		name: 'Certifications',
		stat: '58.16%',
		previousStat: '56.14%',
		change: '2.02%',
		changeType: 'increase',
	},
	{
		name: 'Completed Jobs',
		stat: '24.57%',
		previousStat: '28.62%',
		change: '4.05%',
		changeType: 'decrease',
	},
]

export default function WorkerProfilePage({ params }: any) {
	const { data: session } = useSession()
	const router = useRouter()

	const {
		data: worker,
		isLoading,
		mutate,
		error,
	} = useWorker(params.workerUsername)
	const [showJobTypes, setShowJobTypes] = useState(true)
	const [showCertifications, setShowCertifications] = useState(true)
	const [showPastExperiences, setShowPastExperiences] = useState(false)

	if (error || (!isLoading && !worker)) {
		notFound()
	}

	return (
		<div>
			{showPastExperiences && (
				<PastExperiencesModal
					experiences={worker?.experiences}
					closeModal={() => setShowPastExperiences(false)}
					edit={session?.user.username == params.workerUsername}
					session={session || undefined}
					mutate={mutate}
				/>
			)}
			<div>
				<img
					className='h-32 w-full object-cover lg:h-48'
					src={profile.backgroundImage}
					alt=''
				/>
			</div>
			<div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5'>
					<div className='flex'>
						<Image
							className='h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32'
							src={worker?.profilePicture || BlankProfilePic}
							alt='profile-pic'
							width={150}
							height={150}
						/>
						{session && session.user.username == params.workerUsername && (
							<div
								onClick={() => router.push('/edit-profile-picture')}
								className='absolute sm:ml-24 sm:mt-24 ml-16 mt-16 bg-indigo-400 hover:bg-indigo-200 p-2 text-white rounded-full hover:cursor-pointer'
							>
								<PencilIcon className='h-4' />
							</div>
						)}
					</div>
					<div className='md:mt-14 sm:mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1'>
						<div className='sm:hidden md:block mt-6 min-w-0 flex-1'>
							<div className='flex flex-col'>
								<h1 className='text-2xl font-bold text-gray-900 truncate'>
									{worker?.name}
								</h1>
								<h2>
									{worker?.address.city}, {worker?.address.state}
								</h2>
							</div>
						</div>
						<div className='mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4'>
							<button
								type='button'
								onClick={() => setShowPastExperiences(true)}
								className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								<span>
									{session && session.user.username == params.workerUsername
										? 'Modify '
										: ''}
									Past Experiences
								</span>
							</button>
							{/* <button
								type='button'
								className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
							>
								<PhoneIcon
									className='-ml-1 mr-2 h-5 w-5 text-gray-400'
									aria-hidden='true'
								/>
								<span>Call</span>
							</button> */}
						</div>
					</div>
				</div>
				<div className='hidden sm:block md:hidden mt-6 min-w-0 flex-1'>
					<h1 className='text-2xl font-bold text-gray-900 truncate'>
						{worker?.name}
					</h1>
				</div>
			</div>

			<div className='flex flex-col xl:px-64 lg:px-44 md:px-20 mt-6'>
				<div>
					<dl className='mb-4 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x'>
						<div
							className='px-4 py-5 sm:p-6 hover:bg-gray-100'
							onClick={() => setShowJobTypes(!showJobTypes)}
						>
							<dt className='text-base font-normal text-gray-900'>
								Qualified Job Types
							</dt>
							<dd className='mt-1 flex justify-between items-baseline md:block lg:flex'>
								<div className='flex items-baseline text-2xl font-semibold text-indigo-600'>
									{isLoading ? (
										<Skeleton className='h-5' />
									) : (
										worker?.jobTypesIds.length
									)}
								</div>
							</dd>
						</div>
						<div
							className='px-4 py-5 sm:p-6 hover:bg-gray-100'
							onClick={() => setShowCertifications(!showCertifications)}
						>
							<dt className='text-base font-normal text-gray-900'>
								Certifications
							</dt>
							<dd className='mt-1 flex justify-between items-baseline md:block lg:flex'>
								<div className='flex items-baseline text-2xl font-semibold text-indigo-600'>
									{worker?.certifications?.length}
								</div>
							</dd>
						</div>
						<div className='px-4 py-5 sm:p-6 hover:bg-gray-100'>
							<dt className='text-base font-normal text-gray-900'>
								Completed Jobs
							</dt>
							<dd className='mt-1 flex justify-between items-baseline md:block lg:flex'>
								<div className='flex items-baseline text-2xl font-semibold text-indigo-600'>
									{worker?.completedJobs}
								</div>
							</dd>
						</div>
					</dl>
				</div>
				<div className='flex flex-row w-full'>
					<div className='flex flex-col space-y-2 w-1/3 px-2'>
						{showJobTypes && (
							<>
								{worker?.jobTypesIds.map((jobType) => (
									<div
										key={jobType._id}
										className='flex flex-row items-center justify-between px-3 py-1.5 border rounded w-full'
									>
										<p className='capitalize'>{jobType.type}</p>
										<CheckBadgeIcon className='h-5 ml-1 text-indigo-400' />
									</div>
								))}
							</>
						)}
					</div>

					<div className='flex flex-col space-y-2 w-1/3 px-2'>
						{showCertifications && (
							<>
								{worker?.certifications?.map((certification) => (
									<div
										key={certification.certification}
										className='flex flex-row items-center justify-between px-3 py-1.5 border rounded w-full'
									>
										<p className='capitalize'>
											<span className='font-bold text-gray-500'>
												{certification.organization}
											</span>
											<span> - </span>
											<span>{certification.certification}</span>
										</p>
										{/* <CheckBadgeIcon className='h-5 ml-1 text-indigo-400' /> */}
									</div>
								))}
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
