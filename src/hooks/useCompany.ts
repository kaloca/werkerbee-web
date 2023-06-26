import useSWR from 'swr'

import fetcher from '../utils/fetcher'

import { BASE_URL } from '@/src/utils/constants'
import { Company } from '@/src/interfaces/models/Company'

interface UseCompanyResponse extends Company {
	activeListings: number
}

const useCompany = (companyUsername: string) => {
	const { data, error, isLoading, mutate } = useSWR(
		`${BASE_URL}/company/${companyUsername}`,
		fetcher
	)

	return {
		data: data as UseCompanyResponse,
		error,
		isLoading,
		mutate,
	}
}

export default useCompany
