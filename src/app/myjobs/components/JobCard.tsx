import { JobPosting } from '@/src/hooks/useJobPostings'
import Rating from '@/src/components/rating'
import { Job } from '@/src/hooks/useJobs'

interface JobCardProps {
	job: Job
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
	return (
		<div className='flex flex-col bg-white border border-white shadow-lg  rounded p-4 m-4 w-80'>
			<div className='flex flex-col'>
				<span>{job.name}</span>
				<span className='first-letter:capitalize lowercase text-gray-700'>
					{job.status}
				</span>
			</div>
		</div>
	)
}

export default JobCard
