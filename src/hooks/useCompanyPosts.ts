import useSWR from 'swr'

import fetcher from '../utils/fetcher'

import { BASE_URL } from '@/src/utils/constants'
import { JobPosting } from '@/src/interfaces/models/JobPosting'

interface CompanyPostsReponse extends JobPosting {
	job: {
		_id: string
		status: string
	}
}

const useCompanyPosts = (companyUsername: string) => {
	const { data, error, isLoading, mutate } = useSWR(
		`${BASE_URL}/company/${companyUsername}/posts`,
		fetcher
	)

	return {
		data: data as CompanyPostsReponse[],
		error,
		isLoading,
		mutate,
	}
}

export default useCompanyPosts
