import { HTMLInputTypeAttribute } from 'react'

interface FilterTextInputProps {
	label: string
	type: HTMLInputTypeAttribute
	id: string
}

const FilterTextInput: React.FC<FilterTextInputProps> = ({
	label,
	type,
	id,
}) => {
	return (
		<div>
			<label
				htmlFor='price'
				className='block text-sm font-medium leading-6 text-gray-900'
			>
				{label}
			</label>
			<div className='relative mt-2 rounded-md shadow-sm'>
				<input
					type={type}
					name={id}
					id={id}
					className='block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
					placeholder='10'
				/>
				<div className='absolute inset-y-0 right-0 flex items-center'>
					<label htmlFor='currency' className='sr-only'>
						Currency
					</label>
					{/* <select
						id='currency'
						name='currency'
						className='h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm'
					>
						<option>USD</option>
						<option>CAD</option>
						<option>EUR</option>
					</select> */}
				</div>
			</div>
		</div>
	)
}

export default FilterTextInput
