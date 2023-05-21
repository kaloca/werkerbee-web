'use client'

import React, { useState } from 'react'

interface registerInputProps {
	onChange: (e: any) => void
	placeholder: string
	inputName: string
	showError: Record<string, any>
	error: string
	label: string
	value: string
	dropdownItems: string[]
}

const RegisterDropdownInput: React.FC<registerInputProps> = ({
	onChange,
	placeholder,
	inputName,
	showError,
	error,
	label,
	value,
	dropdownItems,
}) => {
	const [showDropdown, setShowDropdown] = useState(false)

	return (
		<div>
			<label className='text-sm leading-none text-gray-800' id='securityCode'>
				{label}
			</label>
			<div
				onClick={() => setShowDropdown(!showDropdown)}
				className={` w-44 p-3 mt-3 bg-gray-100 border rounded ${
					showError[inputName] ? 'border-red-400' : 'border-gray-200'
				} text-sm font-medium leading-none text-gray-800 flex flex-row justify-between items-center hover:cursor-pointer`}

				// name={inputName}
				// value={value}
			>
				<p>{value == '' ? placeholder : value}</p>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='icon icon-tabler icon-tabler-select'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					strokeWidth='2'
					stroke='currentColor'
					fill='none'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
					{/* <path d='M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z'></path> */}
					<path d='M9 11l3 3l3 -3'></path>
				</svg>
			</div>
			{showDropdown && (
				<div className='flex flex-col w-44 border border-gray-200'>
					{dropdownItems.map((item) => (
						<div key={item} className=' px-3 py-2 hover:bg-slate-100'>
							<p
								onClick={() => {
									setShowDropdown(false)
									onChange(item)
								}}
							>
								{item}
							</p>
						</div>
					))}
				</div>
			)}
			<div className='h-8'>
				{showError[inputName] && (
					<p className='text-red-600 text-xs'>{error}</p>
				)}
			</div>
		</div>
	)
}

export default RegisterDropdownInput
