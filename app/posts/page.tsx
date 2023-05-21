'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { BASE_URL } from '@/app/utils/constants'
import useCompanyPosts from '@/app/hooks/useCompanyPosts'
import { JobPosting } from '@/app/hooks/useJobPostings'
import JobPostCard from './components/JobPostCard'

export default function CompanyPostsPage({ params }: any) {
	const { data: session, status } = useSession()
	const router = useRouter()

	useEffect(() => {
		if (status == 'unauthenticated' && !session) {
			// Redirect to another page, e.g., the login page
			router.push('/login')
		}
	}, [session, status, router])

	const {
		data: posts,
		isLoading,
		error,
	} = useCompanyPosts(session?.user.username || '')

	const handleClickJobPost = (jobPostingId: string) => {
		router.push(`/posts/${jobPostingId}`)
	}

	return (
		<>
			{!isLoading && (
				<>
					{session?.user.type === 'company' ? (
						<div className='h-full w-full flex flex-col justify-center items-center bg-blue-50'>
							{posts.map((post: JobPosting) => (
								<JobPostCard
									onClick={handleClickJobPost}
									key={post._id}
									post={post}
								/>
							))}
						</div>
					) : (
						<div className='flex flex-col justify-center items-center bg-blue-50'>
							Worker view
						</div>
					)}
				</>
			)}
		</>
	)
}
