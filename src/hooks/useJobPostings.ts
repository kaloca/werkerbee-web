import useSWR from 'swr'

import fetcher from '../utils/fetcher'

import { BASE_URL } from '@/src/utils/constants'

export interface JobPosting {
	_id: string
	name: string
	description: string
	company: any
	companyName: string
	dayOfWeek: string
	location: string
	dressCode: string
	requiredSkills: string
	requiredCertifications: string
	start: string
	end: string
	type: string
	payment: string
	distance: number
	applications: string[]
	createdAt: Date
	updatedAt: Date
}

interface getJobsResponse {
	totalPages: number
	currentPage: number
	jobPostings: JobPosting[]
}

const buildParams = (params: Record<string, any>) => {
	return Object.entries(params)
		.filter(([_, v]) => v != null) // filter out undefined values
		.flatMap(([k, v]) =>
			Array.isArray(v)
				? v.map(
						(item) => `${encodeURIComponent(k)}=${encodeURIComponent(item)}`
				  )
				: `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
		)
		.join('&')
}
export interface JobPostingsOptions {
	page: number
	limit: number
	dayOfWeek?: string[]
	minPay?: number
	jobType?: string[]
	requesterLocation?: string
	requesterDistance?: number
	sortBy?: string // "bestRating", "mostPopular", "newest"
}

const useJobPostings = (options: JobPostingsOptions) => {
	const params = buildParams(options)
	const { data, error, mutate } = useSWR(
		`${BASE_URL}/job-postings?${params}`,
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
