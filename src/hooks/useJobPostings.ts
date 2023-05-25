import useSWR from 'swr'

import fetcher from '../utils/fetcher'

import { BASE_URL } from '@/src/utils/constants'

export interface JobPosting {
	_id: string
	name: string
	description: string
	company: any
	location: string
	dressCode: string
	requiredSkills: string
	requiredCertifications: string
	start: string
	end: string
	type: string
	payment: string
	applications: string[]
	createdAt: Date
	updatedAt: Date
}

interface getJobsResponse {
	totalPages: number
	currentPage: number
	jobPostings: JobPosting[]
}

const useJobPostings = (page: number, limit: number) => {
	const { data, error, mutate } = useSWR(
		`${BASE_URL}/job-postings?page=${page}&limit=${limit}`,
		fetcher
	)

	const isLoading = !error && !data

	return {
		data: data as getJobsResponse,
		error,
		isLoading,
		mutate,
	}
}

export default useJobPostings
