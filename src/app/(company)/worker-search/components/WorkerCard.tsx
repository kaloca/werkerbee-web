import React from 'react'
import Image from 'next/image'

import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'

import helpers from '@/src/utils/helpers'

import BlankProfilePicture from '@/src/assets/blank_profile_pic.webp'

import { UseWorkerSearchWorker } from '../hooks/useWorkerSearch'

interface WorkerCardProps {
	worker: UseWorkerSearchWorker
	onClickWorker: (username: string) => void
}

const WorkerCard: React.FC<WorkerCardProps> = ({ worker, onClickWorker }) => {
	const distanceInMiles = parseFloat((worker.distance * 0.000621371).toFixed(1))

	return (
		<li
			key={worker.email}
			className='col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200'
		>
			<a
				href={`/worker/${worker.username}`}
				className='w-full flex items-center justify-between p-6 space-x-6 hover:bg-gray-100 hover:cursor-pointer rounded-t-lg'
			>
				<div className='flex-1 truncate'>
					<div className='flex items-center space-x-3'>
						<h3 className='text-gray-900 text-sm font-medium truncate'>
							{worker.name}
						</h3>
						<span className='flex-shrink-0 inline-block px-2 py-0.5 text-gray-800 text-xs font-medium bg-gray-100 rounded-full'>
							{distanceInMiles < 5000
								? `${distanceInMiles} miles`
								: 'No Location'}
						</span>
					</div>
					<p className='mt-1 text-gray-500 text-sm truncate'>
						{helpers.formatArrayToString(
							worker.jobTypesIds.map((jobType) => jobType.type),
							38
						)}
					</p>
				</div>
				<Image
					className='w-10 h-10 bg-gray-300 rounded-full flex-shrink-0'
					src={worker.profilePicture || BlankProfilePicture}
					alt='worker-profile-picture'
					width={150}
					height={150}
				/>
			</a>
			<div>
				<div className='-mt-px flex divide-x divide-gray-200'>
					<div className='w-0 flex-1 flex'>
						<a
							href={`mailto:${worker.email}`}
							className='relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500'
						>
							<EnvelopeIcon
								className='w-5 h-5 text-gray-400'
								aria-hidden='true'
							/>
							<span className='ml-3'>Email</span>
						</a>
					</div>
					<div className='-ml-px w-0 flex-1 flex'>
						<a
							href={`tel:${worker.phoneNumber}`}
							className='relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500'
						>
							<PhoneIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
							<span className='ml-3'>Call</span>
						</a>
					</div>
				</div>
			</div>
		</li>
	)
}

export default WorkerCard
