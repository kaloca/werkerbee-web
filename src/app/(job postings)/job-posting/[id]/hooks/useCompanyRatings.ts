import useSWR from 'swr'

import fetcher from '@/src/utils/fetcher'

import { BASE_URL } from '@/src/utils/constants'

import { Rating } from '@/src/interfaces/models/Rating'

// interface CompanyRatingsReponse extends JobPosting {
// 	job: {
// 		_id: string
// 		status: Job['status']
// 	}
// }

const useCompanyRatings = (companyUsername: string) => {
	const { data, error, isLoading, mutate } = useSWR(
		`${BASE_URL}/ratings?rateeId={${companyUsername}}`,
		fetcher
	)

	return {
		data: data as Rating[],
		error,
		isLoading,
		mutate,
	}
}

export default useCompanyRatings
