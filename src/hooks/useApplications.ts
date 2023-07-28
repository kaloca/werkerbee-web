import useSWR from 'swr'
import { useCallback, useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'

import { Company } from '@/src/interfaces/models/Company'
import { JobPosting } from '@/src/interfaces/models/JobPosting'
import { Worker } from '@/src/interfaces/models/Worker'

import fetcher from '@/src/utils/fetcher'
import { BASE_URL } from '@/src/utils/constants'
export interface JobApplication {
	_id: string
	company: Company
	worker: Worker
	jobPosting: JobPosting
	status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELED' | 'SCHEDULED'
	timeAccepted: Date
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
		async (status?: string, past?: boolean) => {
			if (session) {
				setIsLoading(true)
				const url = new URL(applicationsUrl)
				url.searchParams.append('page', String(page))
				url.searchParams.append('limit', '10')
				if (status) url.searchParams.append('status', status)
				if (past != null) url.searchParams.append('past', String(past))

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
