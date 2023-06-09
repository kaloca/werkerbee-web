import useSWR from 'swr'
import { useCallback, useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'

import fetcher from '../utils/fetcher'
import { BASE_URL } from '@/src/utils/constants'

import { JobPosting } from './useJobPostings'
import { ICompany } from './useCompany'
import { Worker } from './useUser'

export interface JobApplication {
	_id: string
	company: ICompany
	worker: Worker
	jobPosting: JobPosting
	status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELED' | 'SCHEDULED'
}

interface ApplicationsResponse {
	applications: JobApplication[]
	pagination: {
		currentPage: number
		totalApplications: number
		totalPage: number
	}
}

const useApplications = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState<ApplicationsResponse | null>(null)
	const [error, setError] = useState<Error | null>(null)
	const [page, setPage] = useState(1)

	const { data: session } = useSession()
	const applicationsUrl = `${BASE_URL}/worker/${session?.user.username}/applications`

	const refetch = useCallback(
		async (status?: string) => {
			if (session) {
				setIsLoading(true)
				const url = new URL(applicationsUrl)
				url.searchParams.append('page', String(page))
				url.searchParams.append('limit', '10')
				if (status) url.searchParams.append('status', status)

				try {
					const result = await fetcher(url.toString(), session.user.token)
					setData(result)
				} catch (e: any) {
					setError(e)
				} finally {
					setIsLoading(false)
				}
			}
		},
		[session, applicationsUrl, page]
	)

	useEffect(() => {
		refetch()
	}, [refetch, page])

	return {
		data: data?.applications,
		pagination: data?.pagination,
		error: error as Error,
		isLoading,
		setPage,
		refetch,
	}
}

export default useApplications
