'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { BASE_URL } from '@/src/utils/constants'
import useJobs, { Job } from '@/src/hooks/useJobs'

import JobCard from './components/JobCard'

export default function MyJobsPage({ params }: any) {
	const { data: session, status } = useSession()
	const router = useRouter()

	useEffect(() => {
		if (status == 'unauthenticated' && !session) {
			// Redirect to another page, e.g., the login page
			router.push('/login')
		}
	}, [session, status, router])

	const {
		data: jobs,
		isLoading,
		// mutate,
	} = useJobs(session?.user.username || '')

	console.log(jobs)

	const handleClickJobPost = (jobPostingId: string) => {
		router.push(`/posts/${jobPostingId}`)
	}

	return (
		<>
			{isLoading && (
				<div>
					<span>Loading</span>
				</div>
			)}
			{!isLoading && jobs && jobs.length > 0 && (
				<>
					{session?.user.type === 'worker' ? (
						<div className='h-full w-full flex flex-col justify-center items-center bg-blue-50'>
							{jobs.map((job: Job) => (
								<JobCard key={job._id} job={job} />
							))}
						</div>
					) : (
						<div className='flex flex-col justify-center items-center bg-blue-50 h-full w-full'>
							Company view
						</div>
					)}
				</>
			)}
			{!isLoading && (!jobs || jobs.length == 0) && (
				<div className='w-full flex justify-center pt-32'>
					<span>You have no current jobs.</span>
					<span
						className='ml-2 text-blue-600 underline hover:cursor-pointer h-min'
						onClick={() => router.push('/jobs')}
					>
						Search for jobs
					</span>
				</div>
			)}
		</>
	)
}
