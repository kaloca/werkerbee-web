'use client'
import { Fragment } from 'react'
import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ClockIcon,
	EllipsisHorizontalCircleIcon,
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'

import helpers from '@/src/utils/helpers'
import useWorkerCalendar from '@/src/hooks/useWorkerCalendar'

import MonthView from './components/MonthView'

const classNames = helpers.classNames

export default function Calendar() {
	const { data: days, isLoading, error } = useWorkerCalendar(28)
	const selectedDay = days ? [2] : { events: [] }

	const today = new Date()

	return (
		<div className='w-full h-full p-32 pt-20'>
			<div className='lg:flex lg:h-full lg:flex-col'>
				<header className='relative z-20 flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none'>
					<h1 className='text-lg font-semibold text-gray-900'>
						<time>
							{today.toLocaleString('default', { month: 'long' })}{' '}
							{today.getFullYear()}
						</time>
					</h1>
					{/* <div className='flex items-center'>
						<div className='flex items-center rounded-md shadow-sm md:items-stretch'>
							<button
								type='button'
								className='flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50'
							>
								<span className='sr-only'>Previous month</span>
								<ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
							</button>
							<button
								type='button'
								className='hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block'
							>
								Today
							</button>
							<span className='relative -mx-px h-5 w-px bg-gray-300 md:hidden' />
							<button
								type='button'
								className='flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50'
							>
								<span className='sr-only'>Next month</span>
								<ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
							</button>
						</div>
						<div className='hidden md:ml-4 md:flex md:items-center'>
							<Menu as='div' className='relative'>
								<Menu.Button
									type='button'
									className='flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50'
								>
									Month view
									<ChevronDownIcon
										className='ml-2 h-5 w-5 text-gray-400'
										aria-hidden='true'
									/>
								</Menu.Button>

								<Transition
									as={Fragment}
									enter='transition ease-out duration-100'
									enterFrom='transform opacity-0 scale-95'
									enterTo='transform opacity-100 scale-100'
									leave='transition ease-in duration-75'
									leaveFrom='transform opacity-100 scale-100'
									leaveTo='transform opacity-0 scale-95'
								>
									<Menu.Items className='focus:outline-none absolute right-0 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
										<div className='py-1'>
											<Menu.Item>
												{({ active }) => (
													<a
														href='#'
														className={classNames(
															active
																? 'bg-gray-100 text-gray-900'
																: 'text-gray-700',
															'block px-4 py-2 text-sm'
														)}
													>
														Day view
													</a>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<a
														href='#'
														className={classNames(
															active
																? 'bg-gray-100 text-gray-900'
																: 'text-gray-700',
															'block px-4 py-2 text-sm'
														)}
													>
														Week view
													</a>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<a
														href='#'
														className={classNames(
															active
																? 'bg-gray-100 text-gray-900'
																: 'text-gray-700',
															'block px-4 py-2 text-sm'
														)}
													>
														Month view
													</a>
												)}
											</Menu.Item>
										</div>
									</Menu.Items>
								</Transition>
							</Menu>
						</div>
						<Menu as='div' className='relative ml-6 md:hidden'>
							<Menu.Button className='-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500'>
								<span className='sr-only'>Open menu</span>
								<EllipsisHorizontalCircleIcon
									className='h-5 w-5'
									aria-hidden='true'
								/>
							</Menu.Button>

							<Transition
								as={Fragment}
								enter='transition ease-out duration-100'
								enterFrom='transform opacity-0 scale-95'
								enterTo='transform opacity-100 scale-100'
								leave='transition ease-in duration-75'
								leaveFrom='transform opacity-100 scale-100'
								leaveTo='transform opacity-0 scale-95'
							>
								<Menu.Items className='focus:outline-none absolute right-0 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
									<div className='py-1'>
										<Menu.Item>
											{({ active }) => (
												<a
													href='#'
													className={classNames(
														active
															? 'bg-gray-100 text-gray-900'
															: 'text-gray-700',
														'block px-4 py-2 text-sm'
													)}
												>
													Create event
												</a>
											)}
										</Menu.Item>
									</div>
									<div className='py-1'>
										<Menu.Item>
											{({ active }) => (
												<a
													href='#'
													className={classNames(
														active
															? 'bg-gray-100 text-gray-900'
															: 'text-gray-700',
														'block px-4 py-2 text-sm'
													)}
												>
													Go to today
												</a>
											)}
										</Menu.Item>
									</div>
									<div className='py-1'>
										<Menu.Item>
											{({ active }) => (
												<a
													href='#'
													className={classNames(
														active
															? 'bg-gray-100 text-gray-900'
															: 'text-gray-700',
														'block px-4 py-2 text-sm'
													)}
												>
													Day view
												</a>
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<a
													href='#'
													className={classNames(
														active
															? 'bg-gray-100 text-gray-900'
															: 'text-gray-700',
														'block px-4 py-2 text-sm'
													)}
												>
													Week view
												</a>
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<a
													href='#'
													className={classNames(
														active
															? 'bg-gray-100 text-gray-900'
															: 'text-gray-700',
														'block px-4 py-2 text-sm'
													)}
												>
													Month view
												</a>
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<a
													href='#'
													className={classNames(
														active
															? 'bg-gray-100 text-gray-900'
															: 'text-gray-700',
														'block px-4 py-2 text-sm'
													)}
												>
													Year view
												</a>
											)}
										</Menu.Item>
									</div>
								</Menu.Items>
							</Transition>
						</Menu>
					</div> */}
				</header>
				<MonthView days={days} />
			</div>
		</div>
	)
}
