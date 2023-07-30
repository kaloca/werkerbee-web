import { JobApplication } from '@/src/hooks/useApplications'
import { JobPosting } from '@/src/interfaces/models/JobPosting'
import helpers from '@/src/utils/helpers'
interface JobApplicationCardProps {
	application: JobApplication
	onConfirmJobButton: (job: JobPosting, applicationId: string) => void
	onClickStatus: (status: string, id: string) => void
	onClickJobTitle: (id: string) => void
}

const JobApplicationCard: React.FC<JobApplicationCardProps> = ({
	application,
	onConfirmJobButton,
	onClickStatus,
	onClickJobTitle,
}) => {
	const { jobPosting, status, company, _id } = application

	const now = new Date()
	const jobStart = new Date(jobPosting.start)

	const expired = now.getTime() > jobStart.getTime()

	let statusColor
	switch (status) {
		case 'ACCEPTED':
			statusColor = 'bg-green-100 text-green-700'
			break
		case 'REJECTED':
			statusColor = 'bg-red-100 text-red-700'
			break
		case 'PENDING':
			statusColor = 'bg-gray-100 text-gray-600'
			break
		case 'SCHEDULED':
			statusColor =
				'bg-blue-100 text-blue-700 hover:bg-blue-200 hover:cursor-pointer'
	}

	return (
		<li className='bg-white shadow overflow-hidden rounded-md px-6 py-4 flex justify-between'>
			<div className='flex gap-x-4'>
				<div className='min-w-0 flex-auto'>
					<p className='text-md font-semibold capitalize leading-6 text-gray-900 hover:underline hover:cursor-pointer'>
						{jobPosting.name}
					</p>
					<span
						onClick={() => onClickStatus(status, '')}
						className={`${statusColor} mt-2 inline-flex capitalize items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
					>
						• {status.toLowerCase()} •
					</span>
					{status == 'ACCEPTED' && !expired && (
						<button
							onClick={() => onConfirmJobButton(jobPosting, _id)}
							className='ml-3 bg-blue-500 hover:bg-blue-400 transition-colors duration-100 text-white rounded text-xs px-2 py-1'
						>
							Confirm Job
						</button>
					)}
					{expired && (
						<span className='text-red-500 ml-2 bg-red-100 px-2 py-1 rounded text-xs font-semibold'>
							Expired
						</span>
					)}
				</div>
			</div>
			<div className='hidden sm:flex sm:flex-col sm:items-end'>
				<p className='text-sm leading-6 text-gray-900'>
					<span>
						{jobPosting.dayOfWeek}
						{' at '}
						{helpers.formatAMPM(new Date(jobPosting.start))}
					</span>
				</p>
				<p className='mt-2 truncate text-xs leading-5 text-gray-500'>
					<span>{company.name}</span>
					<span className='mx-1'>•</span>
					<span>{jobPosting.payment}$/hr</span>
				</p>
			</div>
		</li>
	)
}

export default JobApplicationCard
