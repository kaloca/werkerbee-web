import useSWR from 'swr'

import fetcher from '../utils/fetcher'

import { BASE_URL } from '@/app/utils/constants'

const useJobPosting = (id: string) => {
	const { data, error, mutate } = useSWR(`${BASE_URL}/job-post/${id}`, fetcher)

	const isLoading = !error && !data

	return {
		data,
		error,
		isLoading,
		mutate,
	}
}

export default useJobPosting
