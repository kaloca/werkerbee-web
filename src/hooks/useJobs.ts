import useSWR from 'swr'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

import fetcher from '../utils/fetcher'

import { BASE_URL } from '@/src/utils/constants'

export interface Job {
	_id: string
	name: string
	rating?: number
	worker: string
	company: string
	jobPosting: string
	status: 'PENDING' | 'COMPLETE' | 'CANCELED'
	time: {}
	createdAt: Date
	updatedAt: Date
}

const useJobs = (username: string) => {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState<Job[] | null>(null)
	const [error, setError] = useState<Error | null>(null)

	const { data: session } = useSession()
	const applicationsUrl = `${BASE_URL}/worker/${session?.user.username}/jobs`

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

	return { data, error, isLoading }
}

export default useJobs
