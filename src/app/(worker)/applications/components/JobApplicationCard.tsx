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
					{/* <div className='mt-1 flex items-center gap-x-1.5'>
						<div className='flex-none rounded-full bg-emerald-500/20 p-1'>
							<div className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
						</div>
						<p className='text-xs leading-5 text-gray-500'>Online</p>
					</div> */}
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
		// <li className='bg-white shadow overflow-hidden rounded-md px-6 py-4'>
		// 	{/* //<li className='w-full max-w-md  my-1 bg-white overflow-hidden'> */}
		// 	{/* <div className='max-w-md mx-auto'>
		// 		<div className='p-4 sm:p-6'> */}
		// 	<p
		// 		onClick={() => onClickJobTitle(jobPosting._id)}
		// 		className='font-bold text-gray-700 text-[22px] leading-7 mb-1 hover:text-blue-600 hover:underline hover:cursor-pointer'
		// 	>
		// 		{jobPosting.name}
		// 	</p>
		// 	<div className='flex flex-row items-center justify-between mb-2'>
		// 		<span>
		// 			{jobPosting.dayOfWeek}
		// 			{' at '}
		// 			{helpers.formatAMPM(new Date(jobPosting.start))}
		// 		</span>
		// 		<span className='mr-5'>{jobPosting.payment}$/hr</span>
		// 	</div>
		// 	<div className='flex flex-row justify-between items-center'>
		// 		<div className='flex flex-row items-center'>
		// 			<div className={`h-4 w-4 rounded-2xl ${statusColor} mr-3`}></div>

		// 			<p
		// 				onClick={() => onClickStatus(status, '')}
		// 				className={`${statusColor} py-2 px-3 rounded font-semibold text-[15px] mr-2 lowercase first-letter:capitalize w-min`}
		// 			>
		// 				{status}
		// 			</p>
		// 		</div>
		// 		{status == 'ACCEPTED' && !expired && (
		// 			<button
		// 				onClick={() => onConfirmJobButton(jobPosting, _id)}
		// 				className=' bg-blue-500 hover:bg-blue-400 transition-colors duration-100 text-white rounded px-3 py-2'
		// 			>
		// 				Confirm Job
		// 			</button>
		// 		)}
		// 		{expired && <span className='text-red-500 mr-4'>Expired</span>}
		// 	</div>
		// 	{/* </div>
		// 	</div> */}
		// </li>
	)
}

export default JobApplicationCard
