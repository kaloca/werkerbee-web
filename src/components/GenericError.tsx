import { useRouter } from 'next/navigation'

export default function GenericError() {
	const router = useRouter()

	return (
		<main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
			<div className='text-center'>
				<p className='text-base font-semibold text-indigo-600'>404</p>
				<h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
					Something went wrong
				</h1>
				<p className='mt-6 text-base leading-7 text-gray-600'>
					Sorry, we couldn’t find the content you’re looking for.
				</p>
				<div className='mt-10 flex items-center justify-center gap-x-6'>
					<a
						onClick={() => router.refresh()}
						className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 hover:cursor-pointer   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Try again
					</a>
					<a
						onClick={() => router.back()}
						className='text-sm font-semibold text-gray-900 hover:cursor-pointer'
					>
						<span aria-hidden='true'>&larr;</span> Go back
					</a>
				</div>
			</div>
		</main>
	)
}
