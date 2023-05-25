import useSWR from 'swr'
import { useEffect, useState } from 'react'

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

const useApplications = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState<JobApplication[] | null>(null)
	const [error, setError] = useState<Error | null>(null)

	const { data: session } = useSession()
	const applicationsUrl = `${BASE_URL}/worker/${session?.user.username}/applications`

	useEffect(() => {
		const fetchData = async () => {
			if (session) {
				try {
					const result = await fetcher(applicationsUrl, session.user.token)
					setData(result)
					setError(null)
				} catch (e: any) {
					setError(e)
					setData(null)
				} finally {
					setIsLoading(false)
				}
			} else {
				setIsLoading(true)
			}
		}

		fetchData()
	}, [session, applicationsUrl])

	return { data: data as JobApplication[], error: error as Error, isLoading }
}

export default useApplications
