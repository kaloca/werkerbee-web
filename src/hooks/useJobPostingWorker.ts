import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import fetcher from '@/src/utils/fetcher'
import { BASE_URL } from '@/src/utils/constants'

import { JobPosting } from '@/src/interfaces/models/JobPosting'

interface JobPostingWorkerResponse {
	jobPosting: JobPosting
	alreadyApplied: false
}

const useJobPostingWorker = (id: string) => {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState<JobPostingWorkerResponse | null>(null)
	const [error, setError] = useState<Error | null>(null)

	const { data: session } = useSession()
	const postingUrl = `${BASE_URL}/job-post/${id}/w?worker=true`

	useEffect(() => {
		const fetchData = async () => {
			if (session) {
				try {
					const result = await fetcher(postingUrl, session.user.token)
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
	}, [session, postingUrl])

	return { data, error, isLoading }
}

export default useJobPostingWorker
