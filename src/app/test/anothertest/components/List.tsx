import React from 'react'
import ListItem from './ListItem'

const List = () => {
	return (
		<div className='w-full overflow-x-scroll xl:overflow-x-hidden'>
			<table className='min-w-full bg-white dark:bg-gray-800'>
				<thead>
					<tr className='w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8'>
						<th className='pl-8 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4'>
							<input
								type='checkbox'
								className='cursor-pointer relative w-5 h-5 border rounded border-gray-400 dark:border-gray-200 bg-white dark:bg-gray-800 outline-none'
								//onClick='checkAll(this)'
							/>
						</th>
						<th className='text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4'>
							Name
						</th>
						<th className='text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4'>
							Rating
						</th>
						<th className='text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4'>
							Phone Number
						</th>
						<th className='text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4'>
							Email Address
						</th>
					</tr>
				</thead>
				<tbody>
					<ListItem />
					<ListItem />
				</tbody>
			</table>
		</div>
	)
}

export default List
