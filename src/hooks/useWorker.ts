import useSWR from 'swr'

import fetcher from '@/src/utils/fetcher'
import { BASE_URL } from '@/src/utils/constants'

import { Worker } from '@/src/interfaces/models/Worker'

const useWorker = (workerUsername: string) => {
	const { data, error, isLoading, mutate } = useSWR(
		`${BASE_URL}/worker/${workerUsername}`,
		fetcher
	)

	return {
		data: data as Worker,
		error,
		isLoading,
		mutate,
	}
}

export default useWorker
