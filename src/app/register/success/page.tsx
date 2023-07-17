export default function RegisterSuccessPage() {
	return (
		<>
			<main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
				<div className='text-center flex flex-col items-center'>
					<h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
						Thank you for registering with WerkerBee!
					</h1>
					<p className='mt-6 text-base leading-7 text-gray-600 w-1/2'>
						Our team will review your profile ASAP, and we will let you know as
						soon as your account is ready to use. In the meanwhile, feel free to
						explore our job openings through the link below:
					</p>
					<div className='mt-10 flex items-center justify-center gap-x-6'>
						<a
							href='/jobs'
							className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							View Jobs
						</a>
						<a href='/login' className='text-sm font-semibold text-gray-900'>
							<span aria-hidden='true'>&larr;</span> Go Back to Login Page
						</a>
					</div>
				</div>
			</main>
		</>
	)
}
