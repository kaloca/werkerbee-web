import { Analytics } from '@vercel/analytics/react'

import NavBar from '@/src/components/navBar/NavBar'
import Snackbar from '@/src/components/snackbar'

import './globals.css'
import Provider from './context/provider'
import { SnackbarProvider } from './context/snackbarContext'

export const metadata = {
	title: 'WerkerBee',
	description: 'Find and post jobs easily!',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body>
				<Provider>
					<SnackbarProvider>
						<Snackbar />
						{/* <MenuBar /> */}
						<NavBar />
						<div className='h-screen w-screen'>
							{children}
							<Analytics />
						</div>
					</SnackbarProvider>
				</Provider>
			</body>
		</html>
	)
}
