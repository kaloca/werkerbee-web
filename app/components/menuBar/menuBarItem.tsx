import Link from 'next/link'
import React from 'react'

interface MenuBarItemProps {
	name: string
	url?: string
}

const MenuBarItem: React.FC<MenuBarItemProps> = ({ name, url }) => {
	return (
		<div className='text-grey-darkest hover:text-blue-500 hover:cursor-pointer mx-5'>
			<Link href={url || ''}>
				<p className='text-lg no-underline  ml-2'>{name}</p>
			</Link>
		</div>
	)
}

export default MenuBarItem
