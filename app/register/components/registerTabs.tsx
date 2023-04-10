import React from 'react'

interface RegisterTabProps {
	currentStep: number
}

const selected = 'bg-indigo-700 text-white'
const normal = 'bg-gray-100 text-gray-800'

const registerTabs: React.FC<RegisterTabProps> = ({ currentStep }) => {
	return (
		<div className='md:flex items-center border-b pb-6 border-gray-200'>
			<div className='flex items-center md:mt-0 mt-4'>
				<div
					className={`w-8 h-8 rounded flex items-center justify-center ${
						currentStep == 1 ? selected : normal
					}`}
				>
					<p className='text-base font-medium leading-none '>01</p>
				</div>
				<p className='text-base ml-3 font-medium leading-4 text-gray-800'>
					Sign Up
				</p>
			</div>
			<div className='flex items-center md:mt-0 mt-4 md:ml-12'>
				<div
					className={`w-8 h-8 rounded flex items-center justify-center ${
						currentStep == 2 ? selected : normal
					}`}
				>
					<p className='text-base font-medium leading-none '>02</p>
				</div>
				<p className='text-base ml-3 font-medium leading-4 text-gray-800'>
					Security Check
				</p>
			</div>
			<div className='flex items-center md:mt-0 mt-4 md:ml-12'>
				<div
					className={`w-8 h-8 rounded flex items-center justify-center ${
						currentStep == 3 ? selected : normal
					}`}
				>
					<p className='text-base font-medium leading-none '>03</p>
				</div>
				<p className='text-base ml-3 font-medium leading-4 text-gray-800'>
					Confirm Info
				</p>
			</div>
			<div className='flex items-center md:mt-0 mt-4 md:ml-12'>
				<div
					className={`w-8 h-8 rounded flex items-center justify-center ${
						currentStep == 4 ? selected : normal
					}`}
				>
					<p className='text-base font-medium leading-none '>04</p>
				</div>
				<p className='text-base ml-3 font-medium leading-4 text-gray-800'>
					Onboarding
				</p>
			</div>
		</div>
	)
}

export default registerTabs
