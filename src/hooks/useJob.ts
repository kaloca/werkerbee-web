import useSWR from 'swr'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

import fetcher from '../utils/fetcher'

import { BASE_URL } from '@/src/utils/constants'
import { Job } from './useJobs'

const useJob = (jobId: string) => {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState<Job | null>(null)
	const [error, setError] = useState<Error | null>(null)

	const { data: session } = useSession()
	const jobUrl = `${BASE_URL}/job/${jobId}`

	useEffect(() => {
		const fetchData = async () => {
			if (session) {
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
			} else {
				setIsLoading(true)
			}
		}

		fetchData()
	}, [session, jobUrl])

	return { data, error, isLoading }
}

export default useJob
