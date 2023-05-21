'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { BASE_URL } from '@/src/utils/constants'

import WorkerProfile from './workerProfile'
import CompanyProfile from './companyProfile'

export default function ProfilePage({ params }: any) {
	const { data: session, status } = useSession()
	const router = useRouter()

	useEffect(() => {
		if (status == 'unauthenticated' && !session) {
			// Redirect to another page, e.g., the login page
			router.push('/login')
		}
	}, [session, status, router])

	return (
		<>
			{session?.user.type === 'worker' ? <WorkerProfile /> : null}
			{session?.user.type === 'company' ? <CompanyProfile /> : null}
		</>
	)
}
