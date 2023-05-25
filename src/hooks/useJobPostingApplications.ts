import useSWR from 'swr'
import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'

import fetcher from '@/src/utils/fetcher'
import { BASE_URL } from '@/src/utils/constants'

import { JobApplication } from './useApplications'

const useJobPostingApplications = (jobPostingId: string) => {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState<{
		applications: JobApplication[]
		jobName: string
	} | null>(null)
	const [error, setError] = useState(null)

	const { data: session } = useSession()
	const applicationsUrl = `${BASE_URL}/job-post/${jobPostingId}/applications`

	const fetchData = useCallback(async () => {
		if (session) {
			setIsLoading(true)
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
		}
	}, [session, applicationsUrl])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	return {
		data: data?.applications as JobApplication[],
		jobName: data?.jobName,
		error,
		isLoading,
		mutate: fetchData,
	}
}

export default useJobPostingApplications
