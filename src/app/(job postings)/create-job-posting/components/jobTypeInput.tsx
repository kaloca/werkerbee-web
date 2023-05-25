'use client'

import React, { useState } from 'react'

interface DropdownInputProps {
	onChange: (e: any, hide: boolean) => void
	onFocus: () => void
	placeholder: string
	inputName: string
	showError?: boolean
	showDropdown: boolean
	error?: string
	label: string
	value: string
	dropdownItems: string[]
}

const DropdownInput = React.forwardRef<HTMLDivElement, DropdownInputProps>(
	(
		{
			onChange,
			onFocus,
			placeholder,
			inputName,
			showError = false,
			showDropdown,
			error,
			label,
			value,
			dropdownItems,
		},
		ref
	) => {
		return (
			<div>
				{/* <label className='text-sm leading-none text-gray-800' id='securityCode'>
				{label}
			</label> */}
				<div>
					<input
						autoComplete='off'
						onFocus={onFocus}
						placeholder='Job Type'
						type='text'
						className='w-32 p-3 border rounded-lg border-gray-300 text-sm flex flex-row justify-between items-center hover:cursor-pointer capitalize'
						name={inputName}
						value={value}
						onChange={(e) => onChange(e.target.value, false)}
					/>
					{showDropdown && (
						<div
							className='flex flex-col w-32 border border-gray-200 rounded-lg overflow-scroll max-h-24 no-scrollbar'
							ref={ref}
						>
							{dropdownItems
								.filter((item) =>
									item.toLowerCase().includes(value.toLowerCase())
								)
								.map((item) => (
									<div
										key={item}
										className=' px-3 py-2 hover:bg-slate-100'
										onClick={() => {
											console.log('clicked', item)
											onChange(item, true)
										}}
									>
										<p className='first-letter:capitalize text-sm text-left'>
											{item}
										</p>
									</div>
								))}
						</div>
					)}
				</div>

				{showError && <p className='text-red-600 text-xs'>{error}</p>}
			</div>
		)
	}
)

DropdownInput.displayName = 'DropdownInput'

export default DropdownInput
