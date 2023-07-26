'use client'

import { useCallback, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

import useJobPostings, { JobPostingsOptions } from '@/src/hooks/useJobPostings'

import ChooseLocationModal from '@/src/components/ChooseLocationModal'

import { subCategories, filters } from './components/SearchOptions/options'
import MobileFilter from './components/SearchOptions/MobileFilters'
import JobCard from './components/JobCard'
import SearchOptions from './components/SearchOptions/SearchOptions'
import TopMenu from './components/SearchOptions/TopMenu'
import JobCardSkeleton from './components/JobCardSkeleton'

import { mockData } from './mockData'

export default function Jobs({ params }: any) {
	const { data: session } = useSession()
	const router = useRouter()
	const searchParams = useSearchParams()

	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
	const [locationModalOpen, setLocationModalOpen] = useState(false)

	const companyType = searchParams?.get('companyType')

	const [searchOptions, setSearchOptions] = useState<JobPostingsOptions>({
		page: 1,
		limit: 10,
		dayOfWeek: [],
		sortBy: 'start',
		companyUsername: searchParams?.get('company') || undefined,
		companyType:
			companyType == 'hotel' || companyType == 'restaurant'
				? companyType
				: undefined,
	})

	// const { data, error, isLoading } = useJobPostings(searchOptions)
	const { data, error, isLoading } = mockData

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

	const handleOpenLocationModal = () => {
		setLocationModalOpen(true)
	}

	const handleCloseLocationModal = () => {
		setLocationModalOpen(false)
	}

	const handleLocationSelect = () => {}

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
					{locationModalOpen && (
						<ChooseLocationModal
							isOpen={locationModalOpen}
							onClose={handleCloseLocationModal}
							onLocationSelect={handleLocationSelect}
						/>
					)}
					<TopMenu />
					<section aria-labelledby='products-heading' className='pb-24 pt-6'>
						<div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
							{/* Filters */}
							<SearchOptions
								options={searchOptions}
								handleToggleOption={useCallback((filter, option) => {
									if ((filter as any) == 'jobType') {
										console.log('hey')
										setSearchOptions((options: any) => ({
											...options,
											jobType: option as any,
										}))
									} else
										setSearchOptions((options: any) => ({
											...options,
											[filter]: options[filter].includes(option)
												? options[filter].filter((o: any) => o !== option)
												: [...options[filter], option],
										}))
								}, [])}
								handleOpenLocationModal={handleOpenLocationModal}
							/>

							{/* Product grid */}
							<div className='lg:col-span-3'>
								<div className='bg-white shadow p-4 overflow-hidden sm:rounded-md'>
									<ul role='list' className='space-y-3 '>
										{isLoading ? (
											<>
												<JobCardSkeleton />
												<JobCardSkeleton />
											</>
										) : (
											data &&
											data.jobPostings.length > 0 &&
											data.jobPostings.map((jobPosting) => (
												<JobCard
													key={jobPosting._id}
													jobPosting={jobPosting}
													handleApply={handleApply}
												/>
											))
										)}
										{data && data.jobPostings.length == 0 && (
											<div>No job postings match these criteria</div>
										)}
									</ul>

									{error && <div>Error: {error.message}</div>}
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	)
}
