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
	includeShowButton?: boolean
}

const EyeClosed = () => (
	<svg 
		xmlns="http://www.w3.org/2000/svg" 
		fill="none" 
		viewBox="0 0 24 24" 
		strokeWidth={1.5} 
		stroke="currentColor" 
		className="w-6 h-6"
  	>	
		<path 
		strokeLinecap="round" 
		strokeLinejoin="round" 
		d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" 
		/>
	</svg>
)

const EyeOpen = () => (
	<svg 
		xmlns="http://www.w3.org/2000/svg" 
		fill="none" 
		viewBox="0 0 24 24" 
		strokeWidth={1.5} 
		stroke="currentColor" 
		className="w-6 h-6"
	>
  		<path 
			strokeLinecap="round" 
			strokeLinejoin="round" 
			d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" 
		/>
  		<path 
			strokeLinecap="round" 
			strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
		/>
	</svg>
)

const RegisterInput: React.FC<registerInputProps> = ({
	type,
	onChange,
	placeholder,
	inputName,
	showError,
	error,
	label,
	value,
	includeShowButton
}) => {
	const [typeState, setTypeState] = React.useState(type)
	return (
		<div>
			<label className='text-sm leading-none text-gray-800' id='securityCode'>
					{label}
			</label>
			<div className='flex flex-row'>
				{value ? (
					<input
						type={typeState}
						onChange={onChange}
						className={`w-full h-11 p-3 mt-3 bg-gray-100 border rounded ${
							showError[inputName] ? 'border-red-400' : 'border-gray-200'
						} focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800`}
						placeholder={placeholder}
						name={inputName}
						value={value}
					/>
				) : (
					<input
						type={typeState}
						onChange={onChange}
						className='w-full h-11 p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800'
						placeholder={placeholder}
						name={inputName}
						value={value}
					/>
				)}
				{includeShowButton ? (
					<div>
						<button 
							className='w-8.5 mt-3 h-11 p-1 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800'
							onClick={() => {setTypeState(
								(typeState == type) ? "text" : type
							)}}
							type = "button">
							<div className='align-bottom'>
								{(typeState == type) ? <EyeOpen/> : <EyeClosed/>}
							</div>
						</button>
					</div>
				) : (null)
				}
			</div>
			<div className='h-8'>
				{showError[inputName] && (
					<p className='text-red-600 text-xs'>{error}</p>
				)}
			</div>
		</div>
	)
}

export default RegisterInput
