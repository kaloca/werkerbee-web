'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useErrorBar } from '@/app/context/errorContext'

import { BASE_URL } from '@/app/utils/constants'
import { JobPosting } from '@/app/hooks/useJobPostings'
import useJobPostingApplications from '@/app/hooks/useJobPostingApplications'
import fetcher from '@/app/utils/fetcher'
import apiClient from '@/app/utils/apiClient'

export default function CompanyPostsPage({ params }: any) {
	const { data: session, status } = useSession()
	const router = useRouter()
	const { showError } = useErrorBar()
	const {
		data: applications,
		isLoading,
		error,
		mutate,
	} = useJobPostingApplications(params.jobPostingId)

	const onAccept = async (applicationId: string) => {
		if (session) {
			try {
				const response = await apiClient({
					method: 'post',
					url: `/job-application/${applicationId}/accept`,
					token: session.user.token,
				})

				if (response?.status === 200) {
					console.log('Job application accepted successfully')
					// Copy the current applications
					let updatedApplications = [...applications]

					// Find the clicked application in the applications array and update its status
					for (let application of updatedApplications) {
						if (application._id === applicationId) {
							application.status = 'ACCEPTED' // or whatever status is appropriate here
						}
					}

					// Update the state with the updated applications
					mutate(updatedApplications, false)
					router.replace(window.location.pathname)
				} else {
					console.error(
						`Error accepting job application: ${response.data.message}`
					)
				}
			} catch (error: any) {
				console.error(
					'Error accepting job application:',
					error.response.data.message
				)
				showError(error.response.data.message)
			}
		}
	}

	return (
		<>
			{!isLoading && (
				<>
					<div className='flex flex-col items-center justify-center bg-blue-300 h-full'>
						{applications != undefined &&
							applications.map((application: any) => (
								<div key={application._id} className='flex flex-col'>
									<div className='flex flex-row items-center'>
										<span>{application.worker.name}</span>
										<div
											className='p-2 bg-green-300 ml-5 hover:cursor-pointer'
											onClick={() => onAccept(application._id)}
										>
											<span>Accept</span>
										</div>
									</div>
									<span className='first-letter:uppercase lowercase'>
										{application.status}
									</span>
								</div>
							))}
					</div>
				</>
			)}
		</>
	)
}
