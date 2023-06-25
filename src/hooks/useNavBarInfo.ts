import useSWR from 'swr'
import { useSession } from 'next-auth/react'

import fetcher from '@/src/utils/fetcher'
import { BASE_URL } from '@/src/utils/constants'

import { Worker } from '@/src/interfaces/models/Worker'

interface NavBarInfoResponse {
	unreadNotification: boolean
	profilePicture: string
}

const useNavBarInfo = () => {
	const { data: session } = useSession()

	const statusUrl = `${BASE_URL}/${session?.user.type}/nav/status`

	const { data, error, isLoading, mutate } = useSWR(
		statusUrl,
		session ? () => fetcher(statusUrl, session.user.token) : null
	)

	return {
		data: data as NavBarInfoResponse,
		error,
		isLoading,
		mutate,
	}
}

export default useNavBarInfo
