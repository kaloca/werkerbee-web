'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { BASE_URL } from '@/app/utils/constants'
import { JobPosting } from '@/app/hooks/useJobPostings'
import useJobPostingApplications from '@/app/hooks/useJobPostingApplications'
import fetcher from '@/app/utils/fetcher'

export default function CompanyPostsPage({ params }: any) {
	const { data: session, status } = useSession()
	const router = useRouter()

	const {
		data: applications,
		isLoading,
		error,
	} = useJobPostingApplications(params.jobPostingId)

	console.log(applications)

	// useEffect(() => {
	// 	if (status == 'unauthenticated' && !session) {
	// 		// Redirect to another page, e.g., the login page
	// 		router.push('/login')
	// 	}
	// }, [session, status, router])

	return (
		<>
			{!isLoading && (
				<>
					<div className='flex flex-col items-center justify-center bg-blue-300 h-full'>
						{applications != undefined &&
							applications.map((application: any) => (
								<div key={application._id} className='flex flex-col'>
									<span>{application.worker.name}</span>
								</div>
							))}
					</div>
				</>
			)}
		</>
	)
}
