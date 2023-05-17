import React from 'react'

interface registerInputProps {
	type: string
	onChange: (e: any) => void
	placeholder: string
	inputName: string
	showError: Record<string, any>
	error: string
	label: string
	value?: string
}

const RegisterInput: React.FC<registerInputProps> = ({
	type,
	onChange,
	placeholder,
	inputName,
	showError,
	error,
	label,
	value,
}) => {
	return (
		<div>
			<label className='text-sm leading-none text-gray-800' id='securityCode'>
				{label}
			</label>
			{value ? (
				<input
					type={type}
					onChange={onChange}
					className={`w-full p-3 mt-3 bg-gray-100 border rounded ${
						showError[inputName] ? 'border-red-400' : 'border-gray-200'
					} focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800`}
					placeholder={placeholder}
					name={inputName}
					value={value}
				/>
			) : (
				<input
					type={type}
					onChange={onChange}
					className='w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800'
					placeholder={placeholder}
					name={inputName}
					value={value}
				/>
			)}
			<div className='h-8'>
				{showError[inputName] && (
					<p className='text-red-600 text-xs'>{error}</p>
				)}
			</div>
		</div>
	)
}

export default RegisterInput
