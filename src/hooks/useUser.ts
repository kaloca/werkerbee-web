import useSWR from 'swr'
import { useSession } from 'next-auth/react'

import fetcher from '../utils/fetcher'

import { BASE_URL } from '@/src/utils/constants'

const useUser = () => {
	const { data: session } = useSession()

	const profileUrl = `${BASE_URL}/${session?.user.type}/settings/profile`

	const { data, error, isLoading, mutate } = useSWR(
		profileUrl,
		session ? () => fetcher(profileUrl, session.user.token) : null
	)

	return {
		data,
		error,
		isLoading,
		mutate,
	}
}

export default useUser
