'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface SuccessBarContextType {
	success: string | null
	showSuccess: (message: string) => void
	hideSuccess: () => void
}

const defaultSuccessBarContext: SuccessBarContextType = {
	success: null,
	showSuccess: () => {},
	hideSuccess: () => {},
}

const SuccessBarContext = createContext<SuccessBarContextType>(
	defaultSuccessBarContext
)

export const useSuccessBar = () => {
	return useContext(SuccessBarContext)
}

interface SuccessBarProviderProps {
	children: ReactNode
}

export const SuccessBarProvider: React.FC<SuccessBarProviderProps> = ({
	children,
}) => {
	const [success, setSuccess] = useState<string | null>(null)

	const showSuccess = (message: string) => {
		setSuccess(message)
	}

	const hideSuccess = () => {
		setSuccess(null)
	}

	return (
		<SuccessBarContext.Provider value={{ success, showSuccess, hideSuccess }}>
			{children}
		</SuccessBarContext.Provider>
	)
}
