'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import useJobPostings, { JobPosting } from '../hooks/useJobPostings'

import JobPostingCard from './components/jobPostingCard'

const JobPostingsList = () => {
	const [currentPage, setCurrentPage] = useState(1)

	const { data: session } = useSession()
	const { data, error, isLoading } = useJobPostings(currentPage, 10)

	const router = useRouter()

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1)
		}
	}

	const handleNextPage = () => {
		if (currentPage < data.totalPages) {
			setCurrentPage(currentPage + 1)
		}
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}

	const handleApply = (id: string) => {
		router.push(`job-posting/${id}`)
	}

	return (
		<div className='flex flex-col w-full h-full bg-slate-300 items-center justify-between pt-20 overflow-scroll'>
			<ul className=''>
				{data.jobPostings.map((job: JobPosting) => (
					<JobPostingCard
						key={job._id}
						jobPosting={job}
						handleApply={handleApply}
						showApply={session?.user.type == 'worker'}
					/>
				))}
			</ul>
			<div className='flex flex-row mb-5 w-1/4 justify-evenly'>
				<button onClick={handlePrevPage} disabled={currentPage === 1}>
					Previous
				</button>
				<span>
					Page {currentPage} of {data.totalPages}
				</span>
				<button
					onClick={handleNextPage}
					disabled={currentPage === data.totalPages}
				>
					Next
				</button>
			</div>
		</div>
	)
}

export default JobPostingsList
