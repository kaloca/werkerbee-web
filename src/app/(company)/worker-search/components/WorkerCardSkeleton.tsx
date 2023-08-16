import React from 'react'
import Image from 'next/image'

import { Skeleton } from '@mui/material'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'

const WorkerCardSkeleton = () => {
	return (
		<li className='col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200'>
			<div className='w-full flex items-center justify-between p-6 space-x-6 hover:bg-gray-100 hover:cursor-pointer rounded-t-lg'>
				<div className='flex-1 truncate'>
					<div className='flex items-center space-x-3'>
						<h3 className='text-gray-900 text-sm font-medium truncate'>
							<Skeleton height={20} className='w-32' />
						</h3>
						<span className='flex-shrink-0 inline-block px-2 py-0.5 text-gray-800 text-xs font-medium bg-gray-100 rounded-full'>
							{'   '}
						</span>
					</div>
					<p className='mt-1 text-gray-500 text-sm truncate'>
						<Skeleton height={20} className='w-44' />
					</p>
				</div>
				<Skeleton height={60} className='w-16' variant='circular' />
			</div>
			<div>
				<div className='-mt-px flex divide-x divide-gray-200'>
					<div className='w-0 flex-1 flex'>
						<div className='relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500'>
							<EnvelopeIcon
								className='w-5 h-5 text-gray-400'
								aria-hidden='true'
							/>
							<span className='ml-3'>Email</span>
						</div>
					</div>
					<div className='-ml-px w-0 flex-1 flex'>
						<div className='relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500'>
							<PhoneIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
							<span className='ml-3'>Call</span>
						</div>
					</div>
				</div>
			</div>
		</li>
	)
}

export default WorkerCardSkeleton
