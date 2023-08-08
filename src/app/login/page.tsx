'use client'

import React, { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { PulseLoader } from 'react-spinners'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function LoginPage() {
	const { data: session } = useSession()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [showError, setShowError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const handleLogin = async () => {
		setLoading(true)
		try {
			const result = await signIn('credentials', {
				email,
				password,
				redirect: false,
				callbackUrl: '/',
			})
			if (result?.error) {
				setShowError(true)
				if (result.error == '403') {
					setErrorMessage('Your account has not been approved yet.')
				} else {
					setErrorMessage('Invalid email or password')
				}
			} else {
				window.location.href = '/jobs'
			}
		} catch (e: any) {
			setShowError(true)
			console.log('hey')
			console.log(e.response.data)
		}
		setLoading(false)
	}

	const onSubmit = (e: any) => {
		e.preventDefault()
		handleLogin()
	}

	return (
		<div className='h-full bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4'>
			<form onSubmit={onSubmit}>
				<div className='flex flex-col items-center justify-center pt-20'>
					<div className='bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 '>
						{!session && (
							<>
								<p
									aria-label='Login to your account'
									className='text-2xl font-extrabold leading-6 text-gray-800'
								>
									Login to your account
								</p>
								<div className='text-sm mt-4 font-medium leading-none text-gray-500'>
									Don&apos;t have an account?{' '}
									<div className='mt-2'>
										<Link href='/register/worker'>
											<span
												role='link'
												aria-label='Sign up here'
												className='text-sm font-medium leading-none underline text-gray-800 cursor-pointer'
											>
												{' '}
												Register Worker
											</span>
										</Link>
										<Link href='register/company'>
											<span
												role='link'
												aria-label='Sign up here'
												className='text-sm font-medium leading-none underline text-gray-800 cursor-pointer ml-4'
											>
												Register Company
											</span>
										</Link>
									</div>
								</div>
								<div className='w-full flex items-center justify-between py-5'>
									<hr className='w-full bg-gray-400' />
									{/* <p className='text-base font-medium leading-4 px-2.5 text-gray-400'>
    							OR
    						</p> */}
									<hr className='w-full bg-gray-400  ' />
								</div>
								{showError && (
									<div className='text-red-500 text-sm mb-2'>
										<p>{errorMessage}</p>
									</div>
								)}
								<div>
									<label className='text-sm font-medium leading-none text-gray-800'>
										Email or username
									</label>
									<input
										aria-label='enter email adress'
										role='input'
										type='text'
										autoComplete='username'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className='bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
									/>
								</div>
								<div className='mt-6  w-full'>
									<div className='inline-flex items-center'>
										<label className='text-sm font-medium leading-none text-gray-800'>
											Password
										</label>
									</div>
									<div className='relative flex items-center justify-center'>
										<input
											role='input'
											type={showPassword ? 'text' : 'password'}
											value={password}
											autoComplete='current-password'
											onChange={(e) => setPassword(e.target.value)}
											className='bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2 hide'
										/>
										<div
											className='absolute right-0 mt-2 mr-3 cursor-pointer text-gray-800'
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? (
												<EyeIcon className='h-5' />
											) : (
												<EyeSlashIcon className='h-5' />
											)}
										</div>
									</div>
								</div>
								<div className='mt-8'>
									<button
										disabled={loading}
										role='submit'
										aria-label='create my account'
										className='inline-flex justify-center items-center focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full'
									>
										{loading ? (
											<PulseLoader color='white' size={7} />
										) : (
											'Sign In'
										)}
									</button>
								</div>
							</>
						)}
						{session && (
							<div>
								<span>
									You are already logged in as{' '}
									<span className='italic'>{session.user.username}</span>
									{'. '}
								</span>
								<span
									className='text-blue-500 hover:underline hover:cursor-pointer'
									onClick={() => signOut()}
								>
									Sign Out
								</span>
							</div>
						)}
					</div>
				</div>
			</form>
		</div>
	)
}
