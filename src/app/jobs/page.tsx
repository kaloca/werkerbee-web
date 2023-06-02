'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import helpers from '@/src/utils/helpers'
import useJobPostings, { JobPostingsOptions } from '@/src/hooks/useJobPostings'

import { subCategories, filters } from './components/SearchOptions/options'

import MobileFilter from './components/SearchOptions/MobileFilters'
import JobCard from './components/JobCard'
import SearchOptions from './components/SearchOptions/SearchOptions'
import TopMenu from './components/SearchOptions/TopMenu'

export default function Jobs() {
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
	const [searchOptions, setSearchOptions] = useState<JobPostingsOptions>({
		page: 1,
		limit: 10,
		dayOfWeek: [],
	})

	const temp = {
		page: 1,
		limit: 10,
		dayOfWeek: ['Monday'],
	}

	const { data: session } = useSession()
	const { data, error, isLoading } = useJobPostings(searchOptions)

	const router = useRouter()

	const handlePrevPage = () => {
		if (searchOptions.page > 1) {
			setSearchOptions({ ...searchOptions, page: searchOptions.page - 1 })
		}
	}

	const handleNextPage = () => {
		if (searchOptions.page < data.totalPages) {
			setSearchOptions({ ...searchOptions, page: searchOptions.page + 1 })
		}
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}

	const handleApply = (id: string) => {
		router.push(`job-posting/${id}`)
	}

	console.log(searchOptions)

	return (
		<div className=' h-full'>
			<div>
				{/* Mobile filter dialog */}
				<MobileFilter
					isOpen={mobileFiltersOpen}
					filters={filters}
					subCategories={subCategories}
					onClose={() => setMobileFiltersOpen(false)}
				/>

				<main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 '>
					<TopMenu />
					<section aria-labelledby='products-heading' className='pb-24 pt-6'>
						<h2 id='products-heading' className='sr-only'>
							Products
						</h2>

						<div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
							{/* Filters */}
							<SearchOptions
								options={searchOptions}
								handleToggleOption={(filter, option) =>
									setSearchOptions((options: any) => ({
										...options,
										[filter]: options[filter].includes(option)
											? options[filter].filter((o: any) => o !== option)
											: [...options[filter], option],
									}))
								}
							/>

							{/* Product grid */}
							<div className='lg:col-span-3'>
								<div className='bg-white shadow p-4 overflow-hidden sm:rounded-md'>
									{isLoading && (
										<div>
											<span>Loading job posts</span>
										</div>
									)}
									{!isLoading && (
										<ul role='list' className='space-y-3 '>
											{data &&
												data.jobPostings.length > 0 &&
												data.jobPostings.map((jobPosting) => (
													<JobCard
														key={jobPosting._id}
														jobPosting={jobPosting}
														handleApply={handleApply}
														showApply={session?.user.type != 'company'}
													/>
												))}
										</ul>
									)}
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	)
}
