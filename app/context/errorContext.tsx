'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface ErrorBarContextType {
	error: string | null
	showError: (message: string) => void
	hideError: () => void
}

const defaultErrorBarContext: ErrorBarContextType = {
	error: null,
	showError: () => {},
	hideError: () => {},
}

const ErrorBarContext = createContext<ErrorBarContextType>(
	defaultErrorBarContext
)

export const useErrorBar = () => {
	return useContext(ErrorBarContext)
}

interface ErrorBarProviderProps {
	children: ReactNode
}

export const ErrorBarProvider: React.FC<ErrorBarProviderProps> = ({
	children,
}) => {
	const [error, setError] = useState<string | null>(null)

	const showError = (message: string) => {
		setError(message)
	}

	const hideError = () => {
		setError(null)
	}

	return (
		<ErrorBarContext.Provider value={{ error, showError, hideError }}>
			{children}
		</ErrorBarContext.Provider>
	)
}
