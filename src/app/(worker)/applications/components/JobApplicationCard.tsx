interface JobApplicationCardProps {
	application: any
}

const JobApplicationCard: React.FC<JobApplicationCardProps> = ({
	application,
}) => {
	return (
		<div className='w-full max-w-md  my-2 bg-white rounded-3xl shadow-xl overflow-hidden'>
			<div className='max-w-md mx-auto'>
				<div className='p-4 sm:p-6'>
					<p className='font-bold text-gray-700 text-[22px] leading-7 mb-1'>
						{application.jobPosting.name}
					</p>
					<div className='flex flex-row'>
						<p className='text-[#3C3C4399] text-[17px] mr-2 '>
							{application.status}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default JobApplicationCard
