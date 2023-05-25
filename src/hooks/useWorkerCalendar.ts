import useSWR from 'swr'
import { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'

import fetcher from '../utils/fetcher'
import { BASE_URL } from '@/src/utils/constants'

export interface Event {
	id: string
	name: string
	start: string
	end: string
	href: string
}

export interface Day {
	date: string
	isCurrentMonth: boolean
	isToday: boolean
	events: Event[]
	isSelected: boolean
}

const useWorkerCalendar = (days: number) => {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState<Day[] | null>(null)
	const [error, setError] = useState<Error | null>(null)

	const { data: session } = useSession()
	const applicationsUrl = `${BASE_URL}/worker/${session?.user.username}/jobs/calendar?days=${days}`

	useEffect(() => {
		const fetchData = async () => {
			if (session) {
				try {
					const result = await fetcher(applicationsUrl, session.user.token)
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
		}

		fetchData()
	}, [session, applicationsUrl])

	return { data, error, isLoading }
}

export default useWorkerCalendar
