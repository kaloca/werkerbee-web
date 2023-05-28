import useSWR from 'swr'

import fetcher from '../utils/fetcher'

import { BASE_URL } from '@/src/utils/constants'

import { JobPosting } from './useJobPostings'

const useCompanyPosts = (companyUsername: string) => {
	const { data, error, isLoading, mutate } = useSWR(
		`${BASE_URL}/company/${companyUsername}/posts`,
		fetcher
	)

	return {
		data: data as JobPosting[],
		error,
		isLoading,
		mutate,
	}
}

export default useCompanyPosts
