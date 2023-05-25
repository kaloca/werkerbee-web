import React from 'react'
import ListItem from './ListItem'

interface ListProps {
	applications: any
	onApplicationUpdate: (decision: 'ACCEPTED' | 'REJECTED', id: string) => void
}

const List: React.FC<ListProps> = ({ applications, onApplicationUpdate }) => {
	return (
		<div className='w-full overflow-x-scroll xl:overflow-x-hidden pb-24'>
			<table className='min-w-full bg-white dark:bg-gray-800'>
				<thead>
					<tr className='w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8'>
						{/* <th className='pl-8 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4'>
							<input
								type='checkbox'
								className='cursor-pointer relative w-5 h-5 border rounded border-gray-400 dark:border-gray-200 bg-white dark:bg-gray-800 outline-none'
								//onClick='checkAll(this)'
							/>
						</th> */}
						<th className='pl-8 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4'>
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
					{applications.map((application: any) => (
						<ListItem
							key={application._id}
							onApplicationUpdate={onApplicationUpdate}
							application={application}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default List
