export interface Rating {
	_id: string
	rating: number
	review?: string
	raterId: string
	rateeId: string
	jobId: string
	jobPostingId: string
}
