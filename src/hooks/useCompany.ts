import useSWR from 'swr'

import fetcher from '../utils/fetcher'

import { BASE_URL } from '@/src/utils/constants'

const useCompany = (companyUsername: string) => {
	const { data, error, isLoading, mutate } = useSWR(
		`${BASE_URL}/company/${companyUsername}`,
		fetcher
	)

	return {
		data,
		error,
		isLoading,
		mutate,
	}
}

export default useCompany
