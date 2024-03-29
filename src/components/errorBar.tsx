'use client'
import React, { useEffect, useState } from 'react'

// import { useSnackbar } from '@/src/app/context/snackbarContext'

const ErrorBar: React.FC = () => {
	// const { error, hideError } = useSnackbar()
	// const [visible, setVisible] = useState(false)

	// useEffect(() => {
	// 	if (error) {
	// 		setVisible(true)
	// 	}
	// }, [error])

	// if (!visible) return null

	return (
		<div className='fixed inset-0 flex z-50 justify-center'>
			<div className='max-w-xl '>
				<div className='flex justify-center mt-12'>
					<div className='bg-red-200 shadow rounded-md p-4 flex items-center justify-between space-x-4 transition-all duration-300 ease-in-out transform translate-y-0'>
						<div className='flex items-center space-x-2'>
							{/* Your SVG icon */}
							<p className='text-red-500 font-bold'>Error:</p>
						</div>
						<p className='text-red-500 max-h-20 overflow-scroll no-scrollbar'>
							{/* {error} */}
						</p>
						<button
							// onClick={() => {
							// 	setVisible(false)
							// 	setTimeout(hideError, 300)
							// }}
							className='text-red-500 font-bold'
						>
							Dismiss
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ErrorBar
