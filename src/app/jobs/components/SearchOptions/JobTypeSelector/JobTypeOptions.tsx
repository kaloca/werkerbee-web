'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import helpers from '@/src/utils/helpers'
import { useSession } from 'next-auth/react'
import useWorker from '@/src/hooks/useWorker'
import { JobType } from '@/src/interfaces/models/JobType'

const classNames = helpers.classNames

interface JobTypeOptionsProps {
	jobTypes: JobType[]
	selectedJobTypes: string[]
	setSelectedJobTypes: Dispatch<SetStateAction<string[]>>
}

const JobTypeOptions: React.FC<JobTypeOptionsProps> = ({
	selectedJobTypes,
	setSelectedJobTypes,
	jobTypes,
}) => {
	const { data: session } = useSession()

	const { data, isLoading, error } = useWorker(session?.user.username || '')

	const selectAll = () => {
		const jobTypesArray = jobTypes.map((jobType) => jobType.type)
		setSelectedJobTypes([...jobTypesArray])
	}

	const selectQualified = () => {
		const workerJobTypes = data?.jobTypesIds.map((jobType) => jobType.type)
		setSelectedJobTypes([...workerJobTypes])
	}

	const options = [
		{ name: 'All Jobs (upskilling)', action: selectAll },
		{ name: 'Qualified Jobs', action: selectQualified },
	]

	const [mem, setMem] = useState(options[2])

	return (
		<div>
			<RadioGroup value={mem} onChange={setMem} className='mb-2'>
				<RadioGroup.Label className='sr-only'>Quick Select</RadioGroup.Label>
				<div className='grid grid-cols-2 gap-3'>
					{options.map((option) => (
						<RadioGroup.Option
							key={option.name}
							value={option}
							className={({ active, checked }) =>
								classNames(
									active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
									checked
										? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
										: 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
									'cursor-pointer focus:outline-none border rounded-md py-1 px-2 flex items-center justify-center text-sm font-medium sm:flex-1'
								)
							}
							onClick={option.action}
						>
							<RadioGroup.Label as='p'>{option.name}</RadioGroup.Label>
						</RadioGroup.Option>
					))}
				</div>
			</RadioGroup>
			<div className='flex items-center justify-between'>
				{/* <h2 className='text-sm font-medium text-gray-900'>Quick Select</h2> */}
				<a
					href='#'
					className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
				>
					Learn More
				</a>
			</div>
		</div>
	)
}

export default JobTypeOptions
