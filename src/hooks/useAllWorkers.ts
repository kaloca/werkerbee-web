import useSWR from "swr"
import fetcher from "../utils/fetcher"
import { BASE_URL } from "../utils/constants"
import { JobType } from "../interfaces/models/JobType"
import { Certification } from "../interfaces/models/Worker"

export interface WorkerListing {
    profilePicture: any
    username: string
    name: string
    jobTypes: JobType[]
    experiences: any
    certifications: Certification[]
    address: any
}

const useAllWorkers = () => {
    const { data, error, mutate } = useSWR(
		`${BASE_URL}/allworkers`,
		fetcher
	)

	const isLoading = !error && !data

	return {
		data: data,
		error,
		isLoading,
		mutate,
	}
}

export default useAllWorkers