import React from 'react'

interface MenuBarItemProps {
	name: string
}

const MenuBarItem: React.FC<MenuBarItemProps> = ({ name }) => {
	return (
		<div className='text-grey-darkest hover:text-blue-500 hover:cursor-pointer'>
			<p className='text-lg no-underline  ml-2'>{name}</p>
		</div>
	)
}

export default MenuBarItem
