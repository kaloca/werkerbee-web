import { useCallback, useEffect, useState } from 'react'
import { mutate } from 'swr'
import { useSession } from 'next-auth/react'

import fetcher from '@/src/utils/fetcher'
import { BASE_URL } from '@/src/utils/constants'

import { Worker } from '@/src/interfaces/models/Worker'

import { JobType } from '@/src/interfaces/models/JobType'

export interface UseWorkerSearchWorker extends Worker {
	jobTypesIds: JobType[]
	distance: number
}

interface UseWorkerSearchResponse {
	workers: UseWorkerSearchWorker[]
	total: number
	page: number
	limit: number
}

const useWorkerSearch = (
	page: number,
	limit: number = 10,
	workerSearchOptions: { search?: string; sortingOption?: string }
) => {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState<UseWorkerSearchResponse | null>(null)
	const [error, setError] = useState<Error | null>(null)

	const { data: session } = useSession()

	const queryParams = [
		`page=${page}`,
		`limit=${limit}`,
		...(workerSearchOptions.search
			? [`search=${encodeURIComponent(workerSearchOptions.search)}`]
			: []),
		...(workerSearchOptions.sortingOption
			? [`sort=${encodeURIComponent(workerSearchOptions.sortingOption)}`]
			: []),
	].join('&')

	const workerSearchUrl = `${BASE_URL}/worker-search?${queryParams}`

	const fetchData = useCallback(async () => {
		if (session) {
			try {
				const result = await fetcher(workerSearchUrl, session.user.token)
				setData(result)
				setError(null)
			} catch (e: any) {
				setError(e)
				setData(null)
			} finally {
				setIsLoading(false)
			}
		} else {
			setIsLoading(true)
		}
	}, [workerSearchUrl, session])

	const mutateData = async () => {
		mutate(workerSearchUrl, fetchData())
	}

	useEffect(() => {
		fetchData()
	}, [session, workerSearchUrl, fetchData])

	return { data, error, isLoading, mutate: mutateData }
}

export default useWorkerSearch
