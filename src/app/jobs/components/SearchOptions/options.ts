import { JobPostingsOptions } from '@/src/hooks/useJobPostings'
interface Filter {
	id: keyof JobPostingsOptions
	name: string
	options: {
		value: string
		label: string
	}[]
}

export const sortOptions = [
	{ name: 'Most Popular', href: '#', current: true },
	{ name: 'Best Rating', href: '#', current: false },
]
export const subCategories = [{ name: 'Closest to you', href: '#' }]
export const filters: Filter[] = [
	{
		id: 'dayOfWeek',
		name: 'Days of the week',
		options: [
			{ value: 'Monday', label: 'Monday' },
			{ value: 'Tuesday', label: 'Tuesday' },
			{ value: 'Wednesday', label: 'Wednesday' },
			{ value: 'Thursday', label: 'Thursday' },
			{ value: 'Friday', label: 'Friday' },
			{ value: 'Saturday', label: 'Saturday' },
			{ value: 'Sunday', label: 'Sunday' },
		],
	},
]
