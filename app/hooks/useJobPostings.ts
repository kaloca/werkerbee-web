import useSWR from 'swr'

import fetcher from '../utils/fetcher'

import { BASE_URL } from '@/app/utils/constants'

export interface JobPosting {
	_id: string
	name: string
	description: string
	companyId: string
	location: string
	dressCode: string
	requiredSkills: string
	requiredCertifications: string
	time: string
	type: string
	payment: string
	applicants: string[]
	createdAt: Date
	updatedAt: Date
}

const useJobPostings = (page: number, limit: number) => {
	const { data, error, mutate } = useSWR(
		`${BASE_URL}/job-postings?page=${page}&limit=${limit}`,
		fetcher
	)

	const isLoading = !error && !data

	return {
		data,
		error,
		isLoading,
		mutate,
	}
}

export default useJobPostings
