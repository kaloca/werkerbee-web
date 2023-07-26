import { signOut } from 'next-auth/react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'

import { Disclosure } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

import LightGraySquare from '@/src/assets/lighter-gray.jpeg'
interface MobileMenuProps {
	navBarItems: any
	session?: any
	selectItem: (name: string, url: string) => void
	router: AppRouterInstance
	profilePic?: string
}

const selected =
	'bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6'
const normal =
	'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6'

const MobileMenu: React.FC<MobileMenuProps> = ({
	navBarItems,
	session,
	selectItem,
	router,
	profilePic,
}) => {
	return (
		<Disclosure.Panel className='md:hidden z-50'>
			<div className='pt-2 pb-3 space-y-1'>
				{navBarItems.map((item: any) => {
					if (item.type == 'all' || item.type == session?.user.type)
						return (
							<Disclosure.Button
								onClick={() => selectItem(item.name, item.url)}
								as='a'
								className={item.isSelected ? selected : normal}
								key={item.name}
							>
								{item.name}
							</Disclosure.Button>
						)
				})}
			</div>
			<div className='pt-4 pb-3 border-t border-gray-200'>
				<div className='flex items-center px-4 sm:px-6'>
					<div className='flex-shrink-0'>
						<Image
							className='rounded-full h-10 w-10'
							src={profilePic || LightGraySquare}
							alt='profile-pic'
							style={{ objectFit: 'cover' }}
							height={32}
							width={32}
						/>
					</div>
					<div className='ml-3'>
						<div className='text-base font-medium text-gray-800'>
							{session?.user?.username}
						</div>
						{/* <div className='text-sm font-medium text-gray-500'>
							tom@example.com
						</div> */}
					</div>
					<button
						type='button'
						onClick={() => router.push('/notifications')}
						className='ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						<span className='sr-only'>View notifications</span>
						<BellIcon className='h-6 w-6' aria-hidden='true' />
					</button>
				</div>
				<div className='mt-3 space-y-1'>
					<Disclosure.Button
						as='a'
						onClick={() =>
							router.push(`/${session.user.type}/${session.user.username}`)
						}
						className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6'
					>
						Your Profile
					</Disclosure.Button>
					<Disclosure.Button
						as='a'
						href='#'
						className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6'
					>
						Settings
					</Disclosure.Button>
					<Disclosure.Button
						as='a'
						onClick={() => signOut()}
						className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6'
					>
						Sign out
					</Disclosure.Button>
				</div>
			</div>
		</Disclosure.Panel>
	)
}

export default MobileMenu
