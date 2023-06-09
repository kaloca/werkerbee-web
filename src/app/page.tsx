'use client'
import { useSession } from 'next-auth/react'

export default function Home() {
	const { data: session } = useSession()

	return (
		<div className='flex flex-col pt-20 items-center h-full'>
			<div className='relative pt-6 pb-16 sm:pb-24'>
				<main className='mt-16 mx-auto max-w-7xl px-4 sm:mt-24'>
					<div className='text-center'>
						<h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
							<span className='block xl:inline'>
								The future of flexible work means leaving the independent
								contractor model behind
							</span>{' '}
							{/* <span className='block text-indigo-600 xl:inline'>behind</span> */}
						</h1>
						<p className='mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl'>
							Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
							lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
							fugiat aliqua.
						</p>
						<div className='mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8'>
							{!session && (
								<div className='rounded-md shadow'>
									<a
										href='/login'
										className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10'
									>
										Get started
									</a>
								</div>
							)}
							{session?.user.type == 'worker' && (
								<div className='mt-3 rounded-md shadow sm:mt-0 sm:ml-3'>
									<a
										href='/jobs'
										className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10'
									>
										View Jobs
									</a>
								</div>
							)}
							{session?.user.type == 'company' && (
								<div className='mt-3 rounded-md shadow sm:mt-0 sm:ml-3'>
									<a
										href='/create-job-posting'
										className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10'
									>
										Create Job Posting
									</a>
								</div>
							)}
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}
