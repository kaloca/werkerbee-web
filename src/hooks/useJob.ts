import useSWR from 'swr'
import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'

import fetcher from '@/src/utils/fetcher'
import { BASE_URL } from '@/src/utils/constants'

import { Job } from '@/src/interfaces/models/Job'

const useJob = (jobId: string) => {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState<Job | null>(null)
	const [error, setError] = useState<Error | null>(null)

	const { data: session } = useSession()
	const jobUrl = `${BASE_URL}/job/${jobId}`

	const fetchData = useCallback(async () => {
		if (session) {
			setIsLoading(true)
			try {
				const result = await fetcher(jobUrl, session.user.token)
				setData(result)
				setError(null)
			} catch (e: any) {
				setError(e)
				setData(null)
			} finally {
				setIsLoading(false)
			}
		}
	}, [session, jobUrl])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	return { data, error, isLoading, refetch: fetchData }
}

export default useJob
