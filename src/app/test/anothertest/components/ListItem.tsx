import Image from 'next/image'
import React from 'react'

interface ListItemProps {
	worker: Worker
}

const ListItem: React.FC = () => {
	return (
		<tr className='h-24 border-gray-300 dark:border-gray-200 border-b'>
			<td className='pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800 dark:text-gray-100 tracking-normal leading-4'>
				<input
					type='checkbox'
					className='cursor-pointer relative w-5 h-5 border rounded border-gray-400 dark:border-gray-200 bg-white dark:bg-gray-800 outline-none'
					//onClick='tableInteract(this)'
				/>
			</td>
			<td className='pr-6 whitespace-no-wrap'>
				<div className='flex items-center'>
					<div className='h-8 w-8'>
						<Image
							src='https://tuk-cdn.s3.amazonaws.com/assets/components/advance_tables/at_1.png'
							alt='profilepic'
							className='h-full w-full rounded-full overflow-hidden shadow'
							width={50}
							height={50}
						/>
					</div>
					<p className='ml-2 text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-sm'>
						Carrie Anthony
					</p>
				</div>
			</td>
			<td className='text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4'>
				4.5
			</td>
			<td className='text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4'>
				(650) 283-4595
			</td>
			<td className='text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4'>
				gnoya4@gmail.com
			</td>

			<td className='pr-6'>
				<div className='w-2 h-2 rounded-full bg-indigo-400' />
			</td>
			<td className='pr-8 relative'>
				<div className='dropdown-content mt-8 absolute left-0 -ml-12 shadow-md z-10 hidden w-32'>
					<ul className='bg-white dark:bg-gray-800 shadow rounded py-1'>
						<li className='cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal'>
							Edit
						</li>
						<li className='cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal'>
							Delete
						</li>
						<li className='cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal'>
							Duplicate
						</li>
					</ul>
				</div>
				<button className='text-gray-500 rounded cursor-pointer border border-transparent focus:outline-none'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						//onClick='dropdownFunction(this)'
						className='icon icon-tabler icon-tabler-dots-vertical dropbtn'
						width={28}
						height={28}
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						fill='none'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path stroke='none' d='M0 0h24v24H0z' />
						<circle cx={12} cy={12} r={1} />
						<circle cx={12} cy={19} r={1} />
						<circle cx={12} cy={5} r={1} />
					</svg>
				</button>
			</td>
		</tr>
	)
}

export default ListItem
