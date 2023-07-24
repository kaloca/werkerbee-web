'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

import useJobs, { UseJobsResponse } from '@/src/hooks/useJobs'

import RatingModal, { RatingOptions } from './components/RatingModal'
import Image from 'next/image'
import { Rating } from '@mui/material'
import JobHistoryCard from './components/JobHistoryCard'
import JobHistoryCardSkeleton from './components/JobHistoryCardSkeleton'

export default function JobHistoryPage() {
	const { data: session } = useSession()
	const [ratingModalOpen, setRatingModalOpen] = useState(false)

	const [ratingOptions, setRatingOptions] = useState<RatingOptions>({
		rateeId: '',
		jobId: '',
		jobPostingId: '',
		ratingType: session?.user.type == 'worker' ? 'company' : 'worker',
	})
	const {
		data: jobs,
		isLoading,
		error,
		mutateData: mutate,
	} = useJobs(session?.user.username || '')

	const handleClickChangeRating = (job: UseJobsResponse) => {
		setRatingOptions({
			...ratingOptions,
			rateeId: job.companyId._id,
			jobId: job._id,
			jobPostingId: job.jobPostingId._id,
			currentReview: job.workerRating?.review,
			currentRating: job.workerRating?.rating,
			ratingId: job.workerRating?._id,
			name: job.name,
		})
		setRatingModalOpen(true)
	}

	return (
		<div className='bg-white'>
			<main className='max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:pt-24 sm:pb-32 lg:px-8'>
				<RatingModal
					isOpen={ratingModalOpen}
					setOpen={(value: boolean) => setRatingModalOpen(value)}
					ratingData={ratingOptions}
					mutate={mutate}
				/>
				<div className='max-w-xl'>
					<h1 className='text-3xl font-extrabold tracking-tight text-gray-900'>
						Job History
					</h1>
					<p className='mt-2 text-sm text-gray-500'>
						Check the status of recent jobs, manage reviews, and discover
						similar jobs.
					</p>
				</div>

				<div className='mt-12 space-y-16 sm:mt-16'>
					{jobs &&
						jobs.map((job) => (
							<JobHistoryCard
								job={job}
								key={job._id}
								onClickChangeRating={handleClickChangeRating}
							/>
						))}
					{isLoading && (
						<div>
							<JobHistoryCardSkeleton />
							<JobHistoryCardSkeleton />
						</div>
					)}
				</div>
			</main>
		</div>
	)
}
