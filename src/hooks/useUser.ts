import useSWR from 'swr'
import { useSession } from 'next-auth/react'

import fetcher from '../utils/fetcher'

import { BASE_URL } from '@/src/utils/constants'
import { Address, BankAccount } from './useCompany'

export interface Worker {
	_id: string
	name: string
	username: string
	bio: string
	phoneNumber: string
	email: string
	location: {
		coordinates: [number, number]
	}
	address: Address
	billingAddress?: Address
	bankInfo?: BankAccount
	ssn: string
	birthday: Date
	rating: number
	jobTypes: string[]
	// experiences?: Experience[]
	hashedPassword: string
}

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
