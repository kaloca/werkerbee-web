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
