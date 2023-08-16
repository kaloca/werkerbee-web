'use client'
import { Fragment, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

import {
	Dialog,
	Disclosure,
	Menu,
	Popover,
	Transition,
} from '@headlessui/react'

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

import helpers from '@/src/utils/helpers'
import useDebounce from '@/src/hooks/useDebounce'

import useWorkerSearch from './hooks/useWorkerSearch'
import WorkerCard from './components/WorkerCard'
import Pagination from '@/src/components/Pagination'
import WorkerCardSkeleton from './components/WorkerCardSkeleton'

const sortOptions = [
	{ name: 'Alphabetical', href: '?sort=name' },
	// { name: 'Jobs Completed', href: '?sort=jobs' },
	{ name: 'Newest', href: '?sort=recent' },
	{ name: 'Closest to You', href: '?sort=location' },
]

const filters = [
	{
		id: 'jobtypes',
		name: 'Job Types',
		options: [
			{ value: 'tees', label: 'Tees' },
			{ value: 'crewnecks', label: 'Crewnecks' },
			{ value: 'hats', label: 'Hats' },
			{ value: 'bundles', label: 'Bundles' },
			{ value: 'carry', label: 'Carry' },
			{ value: 'objects', label: 'Objects' },
		],
	},
	{
		id: 'maxdistance',
		name: 'Distance',
		options: [
			{ value: 'clothing-company', label: '0 - 10 miles' },
			{ value: 'fashion-inc', label: '10 - 50 miles' },
			{ value: 'shoes-n-more', label: '50 - 200 miles' },
			{ value: 'supplies-n-stuff', label: '200+ miles' },
		],
	},
]
const people = [
	{
		name: 'Jane Cooper',
		title: 'Regional Paradigm Technician',
		role: 'Admin',
		email: 'janecooper@example.com',
		telephone: '+1-202-555-0170',
		imageUrl:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
	},
	// More people...
]

const classNames = helpers.classNames

const numberPerPage = 6

export default function WorkerSearchPage() {
	const router = useRouter()

	const searchParams = useSearchParams()

	const sortingOption = searchParams?.get('sort')

	const [searchParam, setSearchParam] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

	const debouncedSearchParam = useDebounce(searchParam)

	const { data, error, isLoading, mutate } = useWorkerSearch(
		currentPage,
		numberPerPage,
		{
			...(debouncedSearchParam && debouncedSearchParam.length > 0
				? { search: debouncedSearchParam }
				: {}),
			...(sortingOption ? { sortingOption } : {}),
		}
	)

	if (error) return <div>An error has occurred: {error.message}</div>

	const totalPages = Math.ceil(data?.total ? data.total / numberPerPage : 0)

	const handleClickWorker = (username: string) => {
		router.push(`/worker/${username}`)
	}

	return (
		<div className='bg-gray-50 py-16 h-full'>
			<div className='h-full'>
				{/* Mobile filter dialog */}
				<Transition.Root show={mobileFiltersOpen} as={Fragment}>
					<Dialog
						as='div'
						className='fixed inset-0 flex z-40 sm:hidden'
						onClose={setMobileFiltersOpen}
					>
						<Transition.Child
							as={Fragment}
							enter='transition-opacity ease-linear duration-300'
							enterFrom='opacity-0'
							enterTo='opacity-100'
							leave='transition-opacity ease-linear duration-300'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'
						>
							<Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-25' />
						</Transition.Child>

						<Transition.Child
							as={Fragment}
							enter='transition ease-in-out duration-300 transform'
							enterFrom='translate-x-full'
							enterTo='translate-x-0'
							leave='transition ease-in-out duration-300 transform'
							leaveFrom='translate-x-0'
							leaveTo='translate-x-full'
						>
							<div className='ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto'>
								<div className='px-4 flex items-center justify-between'>
									<h2 className='text-lg font-medium text-gray-900'>Filters</h2>
									<button
										type='button'
										className='-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500'
										onClick={() => setMobileFiltersOpen(false)}
									>
										<span className='sr-only'>Close menu</span>
										<XMarkIcon className='h-6 w-6' aria-hidden='true' />
									</button>
								</div>

								{/* Filters */}
								<form className='mt-4'>
									{filters.map((section) => (
										<Disclosure
											as='div'
											key={section.name}
											className='border-t border-gray-200 px-4 py-6'
										>
											{({ open }) => (
												<>
													<h3 className='-mx-2 -my-3 flow-root'>
														<Disclosure.Button className='px-2 py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400'>
															<span className='font-medium text-gray-900'>
																{section.name}
															</span>
															<span className='ml-6 flex items-center'>
																<ChevronDownIcon
																	className={classNames(
																		open ? '-rotate-180' : 'rotate-0',
																		'h-5 w-5 transform'
																	)}
																	aria-hidden='true'
																/>
															</span>
														</Disclosure.Button>
													</h3>
													<Disclosure.Panel className='pt-6'>
														<div className='space-y-6'>
															{section.options.map((option: any, optionIdx) => (
																<div
																	key={option.value}
																	className='flex items-center'
																>
																	<input
																		id={`filter-mobile-${section.id}-${optionIdx}`}
																		name={`${section.id}[]`}
																		defaultValue={option.value}
																		type='checkbox'
																		defaultChecked={option.checked}
																		className='h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500'
																	/>
																	<label
																		htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
																		className='ml-3 text-sm text-gray-500'
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
							</div>
						</Transition.Child>
					</Dialog>
				</Transition.Root>

				<main className='h-full bg-white'>
					<div className='max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 flex flex-col h-full justify-between'>
						<div>
							<div className='sm:flex sm:items-center py-8'>
								<div className='sm:flex-auto'>
									<h1 className='text-3xl font-semibold text-gray-900'>
										Worker Search
									</h1>
								</div>
								<div className='sm:flex sm:items-center sm:justify-between'>
									<div className='mt-3 sm:mt-0 sm:ml-4'>
										<label
											htmlFor='mobile-search-candidate'
											className='sr-only'
										>
											Search
										</label>
										<label
											htmlFor='desktop-search-candidate'
											className='sr-only'
										>
											Search
										</label>
										<div className='flex rounded-md shadow-sm'>
											<div className='relative flex-grow focus-within:z-10'>
												<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
													<MagnifyingGlassIcon
														className='h-5 w-5 text-gray-400'
														aria-hidden='true'
													/>
												</div>
												<input
													type='text'
													name='mobile-search-candidate'
													id='mobile-search-candidate'
													className='focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md pl-10 sm:hidden border-gray-300'
													placeholder='Search By Name'
													value={searchParam}
													onChange={(e) => setSearchParam(e.target.value)}
												/>
												<input
													type='text'
													name='desktop-search-candidate'
													id='desktop-search-candidate'
													className='hidden focus:ring-indigo-500 focus:border-indigo-500 w-full rounded-md pl-10 sm:block sm:text-sm border-gray-300'
													placeholder='Search By Name'
													value={searchParam}
													onChange={(e) => setSearchParam(e.target.value)}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* Filters */}
							<section
								aria-labelledby='filter-heading'
								className='border-t border-gray-200 py-6'
							>
								<h2 id='filter-heading' className='sr-only'>
									Product filters
								</h2>

								<div className='flex items-center justify-between'>
									<Menu
										as='div'
										className='relative z-10 inline-block text-left'
									>
										<div>
											<Menu.Button className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
												Sort
												<ChevronDownIcon
													className='flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500'
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
											<Menu.Items className='origin-top-left absolute left-0 z-10 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
												<div className='py-1'>
													{sortOptions.map((option) => (
														<Menu.Item key={option.name}>
															{({ active }) => (
																<a
																	href={option.href}
																	className={classNames(
																		active ? 'bg-gray-100' : '',
																		'block px-4 py-2 text-sm font-medium text-gray-900'
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

									{/* <button
										type='button'
										className='inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden'
										onClick={() => setMobileFiltersOpen(true)}
									>
										Filters
									</button>

									<Popover.Group className='hidden sm:flex sm:items-baseline sm:space-x-8'>
										{filters.map((section, sectionIdx) => (
											<Popover
												as='div'
												key={section.name}
												id='menu'
												className='relative z-10 inline-block text-left'
											>
												<div>
													<Popover.Button className='group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
														<span>{section.name}</span>
														{sectionIdx === 0 ? (
															<span className='ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums'>
																1
															</span>
														) : null}
														<ChevronDownIcon
															className='flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500'
															aria-hidden='true'
														/>
													</Popover.Button>
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
													<Popover.Panel className='origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none'>
														<form className='space-y-4'>
															{section.options.map((option: any, optionIdx) => (
																<div
																	key={option.value}
																	className='flex items-center'
																>
																	<input
																		id={`filter-${section.id}-${optionIdx}`}
																		name={`${section.id}[]`}
																		defaultValue={option.value}
																		defaultChecked={option.checked}
																		type='checkbox'
																		className='h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500'
																	/>
																	<label
																		htmlFor={`filter-${section.id}-${optionIdx}`}
																		className='ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap'
																	>
																		{option.label}
																	</label>
																</div>
															))}
														</form>
													</Popover.Panel>
												</Transition>
											</Popover>
										))}
									</Popover.Group> */}
								</div>
							</section>
							<section>
								<ul
									role='list'
									className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
								>
									{isLoading ? (
										<>
											<WorkerCardSkeleton />
											<WorkerCardSkeleton />
											<WorkerCardSkeleton />
										</>
									) : (
										data &&
										data.workers &&
										data.workers.map((worker) => (
											<WorkerCard
												key={worker.email}
												worker={worker}
												onClickWorker={handleClickWorker}
											/>
										))
									)}
								</ul>
							</section>
						</div>
						<Pagination
							numberPerPage={numberPerPage}
							totalPages={totalPages}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
						/>
					</div>
				</main>
			</div>
		</div>
	)
}
