interface JobApplicationCardProps {
	application: any
	onAccept: (id: string) => void
}

const JobApplicationCard: React.FC<JobApplicationCardProps> = ({
	application,
	onAccept,
}) => {
	return (
		<div key={application._id} className='flex flex-col bg-white p-4'>
			<div className='flex flex-row items-center'>
				<span>{application.worker.name}</span>
				<div
					className='p-2 bg-green-300 ml-5 hover:cursor-pointer'
					onClick={() => onAccept(application._id)}
				>
					<span>Accept</span>
				</div>
			</div>
			<span className='first-letter:uppercase lowercase'>
				{application.status}
			</span>
		</div>
	)
}

export default JobApplicationCard
