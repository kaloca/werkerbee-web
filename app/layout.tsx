import Provider from './context/provider'
import { MenuBar } from './components/menuBar/menuBar'
import './globals.css'
import NavBar from './components/NavBar'
import ErrorBar from './components/errorBar'
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
						<div className='h-screen w-screen'>{children}</div>
					</ErrorBarProvider>
				</Provider>
			</body>
		</html>
	)
}
