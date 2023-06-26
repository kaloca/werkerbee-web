'use client'
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
	Bars3Icon,
	BellAlertIcon,
	BellIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline'
import { PlusSmallIcon } from '@heroicons/react/20/solid'

import WerkerBeeLogo from '@/src/assets/werkerbeelogo_new_white.png'
import helpers from '@/src/utils/helpers'

import MobileMenu from './components/MobileMenu'
import useNavBarInfo from '@/src/hooks/useNavBarInfo'

const classNames = helpers.classNames

const selected =
	'border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
const normal =
	'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'

export default function NavBar() {
	const { data: session } = useSession()
	const { data, error, isLoading, mutate } = useNavBarInfo()

	const router = useRouter()
	const pathname = usePathname()

	const showNavBar = pathname?.includes('register') ? false : true

	const [show, setShow] = useState(false)
	const [profile, setProfile] = useState(false)

	const [navBarItems, setNavBarItems] = useState([
		{
			name: 'Jobs',
			isSelected: false,
			url: '/jobs',
			type: 'worker',
		},
		{
			name: 'Post Job',
			isSelected: false,
			url: '/create-job-posting',
			type: 'company',
		},
		{
			name: 'Manage Posts',
			isSelected: false,
			url: '/posts',
			type: 'company',
		},
		{
			name: 'Applications',
			isSelected: false,
			url: '/applications',
			type: 'worker',
		},
		{
			name: 'My Jobs',
			isSelected: false,
			url: '/calendar',
			type: 'worker',
		},
	])

	const selectItem = (name: string, url: string) => {
		const updatedObject = navBarItems.map((item) =>
			item.name === name
				? { ...item, isSelected: true }
				: { ...item, isSelected: false }
		)

		setNavBarItems(updatedObject)
		router.push(url)
	}

	useEffect(() => {
		if (!navBarItems.some((item) => item.url == pathname))
			navBarItems.forEach((item) => (item.isSelected = false))
	}, [pathname, navBarItems])

	return (
		<>
			{showNavBar && (
				<Disclosure as='nav' className='bg-white shadow absolute w-full'>
					{({ open }) => (
						<>
							<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
								<div className='flex justify-between h-16'>
									<div className='flex'>
										<div className='-ml-2 mr-2 flex items-center md:hidden'>
											{/* Mobile menu button */}
											<Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
												<span className='sr-only'>Open main menu</span>
												{open ? (
													<XMarkIcon
														className='block h-6 w-6'
														aria-hidden='true'
													/>
												) : (
													<Bars3Icon
														className='block h-6 w-6'
														aria-hidden='true'
													/>
												)}
											</Disclosure.Button>
										</div>
										<div className='flex-shrink-0 flex items-center'>
											<Image
												onClick={() => router.push('/')}
												className='hidden lg:block h-14 w-auto hover:cursor-pointer'
												src={WerkerBeeLogo}
												alt='Werkerbee'
											/>
										</div>
										<div className='hidden md:ml-6 md:flex md:space-x-8'>
											{/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
											{navBarItems.map((item) => {
												if (
													item.type == 'all' ||
													item.type == session?.user.type
												)
													return (
														<a
															onClick={() => selectItem(item.name, item.url)}
															className={`hover:cursor-pointer ${
																item.isSelected ? selected : normal
															}`}
															key={item.name}
														>
															{item.name}
														</a>
													)
											})}
										</div>
									</div>
									{session && (
										<div className='flex items-center'>
											{/* {session.user.type == 'company' &&
												pathname != '/posts' && (
													<div className='flex-shrink-0'>
														<button
															type='button'
															className='relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
														>
															<PlusSmallIcon
																className='-ml-1 mr-2 h-5 w-5'
																aria-hidden='true'
															/>
															<span>New Job</span>
														</button>
													</div>
												)} */}
											<div className='hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center'>
												<button
													type='button'
													onClick={() => router.push('/notifications')}
													className='bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
												>
													<span className='sr-only'>View notifications</span>
													{data?.unreadNotification ? (
														<BellAlertIcon
															className='h-6 w-6'
															aria-hidden='true'
														/>
													) : (
														<BellIcon className='h-6 w-6' aria-hidden='true' />
													)}
												</button>

												{/* Profile dropdown */}
												<Menu as='div' className='ml-3 relative z-5'>
													<div>
														<Menu.Button className='bg-white rounded-full flex text-sm'>
															<span className='sr-only'>Open user menu</span>
															<Image
																className='rounded-full h-8 w-8'
																src={data?.profilePicture}
																alt='profile-pic'
																style={{ objectFit: 'cover' }}
																height={32}
																width={32}
															/>
														</Menu.Button>
													</div>
													<Transition
														as={Fragment}
														enter='transition ease-out duration-200'
														enterFrom='transform opacity-0 scale-95'
														enterTo='transform opacity-100 scale-100'
														leave='transition ease-in duration-75'
														leaveFrom='transform opacity-100 scale-100'
														leaveTo='transform opacity-0 scale-95'
													>
														<Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
															<Menu.Item>
																{({ active }) => (
																	<a
																		href={`/${session.user.type}/${session.user.username}`}
																		className={classNames(
																			active ? 'bg-gray-100' : '',
																			'block px-4 py-2 text-sm text-gray-700'
																		)}
																	>
																		Your Profile
																	</a>
																)}
															</Menu.Item>
															<Menu.Item>
																{({ active }) => (
																	<a
																		href='#'
																		className={classNames(
																			active ? 'bg-gray-100' : '',
																			'block px-4 py-2 text-sm text-gray-700'
																		)}
																	>
																		Settings
																	</a>
																)}
															</Menu.Item>
															<Menu.Item>
																{({ active }) => (
																	<a
																		onClick={() => signOut()}
																		className={classNames(
																			active ? 'bg-gray-100' : '',
																			'block px-4 py-2 text-sm text-gray-700'
																		)}
																	>
																		Sign out
																	</a>
																)}
															</Menu.Item>
														</Menu.Items>
													</Transition>
												</Menu>
											</div>
										</div>
									)}
								</div>
							</div>

							<MobileMenu
								navBarItems={navBarItems}
								session={session}
								selectItem={selectItem}
								router={router}
							/>
						</>
					)}
				</Disclosure>
			)}
		</>
	)
}
