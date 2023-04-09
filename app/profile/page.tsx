'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { BASE_URL } from '@/app/utils/constants'

import WorkerProfile from './components/workerProfile'
import CompanyProfile from './components/companyProfile'

export default function ProfilePage({ params }: any) {
	const { data: session, status } = useSession()
	console.log(session)
	const router = useRouter()

	if (!session) {
		// Redirect to another page, e.g., the login page
		router.push('/login')
	}

	return (
		<>
			{session?.user.type === 'worker' ? <WorkerProfile /> : <CompanyProfile />}
		</>
	)
}
