import useSWR from 'swr'
import { useSession } from 'next-auth/react'

import fetcher from '../utils/fetcher'
import { BASE_URL } from '@/app/utils/constants'

import { JobPosting } from './useJobPostings'
import { ICompany } from './useCompany'

export interface IJobApplication {
	_id: string
	company: ICompany
	jobPosting: JobPosting
	status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELED' | 'SCHEDULED'
}

const useApplications = () => {
	const { data: session } = useSession()

	const applicationsUrl = `${BASE_URL}/worker/${session?.user.username}/applications`

	const { data, error, isLoading, mutate } = useSWR(
		applicationsUrl,
		session ? () => fetcher(applicationsUrl, session.user.token) : null
	)

	return {
		data: data as IJobApplication[],
		error,
		isLoading,
		mutate,
	}
}

export default useApplications
