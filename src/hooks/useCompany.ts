import useSWR from 'swr'

import fetcher from '../utils/fetcher'

import { BASE_URL } from '@/src/utils/constants'
export interface Address {
	street: string
	city: string
	state: string
	country: string
	zip: string
}

export interface BankAccount {
	bankName: string
	accountNumber: string
	routingNumber: string
}

export interface ICompany {
	name: string
	username: string
	description: string
	email: string
	location: string
	type: string
	overallRating: number
	jobTypes: string[]
	hashedPassword: string
	address: Address
	bankInfo: BankAccount
	createdAt: Date
	updatedAt: Date
}

const useCompany = (companyUsername: string) => {
	const { data, error, isLoading, mutate } = useSWR(
		`${BASE_URL}/company/${companyUsername}`,
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
