'use client'

import { Fragment, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
	ChevronDownIcon,
	FunnelIcon,
	MinusIcon,
	PlusIcon,
	Squares2X2Icon,
} from '@heroicons/react/20/solid'

import helpers from '@/src/utils/helpers'
import useJobPostings from '@/src/hooks/useJobPostings'

import { sortOptions, subCategories, filters } from './options'

import MobileFilter from './components/MobileFilters'
import JobCard from './components/JobCard'

const classNames = helpers.classNames

export default function Jobs() {
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

	const [currentPage, setCurrentPage] = useState(1)

	const { data: session } = useSession()
	const { data, error, isLoading } = useJobPostings(currentPage, 10)

	const router = useRouter()

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1)
		}
	}

	const handleNextPage = () => {
		if (currentPage < data.totalPages) {
			setCurrentPage(currentPage + 1)
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

	return (
		<div className='bg-gray-100 h-full'>
			<div>
				{/* Mobile filter dialog */}
				<MobileFilter
					isOpen={mobileFiltersOpen}
					filters={filters}
					subCategories={subCategories}
					onClose={() => setMobileFiltersOpen(false)}
				/>

				<main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 '>
					<div className='flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24'>
						<h1 className='text-4xl font-bold tracking-tight text-gray-900'>
							Find the perfect job for you
						</h1>

						<div className='flex items-center'>
							<Menu as='div' className='relative inline-block text-left'>
								<div>
									<Menu.Button className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
										Sort
										<ChevronDownIcon
											className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
											aria-hidden='true'
										/>
									</Menu.Button>
								</div>

								<Transition
									as={Fragment}
									enter='transition ease-out duration-100'
									enterFrom='transform opacity-0 scale-95'
									enterTo='transform opacity-100 scale-100'
									leave='transition ease-in duration-75'
									leaveFrom='transform opacity-100 scale-100'
									leaveTo='transform opacity-0 scale-95'
								>
									<Menu.Items className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'>
										<div className='py-1'>
											{sortOptions.map((option) => (
												<Menu.Item key={option.name}>
													{({ active }) => (
														<a
															href={option.href}
															className={classNames(
																option.current
																	? 'font-medium text-gray-900'
																	: 'text-gray-500',
																active ? 'bg-gray-100' : '',
																'block px-4 py-2 text-sm'
															)}
														>
															{option.name}
														</a>
													)}
												</Menu.Item>
											))}
										</div>
									</Menu.Items>
								</Transition>
							</Menu>

							<button
								type='button'
								className='-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7'
							>
								<span className='sr-only'>View grid</span>
								<Squares2X2Icon className='h-5 w-5' aria-hidden='true' />
							</button>
							<button
								type='button'
								className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'
								onClick={() => setMobileFiltersOpen(true)}
							>
								<span className='sr-only'>Filters</span>
								<FunnelIcon className='h-5 w-5' aria-hidden='true' />
							</button>
						</div>
					</div>

					<section aria-labelledby='products-heading' className='pb-24 pt-6'>
						<h2 id='products-heading' className='sr-only'>
							Products
						</h2>

						<div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
							{/* Filters */}
							<form className='hidden lg:block'>
								<h3 className='sr-only'>Categories</h3>
								<ul
									role='list'
									className='space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900'
								>
									{subCategories.map((category) => (
										<li key={category.name}>
											<a href={category.href}>{category.name}</a>
										</li>
									))}
								</ul>

								{filters.map((section) => (
									<Disclosure
										as='div'
										key={section.id}
										className='border-b border-gray-200 py-6'
									>
										{({ open }) => (
											<>
												<h3 className='-my-3 flow-root'>
													<Disclosure.Button className='flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500'>
														<span className='font-medium text-gray-900'>
															{section.name}
														</span>
														<span className='ml-6 flex items-center'>
															{open ? (
																<MinusIcon
																	className='h-5 w-5'
																	aria-hidden='true'
																/>
															) : (
																<PlusIcon
																	className='h-5 w-5'
																	aria-hidden='true'
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel className='pt-6'>
													<div className='space-y-4'>
														{section.options.map((option, optionIdx) => (
															<div
																key={option.value}
																className='flex items-center'
															>
																<input
																	id={`filter-${section.id}-${optionIdx}`}
																	name={`${section.id}[]`}
																	defaultValue={option.value}
																	type='checkbox'
																	defaultChecked={option.checked}
																	className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
																/>
																<label
																	htmlFor={`filter-${section.id}-${optionIdx}`}
																	className='ml-3 text-sm text-gray-600'
																>
																	{option.label}
																</label>
															</div>
														))}
													</div>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								))}
							</form>

							{/* Product grid */}
							<div className='lg:col-span-3'>
								<div className='bg-white shadow p-4 overflow-hidden sm:rounded-md'>
									<ul role='list' className='space-y-3 '>
										{data &&
											data.jobPostings.length > 0 &&
											data.jobPostings.map((jobPosting) => (
												<JobCard
													key={jobPosting._id}
													jobPosting={jobPosting}
													handleApply={handleApply}
													showApply
												/>
											))}
									</ul>
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	)
}
