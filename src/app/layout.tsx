import { Analytics } from '@vercel/analytics/react'

import NavBar from '@/src/components/navBar/NavBar'
import ErrorBar from '@/src/components/errorBar'

import Provider from './context/provider'
import { ErrorBarProvider } from './context/errorContext'

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
					<ErrorBarProvider>
						<ErrorBar />
						{/* <MenuBar /> */}
						<NavBar />
						<div className='h-screen w-screen'>
							{children}
							<Analytics />
						</div>
					</ErrorBarProvider>
				</Provider>
			</body>
		</html>
	)
}
