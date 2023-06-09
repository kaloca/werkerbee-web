'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { BASE_URL } from '@/src/utils/constants'
import useCompanyPosts from '@/src/hooks/useCompanyPosts'
import { JobPosting } from '@/src/interfaces/models/JobPosting'

export default function JobPostsPage() {
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
		<div className='px-4 sm:px-6 lg:px-80 pt-24'>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-xl font-semibold text-gray-900'>Job Posts</h1>
					<p className='mt-2 text-sm text-gray-700'>
						A list of the job posts in your account including their name, date,
						role and number of applications.
					</p>
				</div>
				<div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
					<button
						type='button'
						className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
						onClick={() => router.push('create-job-posting')}
					>
						Post a new job
					</button>
				</div>
			</div>
			<div className='-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg'>
				<table className='min-w-full divide-y divide-gray-300'>
					<thead className='bg-gray-50'>
						<tr>
							<th
								scope='col'
								className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
							>
								Name
							</th>
							<th
								scope='col'
								className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell'
							>
								Date
							</th>

							<th
								scope='col'
								className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
							>
								Role
							</th>
							<th
								scope='col'
								className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell'
							>
								Applications
							</th>
							<th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-6'>
								<span className='sr-only'>Edit</span>
							</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-200 bg-white'>
						{posts && posts.length > 0 ? (
							posts.map((post) => (
								<tr
									key={post.name}
									className='hover:bg-slate-50 hover:cursor-pointer'
									onClick={() =>
										router.push(
											post.job
												? `/company/jobs/${post.job._id}`
												: `posts/${post._id}`
										)
									}
								>
									<td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
										{post.job && (
											<span className='mr-5 py-2 px-3 bg-blue-200 text-blue-900 rounded-2xl'>
												Ongoing
											</span>
										)}
										{post.name}
									</td>
									<td className='hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell'>
										{new Date(post.start).toLocaleString()}
									</td>
									<td className='hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell capitalize'>
										{post.type}
									</td>
									<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
										{post.applications.length}
									</td>
									<td className='whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
										{post.job.status == 'PENDING' ? (
											<a
												onClick={() =>
													router.push(`/company/jobs/${post.job._id}`)
												}
												className='text-indigo-600 hover:text-indigo-900 z-50 p-2'
											>
												View Job<span className='sr-only'>, {post.name}</span>
											</a>
										) : (
											<a
												onClick={() => router.push(`posts/${post._id}/edit`)}
												className='text-indigo-600 hover:text-indigo-900'
											>
												Edit<span className='sr-only'>, {post.name}</span>
											</a>
										)}
									</td>
								</tr>
							))
						) : (
							<div className='p-5'>
								You don&apos;t have any ongoing job posts
							</div>
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}
