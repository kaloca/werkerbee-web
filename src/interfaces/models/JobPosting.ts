import { Company } from './Company'
export interface JobPosting {
	_id: string
	name: string
	description: string
	company: Company
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
	confirmationTimeLimitInHours?: number
	createdAt: Date
	updatedAt: Date
}
