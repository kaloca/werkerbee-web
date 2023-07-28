import useSWR, { mutate } from 'swr'
import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'

import { BASE_URL } from '@/src/utils/constants'
import fetcher from '@/src/utils/fetcher'

import { Job } from '@/src/interfaces/models/Job'
import { JobPosting } from '@/src/interfaces/models/JobPosting'

export interface UseJobsResponse extends Job {
	jobPostingId: JobPosting
}

const useJobs = (username: string) => {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState<UseJobsResponse[] | null>(null)
	const [error, setError] = useState<Error | null>(null)

	const { data: session } = useSession()
	const jobsUrl = `${BASE_URL}/worker/${session?.user.username}/jobs`

	const fetchData = useCallback(async () => {
		if (session) {
			try {
				const result = await fetcher(jobsUrl, session.user.token)
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
	}, [jobsUrl, session])

	const mutateData = async () => {
		mutate(jobsUrl, fetchData())
	}

	useEffect(() => {
		fetchData()
	}, [session, jobsUrl, fetchData])

	return { data, error, isLoading, mutateData }
}

export default useJobs
