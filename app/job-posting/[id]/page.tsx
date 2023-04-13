'use client'
import React from 'react'
import { useSession } from 'next-auth/react'

import useJobPosting from '@/app/hooks/useJobPosting'
import { JobPosting } from '@/app/hooks/useJobPostings'
import { useErrorBar } from '@/app/context/errorContext'

import apiClient from '@/app/utils/apiClient'

interface JobPostingDetailsPageParams {
	id: string
}

const JobPostingDetailsPage = ({
	params,
}: {
	params: JobPostingDetailsPageParams
}) => {
	const { data, isLoading, error } = useJobPosting(params.id)
	const { data: session } = useSession()
	const { showError } = useErrorBar()

	const handleApply = async () => {
		if (session)
			try {
				const response = await apiClient({
					method: 'post',
					url: `/job-post/${params.id}/apply`,
					token: session.user.token,
				})

				if (response?.status === 200) {
					console.log('Job application submitted successfully')
				} else {
					console.error(
						`Error submitting job application: ${response.data.message}`
					)
				}
			} catch (error: any) {
				console.error(
					'Error submitting job application:',
					error.response.data.message
				)
				showError(error.response.data.message)
			}
	}
	if (isLoading) {
		return <div>Loading Job Posting</div>
	}

	if (error) {
		return <div>Error</div>
	}

	const {
		name,
		description,
		type,
		location,
		dressCode,
		payment,
		companyId,
	}: JobPosting = data.jobPosting

	return (
		<div className='h-full flex flex-col justify-center items-center'>
			<div className='mb-10 border p-10 max-w-lg'>
				<p>{name}</p>
				<p className='first-letter:capitalize'>{type}</p>
				<p className='first-letter:capitalize'>{description}</p>
				<p>{dressCode}</p>
				<p>
					{companyId.address.street}, {companyId.address.city},{' '}
					{companyId.address.state}, {companyId.address.zip}
				</p>
				<p>{payment}</p>
			</div>
			<button
				onClick={handleApply}
				className='group rounded-2xl h-12 w-48 bg-green-500 font-bold text-lg text-white relative overflow-hidden'
			>
				Apply
				<div className='absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl'></div>
			</button>
		</div>
	)
}

export default JobPostingDetailsPage
