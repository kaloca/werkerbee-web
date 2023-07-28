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
	const { jobPosting, status, _id, timeAccepted } = application
	const timeAcceptedDate = new Date(timeAccepted)
	const timeDue = new Date(timeAcceptedDate)
					.setHours(timeAcceptedDate.getHours() + 3)
	const timeDueFormat = new Date(timeDue).toLocaleString("en-US", {
		dateStyle : "short",
		timeStyle : "short"
	})

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
		<div className='w-full max-w-md  my-1 bg-white shadow-xl overflow-hidden'>
			<div className='max-w-md mx-auto'>
				<div className='p-4 sm:p-6'>
					<p
						onClick={() => onClickJobTitle(jobPosting._id)}
						className='font-bold text-gray-700 text-[22px] leading-7 mb-1 hover:text-blue-600 hover:underline hover:cursor-pointer'
					>
						{jobPosting.name}
					</p>
					<div className='flex flex-row items-center justify-between mb-2'>
						<span>
							{jobPosting.dayOfWeek}
							{' at '}
							{helpers.formatAMPM(new Date(jobPosting.start))}
						</span>
						<span className='mr-5'>{jobPosting.payment}$/hr</span>
					</div>
					<div className='flex flex-row justify-between items-center'>
						<div className='flex flex-row items-center'>
							<div className={`h-4 w-4 rounded-2xl ${statusColor} mr-3`}></div>

							<p
								onClick={() => onClickStatus(status, '')}
								className={`${statusColor} py-2 px-3 rounded font-semibold text-[15px] mr-2 lowercase first-letter:capitalize w-min`}
							>
								{status}
							</p>
						</div>
						{status == 'ACCEPTED' && !expired && (
							<button
								onClick={() => onConfirmJobButton(jobPosting, _id)}
								className=' bg-blue-500 hover:bg-blue-400 transition-colors duration-100 text-white rounded px-3 py-2'
							>
								Confirm Job
							</button>
						)}
						{expired && <span className='text-red-500 mr-4'>Expired</span>}
					</div>
				</div>
				{(status == "ACCEPTED" && !expired) ? 
				(
					"Must be confirmed by " + timeDue
				): (null)
				}
			</div>
		</div>
	)
}

export default JobApplicationCard
