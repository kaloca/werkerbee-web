import { JobPosting } from '@/app/hooks/useJobPostings'

interface JobPostingCardProps {
	jobPosting: JobPosting
}

const JobPostingCard: React.FC<JobPostingCardProps> = ({ jobPosting }) => {
	return (
		<div className=' max-w-4xl py-8 px-8 bg-white shadow-lg rounded-lg my-4 hover:cursor-pointer'>
			<div className='flex flex-row justify-between'>
				<div className='flex w-max justify-center md:justify-end'>
					<img
						className='w-20 h-20 object-cover rounded-full border-2 border-indigo-500'
						src='https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80'
					/>
				</div>
				<div className='flex flex-col max-w-xs ml-6'>
					<h2 className='text-gray-800 text-3xl font-semibold'>
						{jobPosting.name}
					</h2>
					<p className='mt-2 text-gray-600'>{jobPosting.description}</p>
				</div>
			</div>
		</div>
	)
}

export default JobPostingCard
