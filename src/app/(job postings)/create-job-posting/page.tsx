'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import apiClient from '@/src/utils/apiClient'
import useJobTypes from '@/src/hooks/useJobTypes'
import { useErrorBar } from '@/src/app/context/errorContext'

import DropdownInput from './components/jobTypeInput'

const CreateJobPostingPage: React.FC = () => {
	const {
		data: jobTypes,
		isLoading: loadingJobTypes,
		error: jobTypesError,
	} = useJobTypes()

	const { data: session } = useSession()
	const router = useRouter()

	const { showError } = useErrorBar()

	const dropdownRef = useRef<HTMLDivElement>(null)

	const [showDropDown, setShowDropDown] = useState(false)
	const [showDropDownError, setShowDropDownError] = useState(false)
	const [formData, setFormData] = useState({
		jobTitle: {
			value: '',
			required: true,
			step: 1,
			hasChanged: false,
		},
		jobDescription: {
			value: '',
			required: true,
			step: 1,
			hasChanged: false,
		},
		dressCode: {
			value: '',
			required: true,
			step: 1,
			hasChanged: false,
		},
		requiredSkills: {
			value: '',
			required: false,
			step: 1,
			hasChanged: false,
		},
		requiredCertifications: {
			value: '',
			required: true,
			step: 1,
			hasChanged: false,
		},
		date: {
			value: '',
			required: true,
			step: 1,
			hasChanged: false,
		},
		startTime: {
			value: '',
			required: true,
			step: 1,
			hasChanged: false,
		},
		endTime: {
			value: '',
			required: true,
			step: 1,
			hasChanged: false,
		},
		type: {
			value: '',
			required: true,
			step: 1,
			hasChanged: false,
		},
		payment: { value: '', required: true, step: 1, hasChanged: false },
	})

	const handleMouseDown = (e: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(e.target as Node)
		) {
			setShowDropDown(false)
		}
	}
	useEffect(() => {
		document.addEventListener('mousedown', handleMouseDown)

		return () => {
			document.removeEventListener('mousedown', handleMouseDown)
		}
	}, [])

	const handleOnChange = (e: any) => {
		const param = e.target.id as string
		setFormData({
			...formData,
			[param]: {
				value: e.target.value,
				hasChanged: true,
			},
		})
	}

	const handleSubmit = async () => {
		if (Object.values(formData).some((item) => item.value === '')) {
			console.log(formData)
			showError('Please fill all job posting fields')
			return
		}

		if (session) {
			// Create start time Date object
			const startDateTimeString = `${formData.date.value}T${formData.startTime.value}`
			const endDateTimeString = `${formData.date.value}T${formData.endTime.value}`

			// Parse these full date strings into Date objects
			const startDate = new Date(startDateTimeString)
			const endDate = new Date(endDateTimeString)

			try {
				const response = await apiClient({
					method: 'post',
					url: `/job-post`,
					token: session.user.token,
					data: {
						name: formData.jobTitle.value,
						description: formData.jobDescription.value,
						dressCode: formData.dressCode.value,
						requiredSkills: formData.requiredSkills.value,
						requiredCertifications: formData.requiredCertifications.value,
						start: startDate,
						end: endDate,
						type: formData.type.value,
						payment: formData.payment.value,
					},
				})
				if (response?.status === 201) {
					console.log('Job application submitted successfully')
					router.push('/jobs')
				} else {
					console.error(
						`Error submitting job application: ${
							response.data.message || response.data.error
						}`
					)
				}
			} catch (error: any) {
				console.error(
					'Error submitting job application:',
					error.response.data.message
				)
				showError(error.response.data.message)
			}
		}
	}
	// useEffect(() => {
	// 	if (jobTypes && jobTypes.types) setShowDropDownError(true)
	// }, [jobTypes, formData.type])

	return (
		<section className='bg-gray-100 flex h-full flex-col justify-center items-center'>
			<div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5'>
					<div className='lg:col-span-2 lg:py-12'>
						<p className='max-w-xl text-lg'>Tutorial text space</p>
						{/* <div className='mt-8'>
							<a href='' className='text-2xl font-bold text-pink-600'>
								0151 475 4450
							</a>
							<address className='mt-2 not-italic'>
								282 Kevin Brook, Imogeneborough, CA 58517
							</address>
						</div> */}
					</div>
					<div className='rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12'>
						<form action='' className='space-y-4'>
							<div>
								<label className='sr-only' htmlFor='name'>
									Job Title
								</label>
								<input
									className='w-full rounded-lg border border-gray-300 p-3 text-sm'
									placeholder='Job Title'
									type='text'
									id='jobTitle'
									value={formData.jobTitle.value}
									onChange={handleOnChange}
								/>
							</div>
							<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 '>
								<div>
									<div className='flex flex-row items-center justify-between mb-2'>
										<span className='mr-2 text-gray-600'>Shift Start</span>
										<input
											className='w-1/2 rounded-lg border border-gray-300 p-3 text-sm'
											placeholder='Shift Start'
											type='time'
											id='startTime'
											value={formData.startTime.value}
											onChange={handleOnChange}
										/>
									</div>
									<div className='flex flex-row items-center justify-between'>
										<span className='text-gray-600'>Shift End</span>
										<input
											className='w-1/2 rounded-lg border border-gray-300 p-3 text-sm'
											placeholder='Shift End'
											type='time'
											id='endTime'
											value={formData.endTime.value}
											onChange={handleOnChange}
										/>
									</div>
								</div>
								<div className=''>
									<label className='sr-only' htmlFor='phone'>
										Payment
									</label>
									<input
										className='w-full rounded-lg border border-gray-300 p-3 text-sm mb-2'
										placeholder='Date'
										type='date'
										id='date'
										value={formData.date.value}
										onChange={handleOnChange}
									/>
									<label className='sr-only' htmlFor='phone'>
										Payment
									</label>
									<input
										className='w-full rounded-lg border border-gray-300 p-3 text-sm'
										placeholder='Payment'
										type='text'
										id='payment'
										value={formData.payment.value}
										onChange={handleOnChange}
									/>
								</div>
							</div>
							<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
								<div>
									<label className='sr-only' htmlFor='phone'>
										Payment
									</label>
									<input
										className='w-full rounded-lg border border-gray-300 p-3 text-sm'
										placeholder='Skills Needed'
										type='text'
										id='requiredSkills'
										value={formData.requiredSkills.value}
										onChange={handleOnChange}
									/>
								</div>
								<div>
									<label className='sr-only' htmlFor='phone'>
										Payment
									</label>
									<input
										className='w-full rounded-lg border border-gray-300 p-3 text-sm'
										placeholder='Required Certifications'
										type='text'
										id='requiredCertifications'
										value={formData.requiredCertifications.value}
										onChange={handleOnChange}
									/>
								</div>
							</div>
							<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
								<div>
									<label className='sr-only' htmlFor='phone'>
										Job Type
									</label>
									{loadingJobTypes ? (
										<div>Loading Job Types</div>
									) : (
										<DropdownInput
											ref={dropdownRef}
											label='Job Type'
											onChange={(value, hide) => {
												setShowDropDown(!hide)

												setFormData({
													...formData,
													type: {
														value,
														required: true,
														step: 1,
														hasChanged: true,
													},
												})
											}}
											onFocus={() => setShowDropDown(true)}
											showError={showDropDownError}
											placeholder='Job Type'
											inputName='type'
											value={formData.type.value}
											showDropdown={showDropDown}
											// ref={dropdownRef}
											dropdownItems={jobTypes.types}
										/>
									)}
								</div>
								<div>
									<label className='sr-only' htmlFor='phone'>
										Dress Code
									</label>
									<input
										className='w-full rounded-lg border border-gray-300 p-3 text-sm'
										placeholder='Dress Code'
										type='text'
										id='dressCode'
										value={formData.dressCode.value}
										onChange={handleOnChange}
									/>
								</div>
								{/* <div>
									<input
										className='peer sr-only'
										id='option1'
										type='radio'
										tabIndex={-1}
										name='option'
									/>
									<label
										htmlFor='option1'
										className='block w-full rounded-lg border border-gray-300 p-3 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white'
										tabIndex={0}
									>
										<span className='text-sm font-medium'> Option 1 </span>
									</label>
								</div>
								<div>
									<input
										className='peer sr-only'
										id='option2'
										type='radio'
										tabIndex={-1}
										name='option'
									/>
									<label
										htmlFor='option2'
										className='block w-full rounded-lg border border-gray-300 p-3 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white'
										tabIndex={0}
									>
										<span className='text-sm font-medium'> Option 2 </span>
									</label>
								</div>
								<div>
									<input
										className='peer sr-only'
										id='option3'
										type='radio'
										tabIndex={-1}
										name='option'
									/>
									<label
										htmlFor='option3'
										className='block w-full rounded-lg border border-gray-300 p-3 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white'
										tabIndex={0}
									>
										<span className='text-sm font-medium'> Option 3 </span>
									</label>
								</div> */}
							</div>
							<div>
								<label className='sr-only' htmlFor='message'>
									Job Description
								</label>
								<textarea
									className='w-full rounded-lg border border-gray-300 p-3 text-sm'
									placeholder='Job Description'
									rows={8}
									id='jobDescription'
									value={formData.jobDescription.value}
									onChange={handleOnChange}
								/>
							</div>
							<div className='mt-4'>
								<button
									type='button'
									onClick={handleSubmit}
									className='inline-block w-full rounded-lg bg-blue-800 px-5 py-3 font-medium text-white sm:w-auto'
								>
									Create Job Posting
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CreateJobPostingPage
