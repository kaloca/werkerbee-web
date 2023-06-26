import { Address, BankAccount } from '../UserData'

export interface Company {
	name: string
	username: string
	description: string
	email: string
	location: {
		coordinates: [number, number]
	}
	type: string
	overallRating: number
	jobTypes: { type: string; _id: string }[]
	hashedPassword: string
	address: Address
	bankInfo: BankAccount
	profilePicture: string
	createdAt: Date
	updatedAt: Date
}
