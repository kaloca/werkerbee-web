import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'

import { Notification } from '@/src/interfaces/models/Notification'

import { BASE_URL } from '@/src/utils/constants'
import fetcher from '@/src/utils/fetcher'
interface NotificationsResponse {
	notifications: Notification[]
	total: number
}
// userId: string, userType: 'Worker' | 'Company'
const useNotifications = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState<NotificationsResponse | null>(null)
	const [error, setError] = useState<Error | null>(null)
	const [fetchMore, setFetchMore] = useState(false)

	const { data: session } = useSession()
	const notificationsUrl = `${BASE_URL}/notifications`

	const fetchData = useCallback(async () => {
		if (session && fetchMore) {
			setIsLoading(true)
			try {
				const result = await fetcher(
					`${notificationsUrl}?skip=${
						data?.notifications.length || 0
					}&limit=10`,
					session.user.token
				)
				setData(
					(prevData) =>
						({
							notifications: [
								...(prevData?.notifications || []),
								...result.notifications,
							],
							total: result.total,
						} as NotificationsResponse)
				)
				setError(null)
			} catch (e: any) {
				setError(e)
				setData(null)
			} finally {
				setIsLoading(false)
				setFetchMore(false) // Reset fetchMore state to false
			}
		}
	}, [session, notificationsUrl, fetchMore, data?.notifications?.length])

	useEffect(() => {
		setFetchMore(true) // Set fetchMore to true to initiate data fetching
	}, [])

	useEffect(() => {
		fetchData()
	}, [fetchData, fetchMore])

	return {
		data: data?.notifications,
		error,
		isLoading,
		total: data?.total,
		refetch: () => setFetchMore(true),
	}
}

export default useNotifications
