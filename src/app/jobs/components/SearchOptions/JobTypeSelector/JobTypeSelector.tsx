'use client'
import { useEffect, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'

import useJobTypes from '@/src/hooks/useJobTypesNew'
import JobTypeOptions from './JobTypeOptions'

interface JobTypeSelectorProps {
	handleToggleOption: (filter: 'keyof JobPostingsOptions', option: any) => void
}
const JobTypeSelector: React.FC<JobTypeSelectorProps> = ({
	handleToggleOption,
}) => {
	const { data, isLoading, error } = useJobTypes()

	const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([])

	useEffect(() => {
		handleToggleOption('jobType' as any, selectedJobTypes)
	}, [selectedJobTypes, handleToggleOption])

	const unselectAll = () => {
		setSelectedJobTypes([])
	}

	return (
		<Disclosure as='div' className='border-b border-gray-200 py-6 mb-3'>
			{({ open }) => (
				<>
					<h3 className='-my-3 flow-root'>
						<Disclosure.Button className='flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500'>
							<span className='font-medium text-gray-900'>Job Type</span>
							<span className='ml-6 flex items-center'>
								{open ? (
									<MinusIcon className='h-5 w-5' aria-hidden='true' />
								) : (
									<PlusIcon className='h-5 w-5' aria-hidden='true' />
								)}
							</span>
						</Disclosure.Button>
					</h3>

					<Disclosure.Panel className='pt-6'>
						<div className='space-y-4'>
							{data && (
								<JobTypeOptions
									selectedJobTypes={selectedJobTypes}
									setSelectedJobTypes={setSelectedJobTypes}
									jobTypes={data.jobTypes}
								/>
							)}
							{data?.jobTypes.map((jobType) => (
								<div key={jobType._id} className='flex items-center'>
									<input
										onChange={
											(e) => {
												if (selectedJobTypes.includes(jobType.type)) {
													setSelectedJobTypes([
														...selectedJobTypes.filter(
															(j) => j != jobType.type
														),
													])
												} else {
													setSelectedJobTypes([
														...(selectedJobTypes ?? []),
														jobType.type,
													])
												}
											}
											// handleToggleOption(filter.id as any, option.value)
										}
										id={`filter-jobtypes-${jobType.type}`}
										name={`jobtypes[]`}
										//defaultValue={option.value}
										type='checkbox'
										checked={selectedJobTypes.includes(jobType.type)}
										className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
									/>
									<label
										htmlFor={`filter-jobtypes-${jobType.type}`}
										className='ml-3 capitalize text-sm text-gray-600'
									>
										{jobType.type}
									</label>
								</div>
							))}
						</div>
						<div onClick={unselectAll} className='mt-2'>
							<span className='text-sm hover:cursor-pointer hover:text-indigo-500'>
								Unselect all
							</span>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}

export default JobTypeSelector
