'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import useJobPostingWorker from '@/src/hooks/useJobPostingWorker'
import { JobPosting } from '@/src/interfaces/models/JobPosting'
import { useErrorBar } from '@/src/app/context/errorContext'

import apiClient from '@/src/utils/apiClient'

interface JobPostingDetailsPageParams {
	id: string
}

const JobPostingDetailsPage = ({
	params,
}: {
	params: JobPostingDetailsPageParams
}) => {
	const { data, isLoading, error } = useJobPostingWorker(params.id)
	const { data: session } = useSession()
	const { showError } = useErrorBar()

	const router = useRouter()

	const handleApply = async () => {
		if (data?.alreadyApplied) {
			router.push('/applications')
			return
		}
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
		else {
			router.push('/login')
		}
	}
	if (isLoading) {
		return <div>Loading Job Posting</div>
	}

	if (error) {
		return <div>Error</div>
	}
	console.log(data)

	const {
		name,
		description,
		type,
		location,
		dressCode,
		payment,
		company,
	}: JobPosting = data!.jobPosting

	interface Point {
		coordinates : Array<string> 
	}
	const locationVal = location as unknown as Point
	const longitude = parseFloat(locationVal.coordinates[0])
	const latitude = parseFloat(locationVal.coordinates[1])//Prevent XSS attacks

	return (
		<div className='h-full flex flex-col justify-center items-center'>
			{data && (
				<div className='flex flex-col'>
					<div className='flex flex-row p-4'>
						<div className='mb-10 border p-10 max-w-lg rounded-md'>
							<p>{name}</p>
							<p className='first-letter:capitalize'>{type}</p>
							<p className='first-letter:capitalize'>{description}</p>
							<p>{dressCode}</p>
							<p>
								{company.address.street}, {company.address.city},{' '}
								{company.address.state}, {company.address.zip}
							</p>
							<p>{payment}</p>
						</div>
						<div className='mb-10 border max-w-lg rounded-md'>
							<iframe
								width = "100%"
								height = "100%"
								loading = "lazy"
								allowFullScreen
								referrerPolicy='no-referrer-when-downgrade'
								src = {`https://www.google.com/maps/embed/v1/place?key=AIzaSyAz8G543ARWTI1FDO40cpRTvwdw0HQT0Pg
								&q=${latitude + ', ' + longitude}`}
							/>
						</div>
					</div>
					<button
							onClick={handleApply}
							className='group rounded-2xl h-12 w-48 bg-green-500 font-bold text-lg text-white relative overflow-hidden self-center'
						>
							{data.alreadyApplied ? 'View Application' : 'Apply'}
							<div className='absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl'></div>
					</button>
				</div>
			)}
		</div>
	)
}

export default JobPostingDetailsPage
