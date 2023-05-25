import useSWR from 'swr'
import { useSession } from 'next-auth/react'

import fetcher from '../utils/fetcher'
import { BASE_URL } from '@/src/utils/constants'

const useJobPostingApplications = (jobPostingId: string) => {
	const { data: session } = useSession()

	const applicationsUrl = `${BASE_URL}/job-post/${jobPostingId}/applications`

	const { data, error, isLoading, mutate } = useSWR(
		applicationsUrl,
		session ? () => fetcher(applicationsUrl, session.user.token) : null
	)

	return {
		data,
		error,
		isLoading,
		mutate,
	}
}

export default useJobPostingApplications