import Rating from '@/src/components/rating'

import { JobPosting } from '@/src/interfaces/models/JobPosting'
import { Job } from '@/src/interfaces/models/Job'

import helpers from '@/src/utils/helpers'

interface JobCardProps {
	job: Job
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
	return (
		<div className='flex flex-col bg-white border border-white shadow-lg  rounded p-4 m-4 w-80'>
			<div className='flex flex-col'>
				<span>{job.name}</span>
				<span className='first-letter:capitalize lowercase text-gray-700'>
					{helpers.formatAMPM(new Date(job.shiftStart))}
					{'-'}
					{helpers.formatAMPM(new Date(job.shiftEnd))}
				</span>
			</div>
		</div>
	)
}

export default JobCard
