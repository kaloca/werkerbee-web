'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { PulseLoader, SyncLoader } from 'react-spinners'

import apiClient from '@/src/utils/apiClient'

import { JobPosting } from '@/src/interfaces/models/JobPosting'
import useApplications, { JobApplication } from '@/src/hooks/useApplications'

import { useSnackbar } from '@/src/app/context/snackbarContext'
import AcceptDeclineModal from '@/src/components/AcceptDeclineModal'

import JobApplicationCard from './components/JobApplicationCard'
import ApplicationStatusSelector from './components/ApplicationStatusSelector'

const Applications = () => {
	const { data: session, status } = useSession()
	const router = useRouter()
	const { showSnackbar } = useSnackbar()

	useEffect(() => {
		if (status == 'unauthenticated' && !session) {
			// Redirect to another page, e.g., the login page
			router.push('/login')
		}
	}, [session, status, router])

	const [acceptJobModalOpen, setAcceptJobModalOpen] = useState(false)
	const [confirmJobLoading, setConfirmJobLoading] = useState(false)
	const [chosenJob, setChosenJob] = useState<{
		jobPosting: JobPosting
		applicationId: string
	} | null>(null)
	const [currentView, setCurrentView] = useState('View')

	const { data, pagination, error, isLoading, setPage, refetch } =
		useApplications()

	const handleChangeView = (option: string) => {
		setCurrentView(option)

		const status =
			option == 'All' || option == 'View' ? undefined : option.toUpperCase()

		refetch(status, false)
	}

	const handleConfirmJobButton = (
		jobPosting: JobPosting,
		applicationId: string
	) => {
		setChosenJob({
			jobPosting,
			applicationId,
		})
		setAcceptJobModalOpen(true)
	}

	const handleClickStatus = (status: string, id: string) => {
		if (status == 'SCHEDULED') router.push(`/calendar`)
	}

	const onConfirmJob = async () => {
		if (session) {
			try {
				setConfirmJobLoading(true)
				const response = await apiClient({
					method: 'post',
					url: `/job-application/${chosenJob?.applicationId}/confirm`,
					token: session.user.token,
				})

				if (response?.status === 200) {
					console.log('Job confirmed successfully')
					// Copy the current applications
					// let updatedApplications = [...applications]

					// // Find the clicked application in the applications array and update its status
					// for (let application of updatedApplications) {
					// 	if (application._id === applicationId) {
					// 		application.status = decision // or whatever status is appropriate here
					// 	}
					// }

					// Update the state with the updated applications
					refetch()
				} else {
					console.error(`Error confirming job: ${response.data.message}`)
				}
			} catch (error: any) {
				console.error('Error confirming job:', error.response.data.message)
				showSnackbar(
					'error',
					`Error confirming job: ${error.response.data.message}`
				)
			}
			setConfirmJobLoading(false)
		}
	}

	return (
		<div className='flex flex-col justify-start items-center h-full pt-20 bg-slate-200'>
			<AcceptDeclineModal
				title='Confirm job?'
				subtitle={`Confirming this job will notify the company of your availability and add "${chosenJob?.jobPosting.name}" to your current jobs.`}
				isOpen={acceptJobModalOpen}
				setOpen={setAcceptJobModalOpen}
				option1Title='Cancel'
				option2Title='Confirm'
				option2Action={onConfirmJob}
				loading={confirmJobLoading}
			/>
			<div className='pb-4 mb-3 border-b w-1/3 border-gray-400 sm:flex sm:items-center sm:justify-between'>
				<h3 className='text-lg leading-6 font-medium text-gray-900'>
					Your Applications
				</h3>
				<ApplicationStatusSelector
					onChoose={handleChangeView}
					currentView={currentView}
				/>
			</div>
			<div className='bg-blue-300'></div>
			<div className='overflow-scroll no-scrollbar'>
				{!isLoading &&
					!error &&
					(data && data.length > 0 ? (
						data.map((application) => (
							<JobApplicationCard
								key={application._id}
								application={application}
								onConfirmJobButton={handleConfirmJobButton}
								onClickStatus={handleClickStatus}
								onClickJobTitle={(id: string) =>
									router.push(`/job-posting/${id}`)
								}
							/>
						))
					) : (
						<div>
							<span>No current applications</span>
						</div>
					))}
				{isLoading && (
					<div className='inline-flex justify-center items-center'>
						<h3 className='font-semibold'>Loading applications</h3>
						<PulseLoader size={6} className='mt-1 mx-4' />
					</div>
				)}
				{error && (
					<div>
						<span className='mr-4'>{error.message}</span>
						<span
							onClick={() => router.replace('/applications')}
							className='text-blue-600 hover:underline hover:cursor-pointer'
						>
							Try again
						</span>
					</div>
				)}
			</div>
		</div>
	)
}

export default Applications
