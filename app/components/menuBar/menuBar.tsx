import MenuBarItem from './menuBarItem'

export function MenuBar() {
	return (
		<div className='absolute top-0 left-0 w-full'>
			<nav className='font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full'>
				<div className='mb-2 sm:mb-0'>
					<p className='text-2xl no-underline text-grey-darkest hover:text-blue-dark'>
						Home
					</p>
				</div>
				<div className='flex flex-row'>
					<MenuBarItem name='One' />
				</div>
			</nav>
		</div>
	)
}
