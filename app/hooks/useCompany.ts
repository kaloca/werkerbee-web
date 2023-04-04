import axios from 'axios'
import useSWR from 'swr'

import fetcher from '../utils/fetcher'

import { BASE_URL } from '@/app/utils/constants'

const useCompany = (companyId: string) => {
	const { data, error, isLoading, mutate } = useSWR(
		`${BASE_URL}/company/${companyId}`,
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
