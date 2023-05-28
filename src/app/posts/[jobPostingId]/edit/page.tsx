'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import apiClient from '@/src/utils/apiClient'
import useJobTypes from '@/src/hooks/useJobTypes'
import { useErrorBar } from '@/src/app/context/errorContext'

import { BASE_URL } from '@/src/utils/constants'

import { JobPosting } from '@/src/hooks/useJobPostings'
import helpers from '@/src/utils/helpers'
import useJobPosting from '@/src/hooks/useJobPosting'

import DropdownInput from '@/src/app/(job postings)/create-job-posting/components/jobTypeInput'

const EditJobPosting = ({ params }: { params: { jobPostingId: string } }) => {
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
		payment: { value: 0, required: true, step: 1, hasChanged: false },
	})

	const handleMouseDown = (e: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(e.target as Node)
		) {
			setShowDropDown(false)
		}
	}

	const {
		data: jobPosting,
		isLoading: loadingJobPosting,
		error: jobPostingError,
	} = useJobPosting(params.jobPostingId)

	useEffect(() => {
		if (jobPosting && !loadingJobPosting && !jobPostingError) {
			const {
				name,
				description,
				dressCode,
				requiredSkills,
				requiredCertifications,
				start,
				end,
				type,
				payment,
			} = jobPosting.jobPosting

			setFormData({
				jobTitle: {
					value: name || '',
					required: true,
					step: 1,
					hasChanged: false,
				},
				jobDescription: {
					value: description || '',
					required: true,
					step: 1,
					hasChanged: false,
				},
				dressCode: {
					value: dressCode || '',
					required: true,
					step: 1,
					hasChanged: false,
				},
				requiredSkills: {
					value: requiredSkills || '',
					required: false,
					step: 1,
					hasChanged: false,
				},
				requiredCertifications: {
					value: requiredCertifications || '',
					required: true,
					step: 1,
					hasChanged: false,
				},
				date: {
					// assuming start is a Date object, we extract the date part
					value: start ? helpers.formatDate(start) : '',
					required: true,
					step: 1,
					hasChanged: false,
				},
				startTime: {
					// assuming start is a Date object, we extract the time part
					value: start ? helpers.formatTime(start) : '',
					required: true,
					step: 1,
					hasChanged: false,
				},
				endTime: {
					// assuming end is a Date object, we extract the time part
					value: end ? helpers.formatTime(end) : '',
					required: true,
					step: 1,
					hasChanged: false,
				},
				type: {
					value: type || '',
					required: true,
					step: 1,
					hasChanged: false,
				},
				payment: {
					value: payment || 0,
					required: true,
					step: 1,
					hasChanged: false,
				},
			})
		}
	}, [jobPosting, loadingJobPosting, jobPostingError])

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
					method: 'put',
					url: `/job-post/${jobPosting.jobPosting._id}`,
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
				if (response?.status === 200) {
					console.log('Job application edited successfully')
					router.back()
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
				<div className='rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12'>
					<form action='' className='space-y-4'>
						<div>
							<label
								htmlFor='jobTitle'
								className='block text-sm font-medium leading-6 text-gray-900 mb-1 ml-1'
							>
								Job Title
							</label>
							<input
								className='w-full rounded-lg border border-gray-300 p-3 text-sm'
								placeholder='Cashier at Chipotle Stanford Mall'
								type='text'
								id='jobTitle'
								value={formData.jobTitle.value}
								onChange={handleOnChange}
							/>
						</div>
						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 '>
							<div>
								<label
									htmlFor='startTime'
									className='block text-sm font-medium leading-6 text-gray-900 mb-1 ml-1'
								>
									Shift Start
								</label>
								<input
									className='rounded-lg border border-gray-300 p-3 text-sm mb-2'
									placeholder='Shift Start'
									type='time'
									id='startTime'
									value={formData.startTime.value}
									onChange={handleOnChange}
								/>
								<label
									htmlFor='endTime'
									className='block text-sm font-medium leading-6 text-gray-900 mb-1 ml-1'
								>
									Shift End
								</label>
								<input
									className='rounded-lg border border-gray-300 p-3 text-sm'
									placeholder='Shift End'
									type='time'
									id='endTime'
									value={formData.endTime.value}
									onChange={handleOnChange}
								/>
							</div>
							<div className=''>
								<label
									htmlFor='date'
									className='block text-sm font-medium leading-6 text-gray-900 mb-1 ml-1'
								>
									Date
								</label>
								<input
									className='w-full rounded-lg border border-gray-300 p-3 text-sm mb-2'
									placeholder='Date'
									type='date'
									id='date'
									value={formData.date.value}
									onChange={handleOnChange}
								/>
								<label
									htmlFor='payment'
									className='block text-sm font-medium leading-6 text-gray-900 mb-1 ml-1'
								>
									Payment ($ per hour)
								</label>
								<input
									className='w-full rounded-lg border border-gray-300 p-3 text-sm'
									placeholder='20'
									type='number'
									id='payment'
									value={formData.payment.value}
									onChange={handleOnChange}
								/>
							</div>
						</div>
						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							<div>
								<label
									htmlFor='requiredSkills'
									className='block text-sm font-medium leading-6 text-gray-900 mb-1 ml-1'
								>
									Required Skills
								</label>
								<input
									className='w-full rounded-lg border border-gray-300 p-3 text-sm'
									placeholder='Calculating change, POS system'
									type='text'
									id='requiredSkills'
									value={formData.requiredSkills.value}
									onChange={handleOnChange}
								/>
							</div>
							<div>
								<label
									htmlFor='requiredCertifications'
									className='block text-sm font-medium leading-6 text-gray-900 mb-1 ml-1'
								>
									Required Certifications
								</label>
								<input
									className='w-full rounded-lg border border-gray-300 p-3 text-sm'
									placeholder='Chipotle Cashier Training'
									type='text'
									id='requiredCertifications'
									value={formData.requiredCertifications.value}
									onChange={handleOnChange}
								/>
							</div>
						</div>
						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							<div>
								<label
									htmlFor='jobType'
									className='block text-sm font-medium leading-6 text-gray-900 mb-1 ml-1'
								>
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
								<label
									htmlFor='dressCode'
									className='block text-sm font-medium leading-6 text-gray-900 mb-1 ml-1'
								>
									Dress Code
								</label>
								<input
									className='w-full rounded-lg border border-gray-300 p-3 text-sm'
									placeholder='Provided at location, suit, etc	'
									type='text'
									id='dressCode'
									value={formData.dressCode.value}
									onChange={handleOnChange}
								/>
							</div>
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
						<div className='mt-4 inline-flex justify-between items-between  w-full'>
							<button
								type='button'
								onClick={() => router.back()}
								className='inline-block w-full rounded-lg bg-gray-200 px-5 py-3 font-medium text-black sm:w-auto hover:bg-gray-300'
							>
								Cancel
							</button>
							<button
								type='button'
								onClick={handleSubmit}
								className='inline-block w-full rounded-lg bg-blue-500 px-5 py-3 font-medium text-white sm:w-auto hover:bg-blue-600'
							>
								Update Job Posting
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	)
}

export default EditJobPosting
