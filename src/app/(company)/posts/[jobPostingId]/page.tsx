'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useErrorBar } from '@/src/app/context/errorContext'

import useJobPostingApplications from '@/src/hooks/useJobPostingApplications'
import apiClient from '@/src/utils/apiClient'

import TopBar from './components/TopBar'
import List from './components/List'
import { BASE_URL } from '@/src/utils/constants'
import fetcher from '@/src/utils/fetcher'
import useSWR from 'swr'
import { PulseLoader } from 'react-spinners'

export default function CompanyPostsPage({ params }: any) {
	const { data: session, status } = useSession()
	const router = useRouter()
	const { showError } = useErrorBar()
	const {
		data: applications,
		jobName,
		isLoading,
		error,
		mutate,
	} = useJobPostingApplications(params.jobPostingId)

	// console.log(applications)
	const onApplicationUpdate = async (
		decision: 'ACCEPTED' | 'REJECTED',
		applicationId: string
	) => {
		if (session) {
			try {
				const response = await apiClient({
					method: decision == 'ACCEPTED' ? 'post' : 'put',
					url: `/job-application/${applicationId}/${
						decision == 'ACCEPTED' ? 'accept' : 'status'
					}`,
					token: session.user.token,
					data: {
						status: decision,
					},
				})

				if (response?.status === 200) {
					console.log('Job application status updated successfully')
					// Copy the current applications
					let updatedApplications = [...applications]

					// Find the clicked application in the applications array and update its status
					for (let application of updatedApplications) {
						if (application._id === applicationId) {
							application.status = decision // or whatever status is appropriate here
						}
					}

					// Update the state with the updated applications
					mutate()
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

	const handleEdit = () => {
		router.push(`posts/${params.jobPostingId}/edit`)
	}

	return (
		<div className='py-20 w-screen bg-slate-100 md:px-14 lg:px-20 xl:px-64 h-full'>
			<TopBar
				jobName={jobName || ''}
				numberOfPages={1}
				numberPerPage={applications ? applications.length : 0}
				totalApplications={20}
				handleEdit={handleEdit}
			/>
			{applications && applications.length > 0 && (
				<List
					applications={applications}
					onApplicationUpdate={onApplicationUpdate}
				/>
			)}
			{!isLoading && applications?.length == 0 && (
				<div>
					<span>This job has no current applications</span>
				</div>
			)}
			{!applications && isLoading && (
				<div className='inline-flex justify-center w-full items-center'>
					<span>Loading applications</span>
					<PulseLoader size={5} className='ml-2' />
				</div>
			)}
			{error && (
				<div>
					<span>
						There was an error loading the applications. Please reload the page
					</span>
				</div>
			)}
		</div>
	)
}
